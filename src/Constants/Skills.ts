import { STATS } from '../Constants/Stats'
import type Tile from '../Utils/Tile'
import assets from '../Globals/Assets'

export interface Skill {
	icon: Tile
	name: string
	statName: STATS
	amount: number
	show: boolean

}

const SKILLS: Skill[] = [
	{
		icon: assets.icons.attack_speed_boost,
		name: 'Attack speed',
		statName: STATS.ATTACK_SPEED,
		amount: 0.1,
		show: true,
	},
	{
		icon: assets.icons.attack_boost,
		name: 'Damage',
		statName: STATS.DAMAGE,
		amount: 0.1,
		show: true,
	},
	{
		icon: assets.icons.critical_boost,
		name: 'Critical damage',
		statName: STATS.CRIT_DAMAGE,
		amount: 0.3,
		show: true,
	},
	{
		icon: assets.icons.defense_boost,
		name: 'Defense',
		statName: STATS.DEFENSE,
		amount: 0.1,
		show: true,
	},
	{
		icon: assets.icons.exp_boost,
		name: 'Experience up',
		statName: STATS.XP_MDOIFIER,
		amount: 0.05,
		show: true,
	},
	{
		icon: assets.icons.knockback_boost,
		name: 'Knockback',
		statName: STATS.KNOCKBACK,
		amount: 0.2,
		show: true,
	},
	{
		icon: assets.icons.swiftness,
		name: 'Movement speed',
		statName: STATS.SPEED,
		amount: 0.1,
		show: true,
	},
	{
		icon: assets.icons.mana_replenish,
		name: 'Mana up',
		statName: STATS.MAX_MANA,
		amount: 0.1,
		show: true,
	},
	{
		icon: assets.icons.magic_amplification,
		name: 'Spell damage',
		statName: STATS.SPELL_DAMAGE,
		amount: 0.15,
		show: true,
	},
	{
		icon: assets.icons.lucky_boost,
		name: 'Critical chance',
		statName: STATS.CRIT_CHANCE,
		amount: 0.2,
		show: true,
	},
	{
		icon: assets.icons.health_up,
		name: 'Health up',
		statName: STATS.MAX_HEALTH,
		amount: 0.1,
		show: true,
	},
	{
		icon: assets.icons.bleeding,
		name: 'Bleed',
		statName: STATS.REGEN,
		amount: 0,
		show: false,
	},

]
export default SKILLS
