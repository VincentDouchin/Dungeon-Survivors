import { Entity } from "../Globals/ECS"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import Tile from "../Utils/Tile"
import UIPositionComponent from "../Components/UIPositionComponent"

const UIWinEntity = () => {
	const ui = new Entity('game over ui')
	const win = new Entity('lost')
	win.addComponent(new UIPositionComponent())
	win.addComponent(new SpriteComponent(Tile.empty(200, 100)))
	win.addComponent(new TextComponent('You won!', { size: 128, outlineWidth: 3 }))
	ui.addChildren(win)

	return ui
}
export default UIWinEntity