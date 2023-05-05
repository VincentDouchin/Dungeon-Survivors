import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import type { STATS } from '../Constants/Stats'
import StatsComponent from '../Components/StatsComponent'
import { UIEVENTS } from '../Constants/Events'
import SKILLS from '../Constants/Skills'
import { ECS, Entity } from '../Globals/ECS'

const DisplayBuffsEntity = (player: Entity, offset: number) => {
	const playerStats = player.getComponent(StatsComponent)
	const displayBuffs = new Entity('display buffs')
	const buffs = new Map<STATS, Entity>()
	const sub = ECS.eventBus.subscribe(UIEVENTS.DISPLAY_BOOST, (stats) => {
		if (playerStats === stats) {
			const allBuffs = Array.from(new Set(stats.buffs.map(buff => buff.stat)))
			allBuffs.forEach((stat) => {
				if (!buffs.has(stat)) {
					const buffIcon = new Entity('buff icon')
					const tile = SKILLS.find(skill => skill.statName === stat)!.icon
					buffIcon.addComponent(new SpriteComponent(tile, { scale: 0.4, renderOrder: 20 }))
					displayBuffs.addChildren(buffIcon)
					buffs.set(stat, buffIcon)
					buffIcon.addComponent(PositionComponent.fromParent(player, 0, offset))
				}
			})
			buffs.forEach((entity, stat) => {
				if (!allBuffs.includes(stat)) {
					entity.destroy()
					buffs.delete(stat)
				}
			})
			Array.from(displayBuffs.children).forEach((buffEntity, index) => {
				buffEntity.getComponent(PositionComponent).offsetX = -8 + 6 * index
			})
		}
	})
	displayBuffs.onDestroy(sub)
	return displayBuffs
}
export default DisplayBuffsEntity
