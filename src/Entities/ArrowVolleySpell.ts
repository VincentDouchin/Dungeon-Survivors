import { Entity } from '../Globals/ECS'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import { SOUNDS } from '../Constants/Sounds'
import SpellComponent from '../Components/SpellComponent'
import assets from '../Globals/Assets'
import { playerGroup } from '../Constants/Weapons'
import { soundManager } from '../Globals/Initialize'
import ProjectileEntity from './ProjectileEntity'

const ArrowVolleySpell = (entity: Entity) => {
	const spellComponent = entity.getComponent(SpellComponent)
	const origin = new Entity('arrow volley')
	origin.addComponent(entity.getComponent(PositionComponent).clone())
	origin.addComponent(new RotationComponent({}))
	soundManager.play('effect', SOUNDS.ARROW_VOLLEY)
	ProjectileEntity({
		tile: assets.weapons.arrow,
		damage: spellComponent.spellDamage.value,
		speed: 300,
		targetGroup: playerGroup,
		range: 400,
		nb: 16,
		spread: Math.PI * 2,
		piercing: 4,
	})(origin)
}
export default ArrowVolleySpell
