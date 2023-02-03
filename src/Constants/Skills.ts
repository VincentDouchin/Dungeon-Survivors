import StatsComponent from "../Components/SkillsComponent"
import { assets } from "../Globals/Initialize"

const SKILLS: Skill[] = [
	{
		icon: assets.skills.attack_speed_boost,
		name: 'Rotation speed',
		modifier: (skill: StatsComponent) => skill.angVel *= 1.2
	},
	{
		icon: assets.skills.attack_boost,
		name: 'Damage',
		modifier: (skill: StatsComponent) => skill.damage *= 1.1
	},
	{
		icon: assets.skills.critical_boost,
		name: 'Critical damage',
		modifier: (skill: StatsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: assets.skills.defense_boost,
		name: 'Defense',
		modifier: (skill: StatsComponent) => skill.defense *= 1.2
	},
	{
		icon: assets.skills.exp_boost,
		name: 'Experience up',
		modifier: (skill: StatsComponent) => skill.xp += 1.2
	},
	{
		icon: assets.skills.knockback_boost,
		name: 'Knockback',
		modifier: (skill: StatsComponent) => skill.knockback *= 1.2
	},

]
export default SKILLS