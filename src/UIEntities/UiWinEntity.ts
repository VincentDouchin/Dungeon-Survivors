import HEROS, { isUnlocked } from "../Constants/Heros"
import saveData, { save } from "../Globals/SaveManager"

import ColorShader from "../Shaders/ColorShader"
import Coroutine from "../Globals/Coroutine"
import { Entity } from "../Globals/ECS"
import { SOUNDS } from "../Constants/Sounds"
import SelectableComponent from "../Components/SelectableComponent"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"
import { soundManager } from "../Globals/Initialize"

const UIWinEntity = () => {
	const ui = new Entity('game over ui')
	const win = new Entity('lost')
	win.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 1 }))
	win.addComponent(new SpriteComponent(Tile.empty(200, 100)))
	win.addComponent(new TextComponent('You won!', { size: 128, outlineWidth: 3 }))
	const selectText = new Entity('select text')
	selectText.addComponent(new SpriteComponent(Tile.empty(200, 30)))
	selectText.addComponent(new UIPositionComponent().bottom())
	selectText.addComponent(new TextComponent('Select a character to unlock', { size: 32, outlineWidth: 2 }))
	const unlockedHeros = HEROS.filter((hero) => !isUnlocked(hero))


	const heros = unlockedHeros.map((hero, index) => {
		const heroEntity = new Entity('select hero')
		const heroSprite = heroEntity.addComponent(new SpriteComponent(hero.tiles[0].idle, { scale: 5, renderOrder: 100, shaders: [new ColorShader(0, 0, 0, 1)] }))

		heroEntity.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 1 }).offsetX(unlockedHeros.length, index))
		heroEntity.addComponent(new SelectableComponent(undefined, undefined, () => {

			new Coroutine(function* (i) {
				yield heroSprite.getUniforms(ColorShader).color.value = [i / 180, i / 180, i / 180, 1]
				heroSprite.render()
			}, 180)
			saveData.heros.push(hero.name)
			save()
			soundManager.play('effect', SOUNDS.UNLOCK, { fade: false })
			heros.forEach(otherHero => otherHero.removeComponent(SelectableComponent))
		}))

		selectText.addChildren(heroEntity)
		return heroEntity
	})
	SelectableComponent.setFromArray(heros)

	win.addChildren(selectText)
	ui.addChildren(win)

	return ui
}
export default UIWinEntity