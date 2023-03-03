import StatsComponent, { STATS } from "../Components/StatsComponent"

import { ALLSOUNDS } from "../Globals/Sounds"
import AnimationComponent from "../Components/AnimationComponent"
import BodyComponent from "../Components/BodyComponent"
import COLLISIONGROUPS from "../Constants/CollisionGroups"
import DamageComponent from "../Components/DamageComponent"
import { Entity } from "../Globals/ECS"
import ExpirationComponent from "../Components/ExpirationComponent"
import PositionComponent from "../Components/PositionComponent"
import SpriteComponent from "../Components/SpriteComponent"
import assets from "../Globals/Assets"
import { soundManager } from "../Globals/Initialize"

const DivineProtectionEntity = (entity: Entity) => {
	const stats = entity.getComponent(StatsComponent)
	const position = entity.getComponent(PositionComponent)
	const tile = assets.effects.Aura
	const beam = new Entity('beam')
	const beamTile = assets.magic.beam
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
	spell.addComponent(new DamageComponent(stats.get(STATS.SPELL_DAMAGE, 5), [COLLISIONGROUPS.ENEMY], -1))
	spell.addComponent(new ExpirationComponent(120))
	soundManager.play(ALLSOUNDS.Magic,).play()
	return spell

}
export default DivineProtectionEntity