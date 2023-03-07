import ButtonEntity from "./ButtonEntity";
import Engine from "../Globals/Engine";
import { Entity } from "../Globals/ECS";
import { GameStates } from "../Constants/GameStates";
import INPUTS from "../Constants/InputsNames";
import SelectableComponent from "../Components/SelectableComponent";
import SpriteComponent from "../Components/SpriteComponent";
import UIPositionComponent from "../Components/UIPositionComponent";
import VolumeBarEntity from "./VolumeBarEntity";
import assets from "../Globals/Assets";
import { inputManager } from "../Globals/Initialize";
import saveData from "../Globals/SaveManager";

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const pauseFrame = new Entity('pause frame')
	pauseFrame.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 50, 55), { scale: 3 }))
	const framePosition = pauseFrame.addComponent(new UIPositionComponent({ x: 0, y: -2 }, { x: 0, y: 0 }))
	framePosition.moveTo(0, 20)
	const resume = ButtonEntity(30, 8, 2, 'Resume', 1.5, () => {
		inputManager.eventBus.publish(INPUTS.PAUSE, true)
	})
	const remuseSub = inputManager.eventBus.subscribe(INPUTS.PAUSE, async state => {
		if (!state) return
		await framePosition.moveTo(-2, 10)
		inputManager.eventBus.publish(INPUTS.PAUSE, false)
		Engine.setState(GameStates.run)
	})
	uiPause.onDestroy(() => remuseSub())
	resume.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 2 }))
	pauseFrame.addChildren(resume)
	const effectsVolume = VolumeBarEntity(0.1, 0.2, () => saveData.effectsVolume, (nb: number) => saveData.effectsVolume = nb, 'Effects volume')
	const musicVolume = VolumeBarEntity(0.1, 0.2, () => saveData.musicVolume, (nb: number) => saveData.musicVolume = nb, 'Music volume')
	const zoom = VolumeBarEntity(700, 910, () => saveData.zoom, (nb: number) => saveData.zoom = nb, 'Zoom')
	resume.addChildren(musicVolume)
	musicVolume.addChildren(effectsVolume)
	effectsVolume.addChildren(zoom)
	SelectableComponent.setFromArray([resume, zoom, effectsVolume, musicVolume], true)
	uiPause.addChildren(pauseFrame)

	return uiPause
}
export default UIPauseEntity