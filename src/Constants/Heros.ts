import SPELLS, { Spell } from "./Spells"
import WEAPONS, { WeaponDefinition } from "./Weapons"

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
		needUnlock: false
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
		spell: SPELLS.LIGHTNING,
		needUnlock: true,
		weapon: WEAPONS.bow
	},

]
export default HEROS