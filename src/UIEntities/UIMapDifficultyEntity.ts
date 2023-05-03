import DIFFICULTY from '../Constants/DIfficulty'
import { Entity } from '../Globals/ECS'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'
import ButtonEntity from './ButtonEntity'

const UIMapDifficultyEntity = () => new Promise<DIFFICULTY>((resolve) => {
	const difficultySelect = new Entity('difficulty select')
	difficultySelect.addComponent(new SpriteComponent(Tile.empty()))
	const position = difficultySelect.addComponent(new UIPositionComponent({ x: 0, y: -2 }, { x: 0, y: -1 }))
	position.moveTo(-1, 30)
	const difficultyText = new Entity('difficulty text')
	difficultySelect.addChildren(difficultyText)
	difficultyText.addComponent(new SpriteComponent(Tile.empty(1, 150)))
	difficultyText.addComponent(new TextComponent('Choose your difficulty', { size: 32, outlineWidth: 2 }))
	difficultyText.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: -1 }))
	const difficultyButtons = [DIFFICULTY.EASY, DIFFICULTY.NORMAL, DIFFICULTY.HARD].map((difficulty, index) => {
		const button = ButtonEntity(40, 10, 2, difficulty, 2, () => {
			position.moveTo(-2, 30).then(() => {
				resolve(difficulty)
				difficultySelect.destroy()
			})
		})
		difficultySelect.addChildren(button)
		button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: [2.5, 0, -2.5][index], y: -1.5 }))
		return button
	})
	SelectableComponent.setFromArray(difficultyButtons)
})

export default UIMapDifficultyEntity
