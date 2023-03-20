import { ECS, Entity } from "../Globals/ECS"

import AIMovementComponent from "../Components/AIMovementComponent"
import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import Coroutine from "../Globals/Coroutine"
import DamageComponent from "../Components/DamageComponent"
import { ECSEVENTS } from "../Constants/Events"
import HealthComponent from "../Components/HealthComponent"
import PositionComponent from "../Components/PositionComponent"
import { SOUNDS } from "../Constants/Sounds"
import SpellComponent from "../Components/SpellComponent"
import SpriteComponent from "../Components/SpriteComponent"
import assets from "../Globals/Assets"
import { soundManager } from "../Globals/Initialize"
import waitFor from "../Utils/WaitFor"

const LightningSpellEntity = (entity: Entity) => {
	const parentPosition = entity.getComponent(PositionComponent)
	const enemies = ECS.getEntitiesAndComponents(PositionComponent).reduce<Entity[]>((enemies, [id, position]) => {
		const enemy = ECS.getEntityById(id)
		const enemyHealth = enemy.getComponent(HealthComponent)
		if (position.position.distanceTo(parentPosition.position) <= 100 && enemyHealth?.type === COLLISIONGROUPS.ENEMY) {
			return [...enemies, enemy]
		} else {
			return enemies
		}
	}, [])
	enemies.sort(() => 0.5 - Math.random())
	const deletedEntities: Entity[] = []
	const deleteSub = ECS.eventBus.subscribe(ECSEVENTS.DELETE_ENTITY, (entity) => {
		deletedEntities.push(entity)
	})
	new Coroutine(function* () {
		let counter = 0
		for (const enemy of enemies) {
			if (deletedEntities.includes(enemy)) continue
			counter++
			if (counter === 10) break
			soundManager.play('effect', SOUNDS.THUNDER)
			const targeter = enemy.getComponent(AIMovementComponent)
			const enemyPosition = enemy.getComponent(PositionComponent)
			targeter.enabled = false
			const lightning = new Entity('lightning')
			const tile = assets.effects.lightning
			lightning.addComponent(new SpriteComponent(tile))
			const spellComponent = entity.getComponent(SpellComponent)
			const animation = lightning.addComponent(new AnimationComponent({ default: tile, }, { frameRate: 4 }))
			lightning.addComponent(new PositionComponent(enemyPosition.x, enemyPosition.y))
			lightning.addComponent(new DamageComponent(spellComponent.spellDamage.value, [COLLISIONGROUPS.ENEMY], -1))
			lightning.addComponent(new BodyComponent({}, [{
				width: 1, height: 1, sensor: true, contact: true, canCollideWith: [COLLISIONGROUPS.ENEMY], group: COLLISIONGROUPS.WEAPON
			}]))
			animation.playAnimation().then(() => {
				lightning.destroy()
				targeter.enabled = true
			})
			yield* waitFor(5)
		}
		deleteSub
	})


}
export default LightningSpellEntity