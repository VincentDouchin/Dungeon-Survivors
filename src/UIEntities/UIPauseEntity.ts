import { ECS, Entity } from '../Globals/ECS'

import CameraSystem from '../Systems/CameraSystem'
import INPUTS from '../Constants/InputsNames'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import saveData from '../Globals/SaveManager'
import { engine } from '../Globals/Initialize'
import RunState from '../GameStates/RunState'
import State from '../Globals/State'
import TextComponent from '../Components/TextComponent'
import VolumeBarEntity from './VolumeBarEntity'
import ButtonEntity from './ButtonEntity'

const UIPauseEntity = () => {
	const uiPause = new Entity('ui pause')
	const pauseFrame = new Entity('pause frame')
	pauseFrame.addComponent(new SpriteComponent(assets.UI.frame1.framed(16, 50, 58), { scale: 3 }))
	const framePosition = pauseFrame.addComponent(new UIPositionComponent({ x: 0, y: -2 }, { x: 0, y: 0 }))
	framePosition.moveTo(0, 20)
	const resume = ButtonEntity(30, 8, 2, 'Resume', 1.5, () => {
		ECS.eventBus.publish(INPUTS.PAUSE, 1)
	})
	const remuseSub = ECS.eventBus.subscribe(INPUTS.PAUSE, async (state) => {
		if (!state) return
		await framePosition.moveTo(-2, 10)
		engine.setState(RunState)
	})
	uiPause.onDestroy(() => remuseSub())
	resume.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 2 }))
	pauseFrame.addChildren(resume)
	const effectsVolume = VolumeBarEntity(0.1, 0.2, () => saveData.effectsVolume, (nb: number) => saveData.effectsVolume = nb, 'Effects volume')
	const musicVolume = VolumeBarEntity(0.1, 0.2, () => saveData.musicVolume, (nb: number) => saveData.musicVolume = nb, 'Music volume')
	const zoom = VolumeBarEntity(CameraSystem.min, CameraSystem.max, () => saveData.zoom, (nb: number) => saveData.zoom = nb, 'Zoom')
	const getMobileTouchText = () => `${State.mobile ? 'Disable' : 'Enable'} touch controls`
	const enableTouch = ButtonEntity(90, 8, 1.5, getMobileTouchText(), 1, (button) => {
		State.mobile = !State.mobile
		button?.children.forEach((child) => {
			const text = child.getComponent(TextComponent)
			if (text) {
				text.setText(getMobileTouchText())
			}
		})
	})
	enableTouch.addComponent(new UIPositionComponent().bottom())
	zoom.addChildren(enableTouch)
	resume.addChildren(musicVolume)
	musicVolume.addChildren(effectsVolume)
	effectsVolume.addChildren(zoom)
	SelectableComponent.setFromArray([resume, zoom, effectsVolume, musicVolume, enableTouch], true)
	uiPause.addChildren(pauseFrame)

	return uiPause
}
export default UIPauseEntity
