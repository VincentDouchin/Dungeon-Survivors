import { ECS, Entity } from '../Globals/ECS'

import CameraSystem from '../Systems/CameraSystem'
import INPUTS from '../Constants/InputsNames'
import RunState from '../GameStates/RunState'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import { engine } from '../Globals/Initialize'
import saveData from '../Globals/SaveManager'
import VolumeBarEntity from './VolumeBarEntity'
import ButtonEntity from './ButtonEntity'

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const pauseFrame = new Entity('pause frame')
	pauseFrame.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 50, 55), { scale: 3 }))
	const framePosition = pauseFrame.addComponent(new UIPositionComponent({ x: 0, y: -2 }, { x: 0, y: 0 }))
	framePosition.moveTo(0, 20)
	const resume = ButtonEntity(30, 8, 2, 'Resume', 1.5, () => {
		ECS.eventBus.publish(INPUTS.PAUSE, 1)
	})
	const remuseSub = ECS.eventBus.subscribe(INPUTS.PAUSE, async (state) => {
		if (!state) return
		await framePosition.moveTo(-2, 10)
		ECS.eventBus.publish(INPUTS.PAUSE, 0)
		engine.setState(RunState)
	})
	uiPause.onDestroy(() => remuseSub())
	resume.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 2 }))
	pauseFrame.addChildren(resume)
	const effectsVolume = VolumeBarEntity(0.1, 0.2, () => saveData.effectsVolume, (nb: number) => saveData.effectsVolume = nb, 'Effects volume')
	const musicVolume = VolumeBarEntity(0.1, 0.2, () => saveData.musicVolume, (nb: number) => saveData.musicVolume = nb, 'Music volume')
	const zoom = VolumeBarEntity(CameraSystem.min, CameraSystem.max, () => saveData.zoom, (nb: number) => saveData.zoom = nb, 'Zoom')
	resume.addChildren(musicVolume)
	musicVolume.addChildren(effectsVolume)
	effectsVolume.addChildren(zoom)
	SelectableComponent.setFromArray([resume, zoom, effectsVolume, musicVolume], true)
	uiPause.addChildren(pauseFrame)

	return uiPause
}
export default UIPauseEntity
