import { assets, inputManager } from "../Globals/Initialize"

import Engine from "../Globals/Engine"
import { Entity } from "../Globals/ECS"
import { GameStates } from "../Constants/GameStates"
import SpriteComponent from "../Components/SpriteComponent"
import TextComponent from "../Components/TextComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import framedTile from "../Utils/FramedTile"

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const resume = new Entity('resume button')
	const resumeSprite = resume.addComponent(new SpriteComponent(framedTile(assets.UI.button, 5, 30, 8), { scale: 4 }))
	resume.addComponent(new UIPositionComponent())
	resume.addComponent(new TextComponent('Resume', { size: 48 }))
	inputManager.eventBus.subscribe('down', ({ uiObjects }) => {
		if (uiObjects.includes(resumeSprite.mesh.id)) {
			Engine.setState(GameStates.run)
		}
	})
	uiPause.addChildren(resume)

	return uiPause
}
export default UIPauseEntity