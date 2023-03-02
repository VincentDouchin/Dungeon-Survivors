import { Boost } from "../Constants/Boosts";
import { Entity } from "../Globals/ECS";
import SpriteComponent from "../Components/SpriteComponent";

const BoostEntity = ({ tile }: Boost) => () => {
	const boost = new Entity('boost')
	boost.addComponent(new SpriteComponent(tile, { scale: 0.8, renderOrder: 0 }))
	return boost
}
export default BoostEntity