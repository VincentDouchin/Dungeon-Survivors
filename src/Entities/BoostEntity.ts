import BodyComponent from "../Components/BodyComponent";
import { Boost } from "../Constants/Boosts";
import BoostComponent from "../Components/BoostComponent";
import COLLISIONGROUPS from "../Constants/CollisionGroups";
import { Entity } from "../Globals/ECS";
import OutlineShader from "../Shaders/OutlineShader";
import SpriteComponent from "../Components/SpriteComponent";

const BoostEntity = (boostDefinition: Boost) => () => {
	const boost = new Entity('boost')
	boost.addComponent(new SpriteComponent(boostDefinition.tile, { scale: 0.8, renderOrder: 0, shaders: [new OutlineShader([1, 1, 1, 1])] }))
	boost.addComponent(new BoostComponent(boostDefinition))
	boost.addComponent(new BodyComponent({ type: 'fixed' }, [
		{ width: boostDefinition.tile.width, height: boostDefinition.tile.height, sensor: true, contact: false, group: COLLISIONGROUPS.POTION, canCollideWith: [COLLISIONGROUPS.PLAYER] }
	]))
	return boost
}
export default BoostEntity