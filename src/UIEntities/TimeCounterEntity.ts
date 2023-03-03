import { ECS, Entity } from "../Globals/ECS"

import Coroutine from "../Globals/Coroutine";
import { ECSEVENTS } from "../Constants/Events"
import SpriteComponent from "../Components/SpriteComponent"
import State from "../Globals/State"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"
import waitFor from "../Utils/WaitFor"

const formatTimer = () => `${Math.floor(State.timer / 60)}:${String(State.timer % 60).padStart(2, '0')}`

const TimeCounterEntity = () => {
	const timer = new Entity('timer')
	timer.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 24, 0), { scale: 1.5 }))
	timer.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 1 }))
	const timerText = timer.addComponent(new TextComponent(formatTimer(),))
	new Coroutine(function* () {
		let startCounter = true
		timer.onDestroy(() => startCounter = false)
		while (startCounter) {
			yield* waitFor(60)
			State.timer++
			timerText.setText(formatTimer())
			if (State.timer % 120 === 0) {
				ECS.eventBus.publish(ECSEVENTS.ENENMY_LEVEL_UP, State.timer % 120)
			}
		}
	})
	return timer
}
export default TimeCounterEntity