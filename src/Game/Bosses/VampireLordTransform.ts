import AIMovementComponent from '../../Components/AIMovementComponent'
import Coroutine from '../../Globals/Coroutine'
import Enemies from '../../Constants/Enemies'
import EnemyEntity from '../../Entities/EnemyEntity'
import type { Entity } from '../../Globals/ECS'
import LevelComponent from '../../Components/LevelComponent'
import PositionComponent from '../../Components/PositionComponent'
import RangedComponent from '../../Components/RangedComponent'
import StatsComponent from '../../Components/StatsComponent'
import waitFor from '../../Utils/WaitFor'

const VampireLordTransform = (boss: Entity) => {
	const stats = boss.getComponent(StatsComponent)
	const level = boss.getComponent(LevelComponent)
	boss.onDestroy(() => {
		const bat = EnemyEntity({ ...Enemies.bat, boss: true, health: 200, speed: 7 }, stats, level)(boss.getComponent(PositionComponent))
		bat.getComponent(AIMovementComponent).seekingDistance = 500
		bat.addComponent(new RangedComponent())
		const batCoroutine = new Coroutine(function* () {
			yield * waitFor(500)
			bat.destroy()
		})
		bat.onDestroy(() => {
			batCoroutine.stop()
			EnemyEntity({ ...Enemies.vampireLord, transforms: [] })(bat.getComponent(PositionComponent))
		})
	})
}
export default VampireLordTransform
