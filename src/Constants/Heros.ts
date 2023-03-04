import SPELLS, { Spell } from "./Spells"
import WEAPONS, { WeaponDefinition } from "./Weapons"

import { STATS } from "../Components/StatsComponent"
import Tile from "../Utils/Tile"
import assets from "../Globals/Assets"
import saveData from "../Globals/SaveManager"

export interface HeroDefinition {
	name: HeroName
	tiles: Record<string, Tile>[]
	spell: Spell
	needUnlock: boolean
	unlocked?: boolean
	weapon: WeaponDefinition
	stats: Partial<Record<STATS, number>>
}
export enum HeroName {
	'elf' = 'elf',
	'wizzard' = 'wizzard',
	'knight' = 'knight'
}
export const isUnlocked = (hero: HeroDefinition) => {
	return !hero.needUnlock || saveData.heros.includes(hero.name)
}
const HEROS: HeroDefinition[] = [
	{
		name: HeroName.knight,
		tiles: [{
			idle: assets.tiles.knight_m_idle_anim,
			run: assets.tiles.knight_m_run_anim,
		}, {
			idle: assets.tiles.knight_f_idle_anim,
			run: assets.tiles.knight_f_run_anim,
		}],
		spell: SPELLS.DIVINE_PROTECTION,
		weapon: WEAPONS.swordKnight,
		needUnlock: false,
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.1,
			[STATS.KNOCKBACK]: 0.1,
		}
	},
	{
		name: HeroName.wizzard,
		tiles: [{
			idle: assets.tiles.wizzard_m_idle_anim,
			run: assets.tiles.wizzard_m_run_anim,
		}, {
			idle: assets.tiles.wizzard_f_idle_anim,
			run: assets.tiles.wizzard_f_run_anim,
		}],
		spell: SPELLS.LIGHTNING,
		needUnlock: false,
		weapon: WEAPONS.staff,
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.DAMAGE]: 0.05,
			[STATS.SPELL_DAMAGE]: 0.1
		}
	},
	{
		name: HeroName.elf,
		tiles: [{
			idle: assets.tiles.elf_f_idle_anim,
			run: assets.tiles.elf_f_idle_anim,
		}, {
			idle: assets.tiles.elf_m_idle_anim,
			run: assets.tiles.elf_m_run_anim,
		}],
		spell: SPELLS.ARROW_VOLLEY,
		needUnlock: true,
		weapon: WEAPONS.bow,
		stats: {
			[STATS.MAX_HEALTH]: 0.05,
			[STATS.CRIT_CHANCE]: 0.3,
			[STATS.CRIT_DAMAGE]: 0.3,
		}
	},

]
export default HEROS