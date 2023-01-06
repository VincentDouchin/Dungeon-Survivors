import SkillsComponent from "../Components/SkillsComponent"
import AssetManager from "../Globals/AssetManager"

const SKILLS: Skill[] = [
	{
		icon: AssetManager.icons.turnSpeed,
		name: 'Rotation speed',
		modifier: (skill: SkillsComponent) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.damage,
		name: 'Damage',
		modifier: (skill: SkillsComponent) => skill.damage += 1
	},
	{
		icon: AssetManager.icons.critdamage,
		name: 'Critical damage',
		modifier: (skill: SkillsComponent) => skill.critDamage *= 1.5
	},
	{
		icon: AssetManager.icons.poison,
		name: 'Poison',
		modifier: (skill: SkillsComponent) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.curse,
		name: 'Curse',
		modifier: (skill: SkillsComponent) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.bleed,
		name: 'Bleed',
		modifier: (skill: SkillsComponent) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.slow,
		name: 'Slow',
		modifier: (skill: SkillsComponent) => skill.angVel += 1
	},
]
export default SKILLS