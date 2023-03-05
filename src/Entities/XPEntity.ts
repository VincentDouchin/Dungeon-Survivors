import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import ColorShader from "../Shaders/ColorShader"
import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import XPComponent from "../Components/XPComponent"
import assets from "../Globals/Assets"

const XPEntity = (amount = 1) => () => {
	const xp = new Entity('xp')
	xp.addComponent(new SpriteComponent(assets.effects.Spark, { renderOrder: 1, scale: 0.8, shaders: [new ColorShader(amount / 10, 1, 1, 1, 'multiply')] }))
	xp.addComponent(new AnimationComponent({ idle: assets.effects.Spark }))
	xp.addComponent(new BodyComponent(
		{ moveForce: 1000 },
		[
			{ width: 2, height: 2, contact: false, group: COLLISIONGROUPS.XP, canCollideWith: [COLLISIONGROUPS.SENSOR], mass: 1 }
		]))
	xp.addComponent(new XPComponent(amount))
	return xp
}
export default XPEntity