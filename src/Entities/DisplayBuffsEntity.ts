import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import StatsComponent from '../Components/StatsComponent'
import { UIEVENTS } from '../Constants/Events'
import SKILLS from '../Constants/Skills'
import { ECS, Entity } from '../Globals/ECS'

const DisplayBuffsEntity = (player: Entity, offset: number) => {
	const playerStats = player.getComponent(StatsComponent)
	const displayBuffs = new Entity('display buffs')
	const sub = ECS.eventBus.subscribe(UIEVENTS.DISPLAY_BOOST, (stats) => {
		if (playerStats === stats) {
			displayBuffs.children.forEach(child => child.destroy())

			const allBuffs = Array.from(new Set(stats.buffs.map(buff => buff.stat)))
			allBuffs.forEach((stat, index) => {
				const buffIcon = new Entity('buff icon')
				const tile = SKILLS.find(skill => skill.statName === stat)!.icon

				buffIcon.addComponent(new SpriteComponent(tile, { scale: 0.4, renderOrder: 20 }))

				buffIcon.addComponent(new PositionComponent().fromParent(player, -8 + 6 * index, offset))
				displayBuffs.addChildren(buffIcon)
				return buffIcon
			})
		}
	})
	displayBuffs.onDestroy(sub)
	return displayBuffs
}
export default DisplayBuffsEntity
