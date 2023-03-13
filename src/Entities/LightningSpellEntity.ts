import { ECS, Entity } from "../Globals/ECS"

import AIMovementComponent from "../Components/AIMovementComponent"
import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import HealthComponent from "../Components/HealthComponent"
import PositionComponent from "../Components/PositionComponent"
import { SOUNDS } from "../Constants/Sounds"
import SpellComponent from "../Components/SpellComponent"
import SpriteComponent from "../Components/SpriteComponent"
import assets from "../Globals/Assets"
import { soundManager } from "../Globals/Initialize"

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
	soundManager.play('effect', SOUNDS.THUNDER)
	for (const enemy of enemies.slice(0, 10)) {
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
			width: tile.width, height: tile.height, sensor: true, contact: true, canCollideWith: [COLLISIONGROUPS.ENEMY], group: COLLISIONGROUPS.WEAPON
		}]))
		animation.playAnimation().then(() => {
			lightning.destroy()
			targeter.enabled = true
		})
	}


}
export default LightningSpellEntity