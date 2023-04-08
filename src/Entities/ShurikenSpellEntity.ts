import AIMovementComponent from '../Components/AIMovementComponent'
import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DamageComponent from '../Components/DamageComponent'
import { Entity } from '../Globals/ECS'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import { SOUNDS } from '../Constants/Sounds'
import SpellComponent from '../Components/SpellComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'
import { soundManager } from '../Globals/Initialize'

const ShurikenSpellEntity = (entity: Entity, nb = 10, startPosition?: PositionComponent) => {
	const spellComponent = entity.getComponent(SpellComponent)
	const position = startPosition ?? entity.getComponent(PositionComponent)
	const shuriken = new Entity('Shuriken')
	const tile = assets.weapons.Shuriken
	shuriken.addComponent(new SpriteComponent(tile))
	shuriken.addComponent(new BodyComponent(
		{ moveForce: 500 },
		{ mass: 0.1, group: COLLISIONGROUPS.WEAPON, contact: false, sensor: true, canCollideWith: [COLLISIONGROUPS.ENEMY], width: tile.width, height: tile.height },
	))
	soundManager.play('effect', SOUNDS.SHURIKEN)
	shuriken.addComponent(new AIMovementComponent({ seeking: [COLLISIONGROUPS.ENEMY], seekingDistance: 0 }))
	shuriken.addComponent(new DamageComponent(spellComponent.spellDamage.value, [COLLISIONGROUPS.ENEMY], 1, 2))
	shuriken.addComponent(position.clone())
	shuriken.addComponent(new RotationComponent({ rotationVel: 0.3 }))
	shuriken.onDestroy(() => {
		if (nb > 0) {
			ShurikenSpellEntity(entity, nb - 1)
		}
	})
	return true
}
export default ShurikenSpellEntity
