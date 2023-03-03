import { Entity } from "../Globals/ECS";
import ResumeButtonEntity from "./ResumeButtonEntity";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import UIPositionComponent from "../Components/UIPositionComponent";
import VolumeBarEntity from "./VolumeBarEntity";
import assets from "../Globals/Assets";

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const pauseFrame = new Entity('pause frame')
	pauseFrame.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 50, 30), { scale: 3 }))
	pauseFrame.addComponent(new UIPositionComponent())

	const resume = ResumeButtonEntity()
	pauseFrame.addChildren(resume)
	const volume = VolumeBarEntity()
	resume.addChildren(volume)
	SelectableComponent.setFromArray([resume, volume], true)
	uiPause.addChildren(pauseFrame)

	return uiPause
}
export default UIPauseEntity