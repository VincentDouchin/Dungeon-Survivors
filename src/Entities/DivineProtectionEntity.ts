import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import ExpirationComponent from "../Components/ExpirationComponent"
import PositionComponent from "../Components/PositionComponent"
import { SOUNDS } from "../Constants/Sounds"
import SpellComponent from "../Components/SpellComponent"
import SpriteComponent from "../Components/SpriteComponent"
import assets from "../Globals/Assets"
import { soundManager } from "../Globals/Initialize"

const DivineProtectionEntity = (entity: Entity) => {
	const position = entity.getComponent(PositionComponent)
	const tile = assets.effects.auraCircle
	const beam = new Entity('beam')
	const beamTile = assets.effects.beam
	const spellComponent = entity.getComponent(SpellComponent)
	beam.addComponent(new PositionComponent(position.x, position.y - 4 + (beamTile.height * 1.5) / 2))
	beam.addComponent(new SpriteComponent(beamTile, { scale: 1.5, opacity: 0.8 }))
	const beamAnimation = beam.addComponent(new AnimationComponent({ default: beamTile }))
	beamAnimation.playAnimation().then(() => {
		beam.destroy()
	})
	const spell = new Entity('divine protection')
	spell.addComponent(new PositionComponent(position.x, position.y))
	spell.addComponent(new SpriteComponent(tile, { scale: 2, renderOrder: 1 }))
	spell.addComponent(new AnimationComponent({ default: tile }))
	spell.addComponent(new BodyComponent({}, [{
		sensor: true, canCollideWith: [COLLISIONGROUPS.ENEMY], group: COLLISIONGROUPS.PLAYER, contact: true, width: tile.width * 2, height: tile.height * 2
	}]))
	spell.addComponent(new DamageComponent(spellComponent.spellDamage.value, [COLLISIONGROUPS.ENEMY], -1))
	spell.addComponent(new ExpirationComponent(120))
	soundManager.play('effect', SOUNDS.Magic)
	return spell

}
export default DivineProtectionEntity