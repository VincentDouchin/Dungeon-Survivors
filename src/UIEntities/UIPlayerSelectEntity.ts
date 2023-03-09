import { ECS, Entity } from "../Globals/ECS";
import HEROS, { HeroDefinition, isUnlocked } from "../Constants/Heros";

import AnimationComponent from "../Components/AnimationComponent";
import ButtonEntity from "./ButtonEntity";
import ColorShader from "../Shaders/ColorShader";
import Coroutine from "../Globals/Coroutine";
import { ECSEVENTS } from "../Constants/Events";
import Engine from "../Globals/Engine";
import { GameStates } from "../Constants/GameStates";
import INPUTS from "../Constants/InputsNames";
import OutlineShader from "../Shaders/OutlineShader";
import RotationComponent from "../Components/RotationComponent";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import State from "../Globals/State";
import TextComponent from "../Components/TextComponent";
import Tile from "../Utils/Tile";
import UIPositionComponent from "../Components/UIPositionComponent";
import assets from "../Globals/Assets";

const UIPlayerSelectEntity = () => {
	const ui = new Entity('player select ui')

	const characterFrameWidth = 40
	const frameWidth = (HEROS.length - 0.5) * characterFrameWidth
	const uiPosition = ui.addComponent(new UIPositionComponent({ x: 0, y: -3 }, { x: 0, y: 0 }))
	uiPosition.moveTo(0, 30)
	ui.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, frameWidth, 35), { scale: 3 }))
	const description = new Entity('description')
	description.addComponent(new SpriteComponent(Tile.empty()))
	description.addComponent(new TextComponent('Choose your characters', { size: 32 }))
	description.addComponent(new UIPositionComponent({ x: 0, y: 0.8 }, { x: 0, y: 1 }))
	ui.addChildren(description)
	const heroFrames: Map<HeroDefinition, Entity> = new Map()
	const unlockedCharacters: Entity[] = []
	const characterFrames: Entity[] = []

	// ! ADD OUTLINE
	let checkHeros = true
	new Coroutine(function* () {
		const withShader: Entity[] = []
		while (checkHeros) {
			yield
			for (let [hero, character] of heroFrames.entries()) {
				if (State.heros.includes(hero) && !withShader.includes(character)) {
					character.getComponent(SpriteComponent)?.addShader(new OutlineShader([1, 1, 1, 1]))
					withShader.push(character)
				} else if (!State.heros.includes(hero)) {
					character.getComponent(SpriteComponent)?.removeShader(OutlineShader)
					withShader.splice(withShader.indexOf(character), 1)
				}
			}
		}
	})
	ui.onDestroy(() => checkHeros = false)

	// ! Validate Button
	const validateButton = ButtonEntity(60, 5, 2, 'Choose 2 characters', 1, () => {
		if (State.heros.length === 2) {
			uiPosition.moveTo(-3, 30).then(() => {
				Engine.setState(GameStates.map)
			})
		}
	})
	validateButton.addComponent(new UIPositionComponent({ x: 0, y: -0.7 }, { x: 0, y: 0 }))

	ui.addChildren(validateButton)

	ECS.eventBus.subscribe(ECSEVENTS.SELECTED, entity => {
		if (characterFrames.some(frame => frame.id === entity.id) || entity.id === validateButton.id) {
			characterFrames.forEach(frame => {
				if (entity.id === frame.id) {
					frame.getComponent(SpriteComponent).removeShader(ColorShader)
				} else {
					frame.getComponent(SpriteComponent).addShader(new ColorShader(1, 1, 1, 0.8))
				}
			})
		}
	})
	HEROS.forEach((hero, index) => {
		const tiles = hero.tiles.map(tiles => tiles.idle)
		const unlocked = isUnlocked(hero)
		const arrows: Entity[] = []
		let selectedTile = 0
		// ! FRAME
		const characterFrame = new Entity('character frame')
		characterFrame.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, characterFrameWidth, 35), { scale: 2 }))
		characterFrame.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: 0 }).offsetX(HEROS.length, index))
		characterFrames.push(characterFrame)
		ui.addChildren(characterFrame)

		// ! CHARACTER
		const character = new Entity(`character ${index}`)
		character.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 1 }))
		const characterSprite = character.addComponent(new SpriteComponent(tiles[0], { scale: 2 }))
		const states = tiles.reduce((acc, v, i) => ({ ...acc, [`tile ${i}`]: v }), {})
		const characterAnim = character.addComponent(new AnimationComponent(states))
		characterFrame.addChildren(character)
		heroFrames.set(hero, character)




		// ! ARROWS
		if (unlocked) {
			unlockedCharacters.push(characterFrame)
			const characterSelectable = characterFrame.addComponent(new SelectableComponent(undefined, undefined, () => {
				ECS.eventBus.publish(ECSEVENTS.SELECTED, arrowLeft)
			}))
			characterSelectable.next[INPUTS.MOVEDOWN] = validateButton


			// ! BUTTON
			const button = ButtonEntity(20, 4, 2, 'Select', 1, () => {
				ECS.eventBus.publish(ECSEVENTS.SELECTED, characterFrame)
				for (let arr of [State.heros, State.selectedTiles]) {
					if (arr.length === 2) {
						arr.pop()
					}
				}
				State.heros.push(hero)
				State.selectedTiles.push(selectedTile)
				const textValidate = validateButton.children[0].getComponent(TextComponent)
				if (State.heros.length === 1) {
					textValidate.setText('Choose 1 character')
				} else if (State.heros.length === 2) {
					textValidate.setText('Start your adventure')
				}
			})
			button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 1.2 }))
			character.addChildren(button)
			const arrowRight = new Entity('character arrow')
			arrowRight.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
			arrowRight.addComponent(new RotationComponent({ rotation: Math.PI / 2 }))
			arrows.push(arrowRight)
			character.addChildren(arrowRight)
			const arrowLeft = new Entity('character arrow')
			arrowLeft.addComponent(new UIPositionComponent({ x: -1, y: 0 }, { x: 1, y: 0 }))


			arrows.push(arrowLeft)
			character.addChildren(arrowLeft)
			arrows.forEach(arrow => {
				arrow.addComponent(new SpriteComponent(assets.UI.arrow, { scale: 2 }))
				const arrowSelectable = arrow.addComponent(new SelectableComponent(assets.UI.arrowselected, assets.UI.arrow, () => {
					selectedTile = (selectedTile + 1) % tiles.length
					characterAnim.setState(Object.keys(states)[selectedTile])
				}))
				arrowSelectable.next[INPUTS.MOVEDOWN] = button

			})
			arrowLeft.getComponent(SelectableComponent).next[INPUTS.MOVERIGHT] = arrowRight
			arrowRight.getComponent(SelectableComponent).next[INPUTS.MOVELEFT] = arrowLeft
			button.getComponent(SelectableComponent).next[INPUTS.MOVEUP] = arrowLeft
		} else {

			characterSprite.addShader(new ColorShader(0, 0, 0, 1))
			const lock = new Entity('lock')
			lock.addComponent(new SpriteComponent(assets.icons.lock, { scale: 2 }))
			lock.addComponent(new UIPositionComponent())
			characterFrame.addChildren(lock)

		}




	})
	validateButton.getComponent(SelectableComponent).next[INPUTS.MOVEUP] = characterFrames[Math.floor(characterFrames.length / 2)]

	SelectableComponent.setFromArray(unlockedCharacters.reverse())
	return ui
}
export default UIPlayerSelectEntity