import Coroutine from "../Globals/Coroutine";
import { Entity } from "../Globals/ECS";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import TextComponent from "../Components/TextComponent";
import Tile from "../Utils/Tile";
import UIPositionComponent from "../Components/UIPositionComponent";
import buttonTiles from "../Utils/ButtonTiles";
import waitFor from "../Utils/WaitFor";

const ButtonEntity = (width: number, height: number, scale: number, child: Tile | string, childScale: number, validate: () => void, selected: boolean = false) => {
	const button = new Entity('button')
	const [normal, pressed, disabled] = buttonTiles(width, height)
	const defaultTile = selected ? normal : disabled
	const sprite = button.addComponent(new SpriteComponent(defaultTile, { scale }))
	const childEntity = new Entity('child')
	childEntity.addComponent(new SpriteComponent(child instanceof Tile ? child : Tile.empty(16 * childScale, 16 * childScale)))
	if (typeof child === 'string') {
		childEntity.addComponent(new TextComponent(child, { size: 16 * childScale }))
	}
	const childPosition = childEntity.addComponent(new UIPositionComponent({ x: 0, y: 1 / 8 }, { x: 0, y: 0 }))

	button.addChildren(childEntity)


	button.addComponent(new SelectableComponent(normal, disabled, () => {
		new Coroutine(function* () {
			const selectable = button.removeComponent(SelectableComponent)
			childPosition.relativePosition.y = 0
			sprite.changeTexture(pressed.texture)
			yield* waitFor(10)
			childPosition.relativePosition.y = 1 / 8
			sprite.changeTexture(normal.texture)
			button.addComponent(selectable)
			validate()
		})
	}))

	return button
}

export default ButtonEntity