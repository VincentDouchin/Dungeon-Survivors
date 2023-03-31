import AnimationComponent from '../Components/AnimationComponent'
import BodyComponent from '../Components/BodyComponent'
import COLLISIONGROUPS from '../Constants/CollisionGroups'
import DamageComponent from '../Components/DamageComponent'
import { Entity } from '../Globals/ECS'
import ExpirationComponent from '../Components/ExpirationComponent'
import PositionComponent from '../Components/PositionComponent'
import RotationComponent from '../Components/RotationComponent'
import { SOUNDS } from '../Constants/Sounds'
import ShooterComponent from '../Components/ShooterComponent'
import SpellComponent from '../Components/SpellComponent'
import SpriteComponent from '../Components/SpriteComponent'
import assets from '../Globals/Assets'
import { playerGroup } from '../Constants/Weapons'
import WeaponEntity from './WeaponEntity'
import ProjectileEntity from './ProjectileEntity'

const CannonSpellEntity = (entity: Entity) => {
	for (const child of entity.children) {
		if (child.getComponent(ShooterComponent)) {
			const shooter = child.removeComponent(ShooterComponent)
			const cannon = WeaponEntity({
				tile: assets.weapons.cannon,
				orbiter: true,
				targeter: true,
				targetGroup: playerGroup,
				angle: child?.getComponent(RotationComponent).rotation ?? 0,
				projectile: {
					spawn: ProjectileEntity({
						damage: 0,
						tile: assets.effects.CanonBall,
						speed: 400,
						targetGroup: playerGroup,
						range: 150,
						sound: SOUNDS.CANNON_BALL,
						afterHit: (projectile) => {
							const explosion = new Entity('Explosion')
							const tile = assets.effects.smoke
							explosion.addComponent(projectile.getComponent(PositionComponent).clone())
							explosion.addComponent(new SpriteComponent(tile, { scale: 2 }))
							const explosionAnimation = explosion.addComponent(new AnimationComponent({ default: tile }, { start: false, frameRate: 3 }))
							explosion.addComponent(new BodyComponent(
								{ moveForce: 0 },
								{
									group: COLLISIONGROUPS.WEAPON, canCollideWith: [COLLISIONGROUPS.ENEMY], width: tile.width * 2, height: tile.height * 2, contact: false, sensor: true,
								}))
							explosion.addComponent(new DamageComponent(entity.getComponent(SpellComponent).spellDamage.value, [COLLISIONGROUPS.ENEMY], -1, 10))
							explosionAnimation.playAnimation().then(() => {
								explosion.destroy()
							})
						},
					}),
					delay: 60,
				},
			}, entity, 0)
			cannon.addComponent(new ExpirationComponent(300))
			entity.addChildren(cannon)
			cannon.onDestroy(() => {
				child.addComponent(shooter)
			})
			break
		}
	}
}
export default CannonSpellEntity
