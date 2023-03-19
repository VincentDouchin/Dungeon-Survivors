import { SOUND, SOUNDS } from "./Sounds"

import COLLISIONGROUPS from "./CollisionGroups"
import { Entity } from "../Globals/ECS"
import NoteProjectileEntity from "../Entities/NoteProjectileEntity"
import ProjectileEntity from "../Entities/ProjectileEntity"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"

export interface WeaponDefinition {
	tile?: Tile
	damage?: number
	targetGroup: TargetGroup
	targeter?: boolean
	projectile?: ProjectileDefinition,
	orbiter?: boolean
	angle?: number
	sound?: SOUND
}
export interface TargetGroup {
	target: number[]
	group: number
}
export const enemyGroup: TargetGroup = {
	target: [COLLISIONGROUPS.PLAYER],
	group: COLLISIONGROUPS.ENEMY
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

const WEAPONS: Record<string, WeaponDefinition> = {
	// ! PLAYER
	swordKnight: {
		orbiter: true,
		tile: assets.weapons.sword,
		damage: 10,
		targetGroup: playerGroup,
		sound: SOUNDS.SWORD
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
		projectile: {
			spawn: ProjectileEntity({
				damage: 10,
				nb: 3,
				spread: 0.5,
				speed: 300,
				targetGroup: playerGroup,
				tile: assets.effects.fireProjectile,
				range: 200
			}),
			delay: 60,
		},
		sound: SOUNDS.Fireball
	},
	bow: {
		orbiter: true,
		targetGroup: playerGroup,
		tile: assets.weapons.bow,
		targeter: true,
		projectile: {
			spawn: ProjectileEntity({
				damage: 15,
				speed: 500,
				targetGroup: playerGroup,
				tile: assets.weapons.arrow,
				range: 200
			}),
			delay: 40
		},
	},
	flintlock: {
		tile: assets.weapons.flintlock,
		orbiter: true,
		targeter: true,
		targetGroup: playerGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 15,
				speed: 100,
				targetGroup: playerGroup,
				tile: assets.weapons.bullet,
				range: 400,
				piercing: 2
			}),
			delay: 30,
			cooldownAmount: 120,
			cooldownTrigger: 6,
		},
	},
	harp: {
		tile: assets.weapons.harp,
		targetGroup: playerGroup,
		orbiter: true,
		projectile: {
			spawn: NoteProjectileEntity,
			delay: 30
		}
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
				range: 200
			}),
			delay: 240
		},
	},
	fireball: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 5,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.effects.fireProjectile,
				range: 200
			}),
			delay: 240,
		},
	},
	bone: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 2,
				speed: 200,
				targetGroup: enemyGroup,
				tile: assets.weapons.bone,
				range: 200,
				rotationSpeed: 0.2,
			}),
			delay: 240,
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
				range: 150, rotationSpeed: 0.1,
			}),
			delay: 240,
		},
	},
	iceSpike: {
		orbiter: true,
		targeter: true,
		targetGroup: enemyGroup,
		projectile: {
			spawn: ProjectileEntity({
				damage: 4,
				speed: 100,
				targetGroup: enemyGroup,
				tile: assets.effects["IceSpike-sheet"],
				range: 150, scale: 0.5

			}),
			delay: 240,
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
				rotationSpeed: 0.1
			}),

			delay: 240,
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
			}),
			delay: 240,
		},
	},

}
export default WEAPONS
