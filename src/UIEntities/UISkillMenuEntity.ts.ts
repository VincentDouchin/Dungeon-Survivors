import { Entity } from '../Globals/ECS'
import SkillMenuEntity from './SkillMenuEntity'

const SkillMenuUIEntity = () => {
	const ui = new Entity('skillmenu ui')

	ui.addChildren(SkillMenuEntity())
	return ui
}
export default SkillMenuUIEntity
