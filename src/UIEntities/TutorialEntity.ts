import { Entity } from "../Globals/ECS";
import SpriteComponent from "../Components/SpriteComponent";
import TextComponent from "../Components/TextComponent";
import Tile from "../Utils/Tile";
import UIPositionComponent from "../Components/UIPositionComponent";

const TutorialEntity = () => {
	const tutorial = new Entity('tutorial')
	tutorial.addComponent(new SpriteComponent(Tile.empty()))
	tutorial.addComponent(new TextComponent('WASD - Movement     Shift - Switch charcaters     P - Spell     Escape - Pause'))
	tutorial.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: -1 }))
	return tutorial
}
export default TutorialEntity