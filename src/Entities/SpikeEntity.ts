import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import { assets } from "../Globals/Initialize"

const SpikeEntity = ({ x, y }: { x: number, y: number }) => {
	const spike = new Entity('spike')
	const tile = assets.tiles.floor_spikes_anim
	spike.addComponent(new SpriteComponent(tile, { renderOrder: 1 }))
	spike.addComponent(new AnimationComponent({ idle: tile }))
	spike.addComponent(new BodyComponent({ type: "fixed" }, [
		{ width: tile.width, height: tile.height, sensor: true, contact: true, group: COLLISIONGROUPS.TRAP, canCollideWith: [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY] }
	]))
	spike.addComponent(new PositionComponent(x, y))
	spike.addComponent(new DamageComponent(20, [COLLISIONGROUPS.PLAYER, COLLISIONGROUPS.ENEMY]))

}
export default SpikeEntity