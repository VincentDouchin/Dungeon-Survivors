import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { ECSEVENTS } from '../Constants/Events'
import assets from '../Globals/Assets'
import { ECS, Entity } from '../Globals/ECS'
import BarShader from '../Shaders/BarShader'

const PlayerManaBarEntity = (player: Entity, offset: number) => {
	const bar = new Entity('player mana bar')
	const sprite = bar.addComponent(new SpriteComponent(assets.UI.healthBar, { renderOrder: 20, shaders: [new BarShader(assets.UI.manafull.texture, 1)] }))
	const updateSub = ECS.eventBus.subscribe(ECSEVENTS.MANA_PERCENT, ({ percent, entity }) => {
		if (entity === player) {
			sprite.getUniforms(BarShader).percent.value = percent
			sprite.render()
		}
	})
	bar.addComponent(new PositionComponent().fromParent(player, 0, offset))

	bar.onDestroy(updateSub)
	return bar
}

export default PlayerManaBarEntity
