import { ECS, Entity } from '../Globals/ECS'

import BarShader from '../Shaders/BarShader'
import SpriteComponent from '../Components/SpriteComponent'
import { UICamera } from '../Globals/Initialize'
import { UIEVENTS } from '../Constants/Events'
import UIPositionComponent from '../Components/UIPositionComponent'
import assets from '../Globals/Assets'

const XPBarEntity = () => {
	let percent = 0
	const scalingOptions = { x: { left: 2, right: 7 }, y: { top: 0, bottom: 0 } }
	const w = UICamera.right / 4 - 20
	const h = 7
	const bar = assets.UI.bar.framed(scalingOptions, w, h)
	const full = assets.UI.xp.framed(scalingOptions, w, h)
	const xpBar = new Entity('xp bar')
	const sprite = xpBar.addComponent(new SpriteComponent(bar, { renderOrder: 100, scale: 3, shaders: [new BarShader(full.texture, percent)] }))
	ECS.eventBus.subscribe(UIEVENTS.UI_XP, (newPercent) => {
		percent = newPercent
		sprite.getUniforms(BarShader).percent.value = percent
		sprite.render()
	})
	xpBar.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: -1, y: 1 }))
	return xpBar
}
export default XPBarEntity
