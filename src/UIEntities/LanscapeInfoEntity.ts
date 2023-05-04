import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import { Entity } from '../Globals/ECS'

const LandscapeInfoEntity = () => {
	const info = new Entity('info')
	info.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 80, 20)))
	info.addComponent(new TextComponent('Please rotate your phone to landscape mode for the best experience.', { maxWidth: 80, size: 10 }))
	info.addComponent(new UIPositionComponent({ x: 0, y: 0 }, { x: 0, y: 0 }))
	return info
}
export default LandscapeInfoEntity
