import { ECS, Entity } from "../Globals/ECS";
import HEROS, { HeroDefinition, isUnlocked } from "../Constants/Heros";

import AnimationComponent from "../Components/AnimationComponent";
import ButtonEntity from "./ButtonEntity";
import ColorShader from "../Shaders/ColorShader";
import { ECSEVENTS } from "../Constants/Events";
import INPUTS from "../Constants/InputsNames";
import MapState from "../GameStates/MapState";
import OutlineShader from "../Shaders/OutlineShader";
import SKILLS from "../Constants/Skills";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";
import TextComponent from "../Components/TextComponent";
import Tile from "../Utils/Tile";
import UIPositionComponent from "../Components/UIPositionComponent";
import assets from "../Globals/Assets";
import { engine } from "../Globals/Initialize";

const UIPlayerSelectEntity = () => {
	const ui = new Entity('player select ui')


	// ! UI
	const uiPosition = ui.addComponent(new UIPositionComponent({ x: 0, y: -3 }, { x: 0, y: 0 }))
	uiPosition.moveTo(0, 30)
	ui.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 110, 60), { scale: 3 }))
	const container = new Entity('container')
	container.addComponent(new SpriteComponent(Tile.empty(130, 80), { scale: 3 }))
	container.addComponent(new UIPositionComponent())
	ui.addChildren(container)
	// ! STATS
	const stats = new Entity('player select stats')
	stats.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 30, 65), { scale: 3 }))
	stats.addComponent(new UIPositionComponent({ x: -1, y: 0 }, { x: -1, y: 0 }))
	container.addChildren(stats)
	const statsContainer = new Entity('stats container')
	statsContainer.addComponent(new SpriteComponent(Tile.empty(30, 65), { scale: 3 }))
	statsContainer.addComponent(new UIPositionComponent())
	stats.addChildren(statsContainer)
	SKILLS.forEach((skill, index) => {
		const skillContainer = new Entity('skill container')
		skillContainer.addComponent(new SpriteComponent(Tile.empty(120, 24)))
		skillContainer.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: index * 1.5 + index * 0.1 }))

		statsContainer.addChildren(skillContainer)
		const skillIcon = new Entity('skill icon')
		skillIcon.addComponent(new SpriteComponent(skill.icon))
		skillIcon.addComponent(new UIPositionComponent({ x: -1, y: 0 }, { x: -1, y: 0 }))
		skillContainer.addChildren(skillIcon)
		const text = new Entity('text')
		text.addComponent(new SpriteComponent(Tile.empty(1, 24)))
		text.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
		text.addComponent(new TextComponent(skill.name, { anchorX: 'left', size: 12, outlineWidth: 1 }))
		skillIcon.addChildren(text)
	})

	// ! VALIDATE BUTTON
	const validateButton = ButtonEntity(60, 5, 2, 'Choose 2 characters', 1, () => {
		if (State.heros.size === 2) {
			uiPosition.moveTo(-3, 30).then(() => {
				engine.setState(MapState)
			})
		}
	})
	validateButton.addComponent(new UIPositionComponent({ x: 0.3, y: -0.7 }, { x: 0, y: 0 }))

	container.addChildren(validateButton)

	ui.addChildren(validateButton)
	const positions = [
		{ x: 5, y: 1 },
		{ x: 3, y: 1 },
		{ x: 1, y: 1 },
		{ x: 5, y: 3 },
		{ x: 3, y: 3 },
		{ x: 1, y: 3 },
	]
	const characterFrames: Entity[][] = [[], []]
	const heroSprites = new Map<HeroDefinition, SpriteComponent>()
	const withOutline = new Set<SpriteComponent>()
	HEROS.forEach((hero, index) => {
		// ! CHARACTER FRAME
		const characterFrame = new Entity('character frame')
		characterFrame.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 12, 12), { scale: 3 }))
		characterFrame.addComponent(new UIPositionComponent({ x: 1, y: 1 }, positions[index]))
		const selectable = characterFrame.addComponent(new SelectableComponent())
		container.addChildren(characterFrame)
		characterFrames[Math.floor(index / 3)].push(characterFrame)

		// ! HERO
		const heroIcon = new Entity('hero')
		const heroSprite = heroIcon.addComponent(new SpriteComponent(hero.tiles.idle, { scale: 2 }))
		heroSprites.set(hero, heroSprite)
		heroIcon.addComponent(new AnimationComponent({ idle: hero.tiles.idle }))
		heroIcon.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: -0.3 }))
		characterFrame.addChildren(heroIcon)

		// ! UNLOCKED
		if (isUnlocked(hero)) {
			selectable.onValidated = () => {
				if (State.heros.has(hero)) {
					State.heros.delete(hero)
				} else if (State.heros.size < 2) {
					State.heros.add(hero)
				}
				heroSprites.forEach((sprite, hero) => {
					if (State.heros.has(hero) && !withOutline.has(sprite)) {
						sprite.addShader(new OutlineShader([1, 1, 1, 1]))
						withOutline.add(sprite)
					} else if (withOutline.has(sprite) && !State.heros.has(hero)) {
						sprite.removeShader(OutlineShader)
						withOutline.delete(sprite)
					}
				})
				const textValidate = validateButton.children[0].getComponent(TextComponent)
				if (State.heros.size === 2) {
					textValidate.setText('Start your adventure')
				} else {
					textValidate.setText(`Choose ${2 - State.heros.size} characters`)
				}
			}
		} else {
			heroSprite.addShader(new ColorShader(0, 0, 0, 1))
			const lock = new Entity('lock')
			lock.addComponent(new SpriteComponent(assets.icons.lock, { scale: 2 }))
			lock.addComponent(new UIPositionComponent())
			characterFrame.addChildren(lock)
		}

	})
	ECS.eventBus.subscribe(ECSEVENTS.SELECTED, entity => {
		const allFrames = characterFrames.flat()
		if (allFrames.some(frame => frame.id === entity.id)) {
			allFrames.forEach(frame => {
				if (entity.id === frame.id) {
					frame.getComponent(SpriteComponent).removeShader(ColorShader)
				} else {
					frame.getComponent(SpriteComponent).addShader(new ColorShader(1, 1, 1, 0.8))
				}
			})
		}
	})
	SelectableComponent.setFromGrid(characterFrames)
	characterFrames[1].forEach(characterFrame => {
		characterFrame.getComponent(SelectableComponent).next[INPUTS.MOVEDOWN] = validateButton
	})
	validateButton.getComponent(SelectableComponent).next[INPUTS.MOVEUP] = characterFrames[1][1]

	return ui
}
export default UIPlayerSelectEntity