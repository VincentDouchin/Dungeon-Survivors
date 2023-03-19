import { Entity } from "../Globals/ECS";
import PositionComponent from "../Components/PositionComponent";
import ProjectileEntity from "./ProjectileEntity";
import RotationComponent from "../Components/RotationComponent";
import SpellComponent from "../Components/SpellComponent";
import assets from "../Globals/Assets";
import { playerGroup } from "../Constants/Weapons";

const ArrowVolleySpell = (entity: Entity) => {
	const spellComponent = entity.getComponent(SpellComponent)
	const origin = new Entity('arrow volley')
	origin.addComponent(entity.getComponent(PositionComponent).clone())
	origin.addComponent(new RotationComponent({}))
	ProjectileEntity({
		tile: assets.weapons.arrow,
		damage: spellComponent.spellDamage.value,
		speed: 300,
		targetGroup: playerGroup,
		range: 400,
		nb: 16,
		spread: Math.PI * 2,
		piercing: 4
	})(origin)
}
export default ArrowVolleySpell