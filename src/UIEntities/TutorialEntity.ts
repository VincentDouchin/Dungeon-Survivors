import Coroutines from "../Globals/Coroutines"
import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import waitFor from "../Utils/WaitFor"

const TutorialEntity = () => {
	const tutorial = new Entity('tutorial')
	tutorial.addComponent(new SpriteComponent(assets.UI.empty))
	tutorial.addComponent(new TextComponent('WASD - Movement     Shift - Switch charcaters     P - Spell     Escape - Pause'))
	tutorial.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: -1 }))
	Coroutines.add(function* () {
		yield* waitFor(600)
		tutorial.destroy()
	})
	return tutorial
}
export default TutorialEntity