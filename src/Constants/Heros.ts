import SPELLS, { Spell } from "./Spells"
import WEAPONS, { WeaponDefinition } from "./Weapons"

import { STATS } from "../Components/StatsComponent"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"
import saveData from "../Globals/SaveManager"

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
	'fairy' = 'fairy'
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
		}
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
			[STATS.SPELL_DAMAGE]: 0.1
		}
	},
	{
		name: HeroName.elf,
		tiles: {
			idle: assets.characters.elfFemaleWalk,
			run: assets.characters.elfFemaleRun,
		},
		spell: SPELLS.ARROW_VOLLEY,
		needUnlock: true,
		weapon: [WEAPONS.bow],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.CRIT_CHANCE]: 0.2,
			[STATS.CRIT_DAMAGE]: 0.2,
		}
	},
	{
		name: HeroName.ninja,
		tiles: {
			idle: assets.characters.ninjaWalk,
			run: assets.characters.ninjaRun
		},
		spell: SPELLS.ARROW_VOLLEY,
		needUnlock: true,
		weapon: [WEAPONS.sai, WEAPONS.sai2],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.CRIT_DAMAGE]: 0.05,
			[STATS.ATTACK_SPEED]: 0.10
		}
	},
	{
		name: HeroName.pirate,
		tiles: {
			idle: assets.characters.pirateCaptainWalk,
			run: assets.characters.pirateCaptainRun
		},
		spell: SPELLS.ARROW_VOLLEY,
		needUnlock: true,
		weapon: [WEAPONS.sai],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.CRIT_DAMAGE]: 0.05,
			[STATS.ATTACK_SPEED]: 0.10
		}
	},
	{
		name: HeroName.fairy,
		tiles: {
			idle: assets.characters.fairyWalk,
			run: assets.characters.fairyWalk
		},
		spell: SPELLS.ARROW_VOLLEY,
		needUnlock: true,
		weapon: [WEAPONS.sai],
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.CRIT_DAMAGE]: 0.05,
			[STATS.ATTACK_SPEED]: 0.10
		}
	},

]
export default HEROS