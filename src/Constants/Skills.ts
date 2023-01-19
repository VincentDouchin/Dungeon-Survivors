import SkillsComponent from "../Components/SkillsComponent"
import { assets } from "../Globals/Initialize"

const SKILLS: Skill[] = [
	{
		icon: assets.skills.attack_speed_boost,
		name: 'Rotation speed',
		modifier: (skill: SkillsComponent) => skill.angVel *= 1.2
	},
	{
		icon: assets.skills.attack_boost,
		name: 'Damage',
		modifier: (skill: SkillsComponent) => skill.damage *= 1.2
	},
	{
		icon: assets.skills.critical_boost,
		name: 'Critical damage',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: assets.skills.defense_boost,
		name: 'Defense',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: assets.skills.exp_boost,
		name: 'Experience up',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: assets.skills.knockback_boost,
		name: 'Knockback',
		modifier: (skill: SkillsComponent) => skill.knockback *= 1.2
	},

]
export default SKILLS