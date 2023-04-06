import { Tween } from '@tweenjs/tween.js'
import BodyComponent from '../Components/BodyComponent'
import type { Boost } from '../Constants/Boosts'
import BoostComponent from '../Components/BoostComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import { Entity } from '../Globals/ECS'
import OutlineShader from '../Shaders/OutlineShader'
import type PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import ShadowEntity from './ShadowEntity'
const BoostEntity = (boostDefinition: Boost) => (position: PositionComponent) => {
	const boost = new Entity('boost')
	const sprite = boost.addComponent(new SpriteComponent(boostDefinition.tile, { scale: 0.8, renderOrder: 1, shaders: [new OutlineShader([1, 1, 1, 1])] }))
	boost.addComponent(new BoostComponent(boostDefinition))
	boost.addComponent(new BodyComponent({ },
		{ width: boostDefinition.tile.width, height: boostDefinition.tile.height, sensor: true, contact: false, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] },
	))
	boost.addComponent(position)
	const tween = new Tween(sprite).to({ offsetY: 5 }, 600).repeat(Infinity).yoyo(true).start()
	boost.addChildren(ShadowEntity(12, 5, 6, boost))
	boost.onDestroy(() => tween.stop())
	return boost
}
export default BoostEntity
