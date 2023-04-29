import type { Entity } from '../Globals/ECS'
import NoteProjectileEntity from '../Entities/NoteProjectileEntity'
import ProjectileEntity from '../Entities/ProjectileEntity'
import type Tile from '../Utils/Tile'
import assets from '../Globals/Assets'
import FreezeEffect from '../Game/Effects/FreezeEffect'
import BearTrapEntity from '../Entities/BearTrapEntity'
import State from '../Globals/State'
import ConfusionEffect from '../Game/Effects/ConfusionEffect'
import { SOUNDS } from './Sounds'
import type { SOUND } from './Sounds'
import COLLISIONGROUPS from './CollisionGroups'
import DIFFICULTY from './DIfficulty'

export interface WeaponDefinition {
	tile?: Tile
	damage?: number
	targetGroup: TargetGroup
	targeter?: boolean
	projectile?: ProjectileDefinition
	orbiter?: boolean
	mirror?: boolean
	angle?: number
	sound?: SOUND
}
export interface TargetGroup {
	target: number[]
	group: number
}
export const enemyGroup: TargetGroup = {
	target: [COLLISIONGROUPS.PLAYER],
	group: COLLISIONGROUPS.ENEMY,
}
export const playerGroup: TargetGroup = {
	group: COLLISIONGROUPS.PLAYER,
	target: [COLLISIONGROUPS.ENEMY, COLLISIONGROUPS.LOOT],
}
export interface ProjectileDefinition {
	spawn: (parent: Entity) => Entity
	delay: number
	cooldownAmount?: number
	cooldownTrigger?: number
}
const difficultyModifier = {
	[DIFFICULTY.EASY]: 1,
	[DIFFICULTY.NORMAL]: 0.9,
	[DIFFICULTY.HARD]: 0.8,
}[State.difficulty ?? DIFFICULTY.EASY]
const WEAPONS: Record<string, WeaponDefinition> = {
	// ! PLAYER
	swordKnight: {
		orbiter: true,
		tile: assets.weapons.sword,
		damage: 10,
		targetGroup: playerGroup,
		sound: SOUNDS.SWORD,
	},
	sai: {
		orbiter: true,
		tile: assets.weapons.sai,
		damage: 10,
		targetGroup: playerGroup,
	},
	get sai2() {
		return { ...WEAPONS.sai, angle: Math.PI }
	},
	staff: {
		orbiter: true,
		tile: assets.weapons.staff,
		targetGroup: playerGroup,
		sound: SOUNDS.Fireball,
		projectile: {
			spawn: ProjectileEntity({
				damage: 10,
				nb: 3,
				spread: 0.9,
				speed: 300,
				targetGroup: playerGroup,
				tile: assets.effects.fireProjectile,
				range: 40,
			}),
			delay: 30,
		},
	},
	bow: {
		orbiter: true,
		targetGroup: playerGroup,
		tile: assets.weapons.bow,
		sound: SOUNDS.BOW,
		projectile: {
			spawn: ProjectileEntity({
				damage: 15,
				speed: 500,
				targetGroup: playerGroup,
				tile: assets.weapons.arrow,
				range: 40,
				sound: SOUNDS.ARROW_HIT,
				piercing: 2,
			}),
			delay: 20,
		},
	},
	flintlock: {
		tile: assets.weapons.flintlock,
		orbiter: true,
		targetGroup: playerGroup,
		sound: SOUNDS.GUN,
		mirror: true,
		projectile: {
			spawn: ProjectileEntity({
				damage: 10,
				speed: 100,
				targetGroup: playerGroup,
				tile: assets.weapons.bullet,
				range: 30,
				piercing: 4,
			}),
			delay: 15,
			cooldownAmount: 40,
			cooldownTrigger: 6,
		},
	},
	harp: {
		tile: assets.weapons.harp,
		targetGroup: playerGroup,
		orbiter: true,
		projectile: {
			spawn: NoteProjectileEntity,
			delay: 30,
		},
	},
	// ! ENEMY
	enemyBow: {
		tile: assets.weapons.bow,
		targeter: true,
		orbiter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 2,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.weapons.arrow,
				range: 200,
			}),
			delay: 240 * difficultyModifier,
		},
	},
	fireball: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		sound: SOUNDS.Fireball,
		projectile: {
			spawn: ProjectileEntity({
				damage: 5,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.effects.fireProjectile,
				range: 200,
			}),
			delay: 240 * difficultyModifier,
		},
	},
	demonFireball: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		sound: SOUNDS.Fireball,
		projectile: {
			spawn: ProjectileEntity({
				damage: 5,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.effects.fireProjectile,
				range: 200,
				spread: Math.PI * 2,
				nb: 12,
			}),
			delay: 240 * difficultyModifier,

		},
	},
	bone: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 2,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.weapons.bone,
				range: 200,
				rotationSpeed: 0.2,
			}),
			delay: 240 * difficultyModifier,
		},
	},
	bearTrap: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: BearTrapEntity,
			delay: 1800 * difficultyModifier,
		},
	},
	hammer: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 3,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.weapons.hammer,
				range: 150,
				rotationSpeed: 0.1,
			}),
			delay: 240 * difficultyModifier,
		},
	},
	iceSpike: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 4,
				speed: 70,
				targetGroup: enemyGroup,
				tile: assets.effects['IceSpike-sheet'],
				range: 40,
				scale: 0.5,
				onHit: FreezeEffect,
			}),
			delay: 240 * difficultyModifier,
		},
	},
	cross: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 3,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.weapons.cross,
				range: 150,
				scale: 0.8,
				rotationSpeed: 0.1,
			}),

			delay: 240 * difficultyModifier,
		},
	},
	darkProjectile: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 3,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.effects.darkProjectile,
				range: 150,
				onHit: ConfusionEffect,
			}),
			delay: 240 * difficultyModifier,
		},
	},
	energy: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 3,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.effects.EnergyBall,
				range: 100,
			}),
			delay: 240 * difficultyModifier,
		},
	},

}
export default WEAPONS
