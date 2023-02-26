import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import TokenComponent from "../Components/TokenComponent"
import assets from "../Globals/Assets"

const ManaDropEntity = () => {
	const token = new Entity('token')
	token.addComponent(new SpriteComponent(assets.icons.gem, { renderOrder: 1, scale: 0.8 }))
	token.addComponent(new BodyComponent(
		{ moveForce: 1000 },
		[
			{ width: 2, height: 2, contact: false, group: COLLISIONGROUPS.XP, canCollideWith: [COLLISIONGROUPS.SENSOR], mass: 1 }
		]))
	token.addComponent(new TokenComponent())
	return token
}
export default ManaDropEntity