import ButtonEntity from "./ButtonEntity"
import DIFFICULTY from "../Constants/DIfficulty"
import { Entity } from "../Globals/ECS"
import SelectableComponent from "../Components/SelectableComponent"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import TextComponent from "../Components/TextComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"

const UIMapEntity = () => {
	const ui = new Entity('ui map')
	if (!State.difficulty) {
		const difficultySelect = new Entity('difficulty select')
		const difficultyText = new Entity('difficulty text')
		difficultySelect.addChildren(difficultyText)
		difficultyText.addComponent(new SpriteComponent(Tile.empty(32, 32)))
		difficultyText.addComponent(new TextComponent('Choose your difficulty', { size: 32, outlineWidth: 2 }))
		difficultyText.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: 5 }))
		const difficultyButtons = [DIFFICULTY.EASY, DIFFICULTY.NORMAL, DIFFICULTY.HARD].map((difficulty, index) => {
			const button = ButtonEntity(40, 10, 2, difficulty, 2, () => {
				State.difficulty = difficulty
				difficultySelect.destroy()
			})
			difficultySelect.addChildren(button)
			button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: [2.5, 0, -2.5][index], y: -1.5 }))
			return button
		})
		SelectableComponent.setFromArray(difficultyButtons)
	}
	return ui
}
export default UIMapEntity