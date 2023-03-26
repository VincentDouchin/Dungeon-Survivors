import { ECS, Entity } from '../Globals/ECS'

import BarShader from '../Shaders/BarShader'
import { ECSEVENTS } from '../Constants/Events'
import INPUTS from '../Constants/InputsNames'
import OutlineShader from '../Shaders/OutlineShader'
import RotationComponent from '../Components/RotationComponent'
import SelectableComponent from '../Components/SelectableComponent'
import SpriteComponent from '../Components/SpriteComponent'
import TextComponent from '../Components/TextComponent'
import Tile from '../Utils/Tile'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'
import { save } from '../Globals/SaveManager'
import { soundManager } from '../Globals/Initialize'

const VolumeBarEntity = (defaultValue: number, max: number, getter: () => number, setter: (nb: number) => void, text: string) => {
	const volumeFrame = new Entity('volume frame')
	volumeFrame.addComponent(new SpriteComponent(assets.UI.frame2.framed(8, 80, 16), { scale: 2 }))
	volumeFrame.addComponent(new UIPositionComponent().bottom())

	const frameSelect = volumeFrame.addComponent(new SelectableComponent())
	const volumeText = new Entity('text volume')
	volumeText.addComponent(new SpriteComponent(Tile.empty()))
	volumeText.addComponent(new TextComponent(text, { size: 24 }))
	volumeText.addComponent(new UIPositionComponent({ x: 0, y: 1 }, { x: 0, y: 2 }))
	volumeFrame.addChildren(volumeText)
	const volume = new Entity('volume')
	const volumeWidth = 64
	const volumeHeight = 16
	volume.addComponent(new UIPositionComponent({ x: 0, y: -1 }, { x: 0, y: 2 }))

	const volumeSprite = volume.addComponent(
		new SpriteComponent(
			assets.UI.barempty.framed({ x: 16, y: 0 }, volumeWidth, volumeHeight),
			{
				shaders:
					[new BarShader(assets.UI.barfull.framed({ x: 16, y: 0 }, volumeWidth, volumeHeight).texture, getter() / max)],
				scale: 1,
			}))
	ECS.eventBus.subscribe(ECSEVENTS.SELECTED, (entity) => {
		if (entity.id === volumeFrame.id) {
			volumeSprite.addShader(new OutlineShader([1, 1, 1, 1]))
		}
	})
	ECS.eventBus.subscribe(ECSEVENTS.DESELECTED, (entity) => {
		if (entity.id === volumeFrame.id) {
			volumeSprite.removeShader(OutlineShader)
		}
	})
	volumeText.addChildren(volume)
	const arrowLeft = new Entity('arrow volume left')
	arrowLeft.addComponent(new SpriteComponent(assets.UI.arrow, { scale: 2 }))
	arrowLeft.addComponent(new UIPositionComponent().left())
	const arrowRight = new Entity('arrow volume right')
	arrowRight.addComponent(new SpriteComponent(assets.UI.arrow, { scale: 2 }))
	arrowRight.addComponent(new UIPositionComponent().right())
	arrowRight.addComponent(new RotationComponent({ rotation: Math.PI / 2 }))
	const arrows = [arrowRight, arrowLeft]
	arrows.forEach((arrow, index) => {
		const arrowSelect = arrow.addComponent(new SelectableComponent(assets.UI.arrowselected, assets.UI.arrow, () => {
			setter(Math.min(max, Math.max(0, getter() + (index === 0 ? 1 : -1) * (defaultValue * 0.1))))
			volumeSprite.getUniforms(BarShader).percent.value = getter() / max
			volumeSprite.render()
			save()
			soundManager.updateVolume()
		}))
		arrowSelect.next[index === 0 ? INPUTS.MOVELEFT : INPUTS.MOVERIGHT] = volumeFrame
	})
	frameSelect.next[INPUTS.MOVERIGHT] = arrowRight
	frameSelect.next[INPUTS.MOVELEFT] = arrowLeft
	volume.addChildren(arrowLeft)
	volume.addChildren(arrowRight)

	return volumeFrame
}
export default VolumeBarEntity
