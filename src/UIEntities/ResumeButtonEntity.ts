import Coroutine from "../Globals/Coroutine"
import Engine from "../Globals/Engine"
import { Entity } from "../Globals/ECS"
import { GameStates } from "../Constants/GameStates"
import SelectableComponent from "../Components/SelectableComponent"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import buttonTiles from "../Utils/ButtonTiles"
import waitFor from "../Utils/WaitFor"

const ResumeButtonEntity = () => {
	const resume = new Entity('resume button')
	const [normal, pressed, disabled] = buttonTiles(30, 8)
	const sprite = resume.addComponent(new SpriteComponent(disabled, { scale: 2 }))
	resume.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 2 }))
	resume.addComponent(new TextComponent('Resume', { size: 24 }))
	const select = resume.addComponent(new SelectableComponent(normal, disabled,))
	select.onValidated = () => {
		new Coroutine(function* () {
			sprite.changeTexture(pressed.texture)
			yield* waitFor(10)
			sprite.changeTexture(normal.texture)
			Engine.setState(GameStates.run)

		})
	}
	return resume
}
export default ResumeButtonEntity