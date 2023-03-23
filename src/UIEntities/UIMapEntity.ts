import ButtonEntity from './ButtonEntity'
import DIFFICULTY from '../Constants/DIfficulty'
import { Entity } from '../Globals/ECS'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'
import { inputManager } from '../Globals/Initialize'

const UIMapEntity = () => {
	const ui = new Entity('ui map')

	if (!State.difficulty || !State.multiplayer) {
		const showDifficulty = ()=>{
			const difficultySelect = new Entity('difficulty select')
			const difficultyText = new Entity('difficulty text')
			difficultySelect.addChildren(difficultyText)
			difficultyText.addComponent(new SpriteComponent(Tile.empty(1, 150)))
			difficultyText.addComponent(new TextComponent('Choose your difficulty', { size: 32, outlineWidth: 2 }))
			difficultyText.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: -1 }))
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
		
		const showOptions = () => {
			if (State.multiplayer) {
				const controls = new Entity('multiplayer controls')
				let inputMethods :ReturnType<typeof inputManager.getInputMethods>
				const selectedMethods : string[]=[]
				const buttons:Entity[] = []
				for (let i = 1; i <= 2; i++) {
					let lastController = -1
					const button = ButtonEntity(100, 10, 2, 'Choose controls', 2, () => {
						inputMethods = inputManager.getInputMethods()
						const possibleControllers = inputMethods.filter(([key])=>!selectedMethods.includes(key))
						if(possibleControllers.length === 0)return 
						lastController =(lastController+1)%possibleControllers.length
						State.multiplayerControls[i-1] =possibleControllers[lastController][1] 
						button.children.forEach(child=>{
							const text = child.getComponent(TextComponent)
							if( text &&!text?.text.includes('Player')){
								const key = possibleControllers[lastController][0]
								text.setText( key)
								selectedMethods[i] = key
							}
						})
					})
					buttons.push(button)
					const buttonText = new Entity('button text')
					buttonText.addComponent(new SpriteComponent(Tile.empty(32, 32)))
					buttonText.addComponent(new TextComponent(`Player ${i}`, { size: 32, outlineWidth: 0.5 }))
					buttonText.addComponent(new UIPositionComponent().top())
					button.addChildren(buttonText)
					button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: i === 1 ? 1 : -1, y: -1 }))
					controls.addChildren(button)
					if(i === 2){
						const okButton = ButtonEntity(10,10,2,'OK',2,()=>{
							if(State.multiplayerControls.some(control =>control === null))return 
							controls.destroy()
							showDifficulty()
						})
						buttons.push(okButton)
						okButton.addComponent(new UIPositionComponent({x:1,y:0},{x:-1,y:0}))
						button.addChildren(okButton)
					}
				}
				SelectableComponent.setFromArray(buttons)
			}else {
				showDifficulty()
			}
		}

		// ! MULTIPLAYER
		const multiplayerSelect = new Entity('multiplayer select')
		const multiplayerButtons = [false, true].map(multiplayer => {
			const button = ButtonEntity(60, 10, 2, multiplayer ? 'Multiplayer' : 'Singleplayer', 2, () => {
				State.multiplayer = multiplayer
				multiplayerSelect.destroy()
				showOptions()
			})
			multiplayerSelect.addChildren(button)
			button.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: multiplayer ? -1 : 1, y: -1 }))
			return button
		})
		SelectableComponent.setFromArray(multiplayerButtons)
		ui.addChildren(multiplayerSelect)


	}
	return ui
}
export default UIMapEntity