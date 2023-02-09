import Coroutines from "../Globals/Coroutines"
import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
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
		let startCounter = true
		timer.onDestroy(() => startCounter = false)
		while (startCounter) {
			yield* waitFor(60)
			State.timer++
			timerText.setText(String(State.timer))
		}
		console.log('stop timer')
	})
	return timer
}
export default TimeCounterEntity