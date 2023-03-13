import DamageComponent from "../Components/DamageComponent";
import { Entity } from "../Globals/ECS";
import PositionComponent from "../Components/PositionComponent";
import ProjectileEntity from "./ProjectileEntity";
import ShooterComponent from "../Components/ShooterComponent";
import SpellComponent from "../Components/SpellComponent";

const ArrowVolleySpell = (entity: Entity) => {
	const arrows: Entity[] = []
	const bow = entity.children.find(child => child.getComponent(ShooterComponent))
	if (!bow) return
	const spellComponent = entity.getComponent(SpellComponent)
	const shooter = bow.getComponent(ShooterComponent)
	const parentPosition = entity.getComponent(PositionComponent)
	for (let i = 0; i <= Math.PI * 2; i += Math.PI / 8) {
		const arrow = ProjectileEntity(shooter, parentPosition, i)
		const arrowDamage = arrow.getComponent(DamageComponent)
		arrowDamage.amount = spellComponent.spellDamage
		arrowDamage.destroyOnHit = 5

		arrows.push(arrow)
		arrow.onDestroy(() => arrows.splice(arrows.indexOf(arrow), 1))
	}
}
export default ArrowVolleySpell