import BodyComponent from '../Components/BodyComponent'
import DamageComponent from '../Components/DamageComponent'
import ExpirationComponent from '../Components/ExpirationComponent'
import PositionComponent from '../Components/PositionComponent'
import SpriteComponent from '../Components/SpriteComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import assets from '../Globals/Assets'
import { Entity } from '../Globals/ECS'

const BearTrapEntity = (parent: Entity) => {
	const { x, y } = parent.getComponent(PositionComponent)
	const bearTrap = new Entity('bear trap')
	bearTrap.addComponent(new SpriteComponent(assets.background['bearTrap-open'], { renderOrder: 0 }))
	bearTrap.addComponent(new BodyComponent(
		{ type: 'fixed' },
		{ width: 16, height: 16, group: COLLISIONGROUPS.ENEMY, canCollideWith: [COLLISIONGROUPS.PLAYER], contact: false },
	))
	bearTrap.addComponent(new DamageComponent(30, [COLLISIONGROUPS.PLAYER], 1, 0))
	bearTrap.addComponent(new PositionComponent(x, y))
	bearTrap.addComponent(new ExpirationComponent(1800))
	bearTrap.onDestroy(() => {
		const bearTrapClosed = new Entity('bear trap closed')
		bearTrapClosed.addComponent(new PositionComponent(x, y))
		bearTrapClosed.addComponent(new SpriteComponent(assets.background['bearTrap-closed'], { renderOrder: 0 }))
		bearTrapClosed.addComponent(new ExpirationComponent(600))
	})
	return bearTrap
}
export default BearTrapEntity
