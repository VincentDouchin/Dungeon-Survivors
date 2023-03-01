import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { XP_PERCENT } from "../Constants/ECSEvents"

import BarShader from "../Shaders/BarShader"
import SpriteComponent from "../Components/SpriteComponent"
import { UICamera } from "../Globals/Initialize"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"

const scalingOptions = { x: { left: 2, right: 5 }, y: { top: 0, bottom: 0 } }
const w = UICamera.right / 5
const h = 7
const bar = assets.UI.bar.framed(scalingOptions, w, h)
const full = assets.UI.xp.framed(scalingOptions, w, h)
const XPBarEntity = () => {
	const xpBar = new Entity('xp bar')
	const sprite = xpBar.addComponent(new SpriteComponent(bar, { renderOrder: 100, scale: 3, shaders: [new BarShader(full.texture, 0)] }))
	ECS.eventBus.subscribe<XP_PERCENT>(ECSEVENTS.XP_PERCENT, (percent: number) => {
		sprite.uniforms.percent = percent
	})
	xpBar.addComponent(new UIPositionComponent({ x: 1, y: 1 }, { x: -1, y: 1 }))
	return xpBar
}
export default XPBarEntity