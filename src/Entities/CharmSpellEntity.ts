import AIMovementComponent from '../Components/AIMovementComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DamageComponent from '../Components/DamageComponent'
import { ECS } from '../Globals/ECS'
import type { Entity } from '../Globals/ECS'
import HealthComponent from '../Components/HealthComponent'
import OutlineShader from '../Shaders/OutlineShader'
import PositionComponent from '../Components/PositionComponent'
import { SOUNDS } from '../Constants/Sounds'
import SpellComponent from '../Components/SpellComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { soundManager } from '../Globals/Initialize'
import StatsComponent from '../Components/StatsComponent'
import { STATS } from '../Constants/Stats'

const CharmSpellEntity = (parent: Entity) => {
	const parentPosition = parent.getComponent(PositionComponent)
	const enemies = ECS.getEntitiesAndComponents(PositionComponent).reduce<Entity[]>((enemies, [enemy, position]) => {
		const enemyHealth = enemy.getComponent(HealthComponent)
		if (position.position.distanceTo(parentPosition.position) <= 100 && enemyHealth?.type === COLLISIONGROUPS.ENEMY) {
			return [...enemies, enemy]
		}
		else {
			return enemies
		}
	}, [])
	enemies.sort(() => 0.5 - Math.random())
	if (enemies.length === 0) return false
	let charmAmount = parent.getComponent(SpellComponent).spellDamage.value
	soundManager.play('effect', SOUNDS.CHARM)
	for (const enemy of enemies.slice(0, 10)) {
		if (charmAmount < enemy.getComponent(HealthComponent).maxHealth.base) continue
		const health = enemy.removeComponent(HealthComponent)

		charmAmount -= health.maxHealth.base
		const newHealth = enemy.addComponent(new HealthComponent(health.maxHealth.base, COLLISIONGROUPS.PLAYER))
		newHealth.health = health.health
		const ai = enemy.removeComponent(AIMovementComponent)
		enemy.addComponent(new AIMovementComponent({ seeking: [COLLISIONGROUPS.ENEMY], seekingDistance: 0, charger: ai.charger }))
		const enemySprite = enemy.getComponent(SpriteComponent)
		enemySprite.removeShader(OutlineShader)
		enemySprite.addShader(new OutlineShader([1, 0.4, 1, 1]))
		const damage = enemy.removeComponent(DamageComponent)
		enemy.addComponent(new DamageComponent(damage.amount.base, [COLLISIONGROUPS.ENEMY], -1, 0))
		enemy.getComponent(StatsComponent).addBuff({ stat: STATS.REGEN, duration: Infinity, flat: 0.1 * health.maxHealth.value, modifier: 0 })
	}
	return true
}
export default CharmSpellEntity
