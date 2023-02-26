import StatsComponent from "../Components/StatsComponent"
import assets from "../Globals/Assets"

const SKILLS: Skill[] = [
	{
		icon: assets.skills.attack_speed_boost,
		name: 'Attack speed',
		modifier: (skill: StatsComponent) => skill.attackSpeed.percent += 0.2
	},
	{
		icon: assets.skills.attack_boost,
		name: 'Damage',
		modifier: (skill: StatsComponent) => skill.damage.percent += 0.1
	},
	{
		icon: assets.skills.critical_boost,
		name: 'Critical damage',
		modifier: (skill: StatsComponent) => skill.critDamage.percent += 0.3
	},
	{
		icon: assets.skills.defense_boost,
		name: 'Defense',
		modifier: (skill: StatsComponent) => skill.defense.percent += 0.10
	},
	{
		icon: assets.skills.exp_boost,
		name: 'Experience up',
		modifier: (skill: StatsComponent) => skill.xpModifier.percent += 0.05
	},
	{
		icon: assets.skills.knockback_boost,
		name: 'Knockback',
		modifier: (skill: StatsComponent) => skill.knockback.percent += 0.2
	},
	{
		icon: assets.skills.swiftness,
		name: 'Movement speed',
		modifier: (skill: StatsComponent) => skill.speed.percent += 0.10
	},
	{
		icon: assets.skills.mana_replenish,
		name: 'Mana up',
		modifier: (skill: StatsComponent) => skill.manaMax.percent += 0.10
	},
	{
		icon: assets.skills.magic_amplification,
		name: 'Spell damage',
		modifier: (skill: StatsComponent) => skill.spellDamage.percent += 0.15
	},

]
export default SKILLS