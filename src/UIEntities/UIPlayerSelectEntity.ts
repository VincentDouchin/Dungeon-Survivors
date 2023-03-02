import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { SELECTED } from "../Constants/ECSEvents"
import HEROS, { HeroDefinition, isUnlocked } from "../Constants/Heros"
import { MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"

import AnimationComponent from "../Components/AnimationComponent"
import ColorShader from "../Shaders/ColorShader"
import Coroutines from "../Globals/Coroutine"
import Engine from "../Globals/Engine"
import { GameStates } from "../Constants/GameStates"
import OutlineShader from "../Shaders/OutlineShader"
import RotationComponent from "../Components/RotationComponent"
import SelectableComponent from "../Components/SelectableComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import TextComponent from "../Components/TextComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import waitFor from "../Utils/WaitFor"

const UIPlayerSelectEntity = () => {
	const ui = new Entity('player select ui')

	const uiPosition = ui.addComponent(new UIPositionComponent({ x: 0, y: -3 }, { x: 0, y: -1 }))
	uiPosition.moveTo(-3, -1, 30)
	ui.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 100, 35), { scale: 3 }))
	const description = new Entity('description')
	description.addComponent(new SpriteComponent(Tile.empty()))
	description.addComponent(new TextComponent('Choose your characters', { size: 32 }))
	description.addComponent(new UIPositionComponent({ x: 0, y: 0.8 }, { x: 0, y: 1 }))
	ui.addChildren(description)
	const heroFrames: Map<HeroDefinition, Entity> = new Map()
	const unlockedCharacters: Entity[] = []
	const characterFrames: Entity[] = []
	const buttonTile = assets.UI.button.framed(4, 20, 5)
	const buttonPressedTile = assets.UI.buttonpressed.framed(4, 20, 5)
	const buttonUnselectedTile = assets.UI.buttondisabled.framed(4, 20, 5)
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
	const validateButton = new Entity('validateButton')
	const validateSelectable = validateButton.addComponent(new SelectableComponent(assets.UI.button.framed(5, 60, 5), assets.UI.buttondisabled.framed(5, 60, 5), () => {
		if (State.heros.length === 2) {
			uiPosition.moveTo(-1, -3, 30).then(() => {
				Engine.setState(GameStates.map)
			})
		}
	}))
	validateButton.addComponent(new SpriteComponent(assets.UI.button.framed(5, 60, 5), { scale: 2, renderOrder: 0 }))
	validateButton.addComponent(new UIPositionComponent({ x: 0, y: -0.7 }, { x: 0, y: 0 }))
	const validateText = new Entity('validate text')
	const textValidate = validateText.addComponent(new TextComponent('Choose 2 characters'))
	validateText.addComponent(new SpriteComponent(Tile.empty(76, 21), { scale: 2 }))

	validateText.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: -1 / 8 }))
	validateButton.addChildren(validateText)
	ui.addChildren(validateButton)

	ECS.eventBus.subscribe<SELECTED>(ECSEVENTS.SELECTED, entity => {
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
	HEROS.sort((a, b) => (isUnlocked(b) ? 1 : 0) - (isUnlocked(a) ? 1 : 0)).forEach((hero, index) => {
		const tiles = hero.tiles.map(tiles => tiles.idle)
		const unlocked = isUnlocked(hero)
		const arrows: Entity[] = []
		let selectedTile = 0
		// ! FRAME
		const characterFrame = new Entity('character frame')
		characterFrame.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 40, 35), { scale: 2 }))
		characterFrames.push(characterFrame)


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
				ECS.eventBus.publish<SELECTED>(ECSEVENTS.SELECTED, arrowLeft)
			}))
			characterSelectable.next[MOVEDOWN] = validateButton


			// ! BUTTON
			const button = new Entity(`button ${index}`)

			const selectSelectabled = button.addComponent(new SelectableComponent(buttonTile, buttonUnselectedTile, () => {
				new Coroutine(function* () {
					buttonSprite.changeTexture(buttonPressedTile.texture)
					textPosition.relativePosition.y = 0
					yield* waitFor(10)
					buttonSprite.changeTexture(buttonTile.texture)
					textPosition.relativePosition.y = 1 / 8
					ECS.eventBus.publish<SELECTED>(ECSEVENTS.SELECTED, characterFrame)
				})
				// characterSprite.addShader(new OutlineShader([1, 1, 1, 1]))
				for (let arr of [State.heros, State.selectedTiles]) {
					if (arr.length === 2) {
						arr.pop()
					}
				}
				State.heros.push(hero)
				State.selectedTiles.push(selectedTile)
				if (State.heros.length === 1) {
					textValidate.setText('Choose 1 character')
				} else if (State.heros.length === 2) {
					textValidate.setText('Start your adventure')
				}
			}))
			const buttonSprite = button.addComponent(new SpriteComponent(buttonUnselectedTile, { scale: 2 }))
			button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 1.2 }))
			const text = new Entity('text')
			text.addComponent(new SpriteComponent(Tile.empty()))
			const textPosition = text.addComponent(new UIPositionComponent({ x: 0, y: 1 / 8 }, { x: 0, y: 0 }))
			text.addComponent(new TextComponent('Select'))
			button.addChildren(text)
			character.addChildren(button)
			const arrowRight = new Entity('character arrow')
			arrowRight.addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
			arrowRight.addComponent(new RotationComponent(Math.PI / 2))
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
				arrowSelectable.next[MOVEDOWN] = button

			})
			arrowLeft.getComponent(SelectableComponent).next[MOVERIGHT] = arrowRight
			arrowRight.getComponent(SelectableComponent).next[MOVELEFT] = arrowLeft
			selectSelectabled.next[MOVEUP] = arrowLeft
		} else {

			characterSprite.addShader(new ColorShader(0, 0, 0, 1))

		}




	})
	validateSelectable.next[MOVEUP] = characterFrames[1]
	characterFrames[1].addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: 0 }))
	ui.addChildren(characterFrames[1])
	characterFrames[2].addComponent(new UIPositionComponent({ x: 1, y: 0 }, { x: -1, y: 0 }))
	characterFrames[1].addChildren(characterFrames[2])
	characterFrames[0].addComponent(new UIPositionComponent({ x: -1, y: 0 }, { x: 1, y: 0 }))
	characterFrames[1].addChildren(characterFrames[0])
	SelectableComponent.setFromArray(unlockedCharacters)
	return ui
}
export default UIPlayerSelectEntity