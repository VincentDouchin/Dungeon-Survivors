import SpriteComponent from '../../Components/SpriteComponent'
import StatsComponent, { STATS } from '../../Components/StatsComponent'
import ParticleEntity from '../../Entities/ParticleEntitty'
import assets from '../../Globals/Assets'
import Coroutine from '../../Globals/Coroutine'
import type { Entity } from '../../Globals/ECS'
import ColorShader from '../../Shaders/ColorShader'
import waitFor from '../../Utils/WaitFor'

const FreezeEffect = (entity: Entity) => {
	new Coroutine(function*() {
		const sprite = entity.getComponent(SpriteComponent)
		const stat = entity.getComponent(StatsComponent)
		stat.boosts.push({ stat: STATS.SPEED, duration: 60, modifier: -0.5 })
		ParticleEntity(entity, assets.effects.Ice, { offset: { x: 0, y: -8 } })
		sprite.addShader(new ColorShader(0.4, 1, 1, 1, 'multiply'))
		yield * waitFor(60)
		sprite.removeShader(ColorShader)
	})
}
export default FreezeEffect
