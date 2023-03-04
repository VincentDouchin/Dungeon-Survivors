import { Entity } from "../Globals/ECS";
import ResumeButtonEntity from "./ResumeButtonEntity";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import UIPositionComponent from "../Components/UIPositionComponent";
import VolumeBarEntity from "./VolumeBarEntity";
import assets from "../Globals/Assets";
import saveData from "../Globals/SaveManager";

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const pauseFrame = new Entity('pause frame')
	pauseFrame.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 50, 50), { scale: 3 }))
	pauseFrame.addComponent(new UIPositionComponent())

	const resume = ResumeButtonEntity()
	pauseFrame.addChildren(resume)
	const effectsVolume = VolumeBarEntity(() => saveData.effectsVolume, (nb: number) => saveData.effectsVolume = nb, 'Effects volume')
	const musicVolume = VolumeBarEntity(() => saveData.musicVolume, (nb: number) => saveData.musicVolume = nb, 'Music volume')
	resume.addChildren(musicVolume)
	musicVolume.addChildren(effectsVolume)
	SelectableComponent.setFromArray([resume, effectsVolume, musicVolume], true)
	uiPause.addChildren(pauseFrame)

	return uiPause
}
export default UIPauseEntity