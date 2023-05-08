import { STATS } from '../Constants/Stats'
import type Tile from '../Utils/Tile'
import assets from '../Globals/Assets'
import saveData from '../Globals/SaveManager'
import type { Spell } from './Spells'
import SPELLS from './Spells'
import type { WeaponDefinition } from './Weapons'
import WEAPONS from './Weapons'

export interface HeroDefinition {
	name: HeroName
	tiles: Record<string, Tile>
	spell: Spell
	needUnlock: boolean
	unlocked?: boolean
	weapon: WeaponDefinition[]
	stats: Partial<Record<STATS, number>>
}
export enum HeroName {
	'elf' = 'elf',
	'wizzard' = 'wizzard',
	'knight' = 'knight',
	'ninja' = 'ninja',
	'pirate' = 'pirate',
	'fairy' = 'fairy',
}
export const isUnlocked = (hero: HeroDefinition) => {
	return !hero.needUnlock || saveData.heros.includes(hero.name)
}
const HEROS: HeroDefinition[] = [
	{
		name: HeroName.knight,
		tiles: {
			idle: assets.characters.knightMaleWalk,
			run: assets.characters.knightMaleRun,
		},
		spell: SPELLS.DIVINE_PROTECTION,
		weapon: [WEAPONS.swordKnight],
		needUnlock: false,
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.1,
			[STATS.DEFENSE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.05,
		},
	},
	{
		name: HeroName.wizzard,
		tiles: {
			idle: assets.characters.wizzardFemaleWalk,
			run: assets.characters.wizzardFemaleRun,
		},
		spell: SPELLS.LIGHTNING,
		needUnlock: false,
		weapon: [WEAPONS.staff],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.15,
		},
	},
	{
		name: HeroName.elf,
		tiles: {
			idle: assets.characters.elfFemaleWalk,
			run: assets.characters.elfFemaleRun,
		},
		spell: SPELLS.ARROW_VOLLEY,
		needUnlock: false,
		weapon: [WEAPONS.bow],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.05,
			[STATS.CRIT_CHANCE]: 0.2,
			[STATS.CRIT_DAMAGE]: 0.1,
		},
	},
	{
		name: HeroName.ninja,
		tiles: {
			idle: assets.characters.ninjaWalk,
			run: assets.characters['ninja-run'],
		},
		spell: SPELLS.SHURIKEN,
		needUnlock: false,
		weapon: [WEAPONS.sai, WEAPONS.sai2],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.05,
			[STATS.CRIT_DAMAGE]: 0.05,
			[STATS.CRIT_CHANCE]: 0.10,
			[STATS.ATTACK_SPEED]: 0.05,
		},
	},
	{
		name: HeroName.pirate,
		tiles: {
			idle: assets.characters.pirateCaptainWalk,
			run: assets.characters.pirateCaptainRun,
		},
		spell: SPELLS.CANNON,
		needUnlock: false,
		weapon: [WEAPONS.flintlock],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.05,
			[STATS.KNOCKBACK]: 0.05,
			[STATS.DEFENSE]: 0.05,
			[STATS.ATTACK_SPEED]: 0.05,
		},
	},
	{
		name: HeroName.fairy,
		tiles: {
			idle: assets.characters.fairyWalk,
			run: assets.characters.fairyWalk,
		},
		spell: SPELLS.CHARM,
		needUnlock: false,
		weapon: [WEAPONS.harp],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.05,
			[STATS.CRIT_DAMAGE]: 0.05,
			[STATS.ATTACK_SPEED]: 0.05,
			[STATS.CRIT_DAMAGE]: 0.05,
			[STATS.CRIT_CHANCE]: 0.10,
		},
	},

]
export default HEROS
