import SkillsComponent from "../Components/SkillsComponent"
import AssetManager from "../Globals/AssetManager"

const SKILLS: Skill[] = [
	{
		icon: AssetManager.skills.attack_speed_boost,
		name: 'Rotation speed',
		modifier: (skill: SkillsComponent) => skill.angVel *= 1.2
	},
	{
		icon: AssetManager.skills.attack_boost,
		name: 'Damage',
		modifier: (skill: SkillsComponent) => skill.damage *= 1.2
	},
	{
		icon: AssetManager.skills.critical_boost,
		name: 'Critical damage',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: AssetManager.skills.defense_boost,
		name: 'Defense',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: AssetManager.skills.exp_boost,
		name: 'Experience up',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: AssetManager.skills.knockback_boost,
		name: 'Knockback',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},

]
export default SKILLS