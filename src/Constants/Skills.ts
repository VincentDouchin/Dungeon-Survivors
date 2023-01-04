import AssetManager from "../Globals/AssetManager"

const SKILLS: Skill[] = [
	{
		icon: AssetManager.icons.turnSpeed,
		name: 'Rotation speed',
		modifier: (skill) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.damage,
		name: 'Damage',
		modifier: (skill) => skill.damage += 1
	},
	{
		icon: AssetManager.icons.critdamage,
		name: 'Critical damage',
		modifier: (skill) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.poison,
		name: 'Poison',
		modifier: (skill) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.curse,
		name: 'Curse',
		modifier: (skill) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.bleed,
		name: 'Bleed',
		modifier: (skill) => skill.angVel += 1
	},
	{
		icon: AssetManager.icons.slow,
		name: 'Slow',
		modifier: (skill) => skill.angVel += 1
	},
]
export default SKILLS