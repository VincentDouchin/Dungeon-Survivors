import type { Entity } from '../Globals/ECS'
import { ECS } from '../Globals/ECS'

import AIMovementComponent from '../Components/AIMovementComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DamageComponent from '../Components/DamageComponent'
import HealthComponent from '../Components/HealthComponent'
import HealthRegenComponent from '../Components/HealthRegenComponent'
import OutlineShader from '../Shaders/OutlineShader'
import PositionComponent from '../Components/PositionComponent'
import { SOUNDS } from '../Constants/Sounds'
import SpellComponent from '../Components/SpellComponent'
import SpriteComponent from '../Components/SpriteComponent'
import { soundManager } from '../Globals/Initialize'

const CharmSpellEntity = (parent: Entity) => {
	const parentPosition = parent.getComponent(PositionComponent)
	const enemies = ECS.getEntitiesAndComponents(PositionComponent).reduce<Entity[]>((enemies, [id, position]) => {
		const enemy = ECS.getEntityById(id)
		const enemyHealth = enemy.getComponent(HealthComponent)
		if (position.position.distanceTo(parentPosition.position) <= 100 && enemyHealth?.type === COLLISIONGROUPS.ENEMY) {
			return [...enemies, enemy]
		}
		else {
			return enemies
		}
	}, [])
	enemies.sort(() => 0.5 - Math.random())
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
		enemySprite.addShader(new OutlineShader([0, 0.8, 0, 1]))
		const damage = enemy.removeComponent(DamageComponent)
		enemy.addComponent(new DamageComponent(damage.amount.base, [COLLISIONGROUPS.ENEMY], -1, 0))
		enemy.addComponent(new HealthRegenComponent(-(0.1 * health.maxHealth.value), 60))
	}
}
export default CharmSpellEntity
