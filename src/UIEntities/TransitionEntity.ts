import { Entity } from '../Globals/ECS'
import ExpirationComponent from '../Components/ExpirationComponent'
import SpriteComponent from '../Components/SpriteComponent'
import Tile from '../Utils/Tile'
import TransitionShader from '../Shaders/TransitionShader'
import { UICamera } from '../Globals/Initialize'
import UIPositionComponent from '../Components/UIPositionComponent'

const TransitionEntity = (duration: number, atHalf?: () => void) => {
	const transition = new Entity('transition')
	const transitionShader = new TransitionShader(duration, atHalf)
	transition.addComponent(new SpriteComponent(Tile.empty(UICamera.right * 2, UICamera.top * 2), { renderOrder: 100000, shaders: [transitionShader] }))
	transition.addComponent(new UIPositionComponent())
	transition.addComponent(new ExpirationComponent(duration))
	return transition
}
export default TransitionEntity
