
import AIControllerComponent from "../Components/AIControllerComponent"
import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import MeshComponent from "../Components/MeshComponent"
import PositionComponent from "../Components/PositionComponent"
import AssetManager from "../Globals/AssetManager"
import { Entity } from "../Globals/ECS"

const EnemyEntity = () => {
	const enemy = new Entity()
	const orc = AssetManager.tiles.orc_warrior_idle_anim
	enemy.addComponent(new MeshComponent(orc.buffer, orc.width, orc.height))
	enemy.addComponent(new AnimationComponent({
		idle: AssetManager.tiles.orc_warrior_idle_anim,
		run: AssetManager.tiles.orc_warrior_run_anim
	}))
	enemy.addComponent(new PositionComponent(0, 0))
	enemy.addComponent(new AIControllerComponent())
	enemy.addComponent(new BodyComponent({ moveForce: 40 }))
	return enemy
}
export default EnemyEntity