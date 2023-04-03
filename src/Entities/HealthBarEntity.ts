import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { UIEVENTS } from '../Constants/Events'
import assets from '../Globals/Assets'
import { ECS, Entity } from '../Globals/ECS'
import BarShader from '../Shaders/BarShader'

const HealthBarEntity = (parent: Entity, offset: number) => {
	const empty = assets.UI.healthBar
	const full = assets.UI.healthFull
	const healthBarEntity = new Entity('healthBar')

	const healthSprite = healthBarEntity.addComponent(new SpriteComponent(empty, { renderOrder: 20, shaders: [new BarShader(full.texture, 1)] }))
	healthBarEntity.addComponent(new PositionComponent().fromParent(parent, 0, offset))
	const updateSub = ECS.eventBus.subscribe(UIEVENTS.UPDATE_HEALTH, ({ entity, percent }) => {
		if (entity === parent) {
			healthSprite.getUniforms(BarShader).percent.value = percent
			healthSprite.render()
		}
	})
	healthBarEntity.onDestroy(updateSub)
	return healthBarEntity
}
export default HealthBarEntity
