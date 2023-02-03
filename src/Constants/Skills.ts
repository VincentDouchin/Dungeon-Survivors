import StatsComponent from "../Components/StatsComponent"
import { assets } from "../Globals/Initialize"

const SKILLS: Skill[] = [
	{
		icon: assets.skills.attack_speed_boost,
		name: 'Rotation speed',
		modifier: (skill: StatsComponent) => skill.angVel.addPercent(0.2)
	},
	{
		icon: assets.skills.attack_boost,
		name: 'Damage',
		modifier: (skill: StatsComponent) => skill.damage.addPercent(0.1)
	},
	{
		icon: assets.skills.critical_boost,
		name: 'Critical damage',
		modifier: (skill: StatsComponent) => skill.critDamage.addPercent(0.5)
	},
	{
		icon: assets.skills.defense_boost,
		name: 'Defense',
		modifier: (skill: StatsComponent) => skill.defense.addPercent(0.2)
	},
	{
		icon: assets.skills.exp_boost,
		name: 'Experience up',
		modifier: (skill: StatsComponent) => skill.xpModifier.addFlat(10)
	},
	{
		icon: assets.skills.knockback_boost,
		name: 'Knockback',
		modifier: (skill: StatsComponent) => skill.knockback.addPercent(0.2)
	},

]
export default SKILLS