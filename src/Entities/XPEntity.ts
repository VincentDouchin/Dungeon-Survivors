import MeshComponent from "../Components/MeshComponent"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const XPEntity = () => {
	const xp = new Entity()
	xp.addComponent(new MeshComponent(AssetManager.tiles.xp, { renderOrder: 1, scale: 0.5 }))

	return xp
}
export default XPEntity