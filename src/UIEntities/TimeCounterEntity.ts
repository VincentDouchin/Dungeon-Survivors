import { ECS, Entity } from '../Globals/ECS'

import { ECSEVENTS } from '../Constants/Events'
import SpriteComponent from '../Components/SpriteComponent'
import State from '../Globals/State'
import TextComponent from '../Components/TextComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'

const formatTimer = () => `${Math.floor(State.timer / 60)}:${String(State.timer % 60).padStart(2, '0')}`

const TimeCounterEntity = () => {
	const timer = new Entity('timer')
	timer.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 24, 0), { scale: 1.5 }))
	const position = timer.addComponent(new UIPositionComponent({ x: 0, y: 2 }, { x: 0, y: 1 }))
	position.moveTo(1, 20)
	const timerText = timer.addComponent(new TextComponent(formatTimer()))
	const timerSub = ECS.eventBus.subscribe(ECSEVENTS.TIMER, () => {
		timerText.setText(formatTimer())
	})
	timer.onDestroy(() => {
		timerSub()
	})
	return timer
}
export default TimeCounterEntity
