import Coroutines from "../Globals/Coroutines"
import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import { assets } from "../Globals/Initialize"
import framedTile from "../Utils/FramedTile"
import waitFor from "../Utils/WaitFor"

const TimeCounterEntity = () => {
	const timer = new Entity('timer')
	timer.addComponent(new SpriteComponent(framedTile(assets.UI.frame1, 16, 0, 0), { scale: 1 }))
	timer.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 1 }))
	const timerText = timer.addComponent(new TextComponent(String(0)))
	Coroutines.add(function* () {
		let timer = 0
		while (true) {
			yield* waitFor(60)
			timer++
			timerText.setText(String(timer))
		}
	})
	return timer
}
export default TimeCounterEntity