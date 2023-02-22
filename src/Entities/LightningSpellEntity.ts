import { ECS, Entity } from "../Globals/ECS"

import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import HealthComponent from "../Components/HealthComponent"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import TargeterComponent from "../Components/TargeterComponent"
import { Vector2 } from "three"
import assets from "../Globals/Assets"

const LightningSpellEntity = (parentPosition: Vector2) => {

	const enemies = ECS.getEntitiesAndComponents(PositionComponent).reduce<Entity[]>((enemies, [id, position]) => {
		const enemy = ECS.getEntityById(id)
		const enemyHealth = enemy.getComponent(HealthComponent)
		if (position.position.distanceTo(parentPosition) <= 100 && enemyHealth?.type === COLLISIONGROUPS.ENEMY) {
			return [...enemies, enemy]
		} else {
			return enemies
		}
	}, [])
	enemies.sort(() => 0.5 - Math.random())
	for (const enemy of enemies.slice(0, 10)) {
		const targeter = enemy.getComponent(TargeterComponent)
		const enemyPosition = enemy.getComponent(PositionComponent)
		targeter.enabled = false
		const lightning = new Entity('lightning')
		const tile = assets.effects.Lightning
		lightning.addComponent(new SpriteComponent(tile))
		const animation = lightning.addComponent(new AnimationComponent({ default: tile }))
		lightning.addComponent(new PositionComponent(enemyPosition.x, enemyPosition.y))
		lightning.addComponent(new DamageComponent(2, [COLLISIONGROUPS.ENEMY], -1))
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