import SpriteComponent from "../Components/SpriteComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import { ECS, Entity } from "../Globals/ECS"
import { assets } from "../Globals/Initialize"
import BarShader from "../Shaders/BarShader"
import framedTile from "../Utils/FramedTile"
const scalingOptions = { x: { left: 2, right: 4 }, y: { top: 0, bottom: 0 } }
const w = 100
const h = 7
const bar = framedTile(assets.UI.XPBar, scalingOptions, w, h)
const full = framedTile(assets.UI.XPFull, scalingOptions, w, h)
const XPBarEntity = () => {
	const xpBar = new Entity()
	const sprite = xpBar.addComponent(new SpriteComponent(bar, { renderOrder: 100, scale: 3, shaders: [new BarShader(full.texture, 0)] }))
	ECS.eventBus.subscribe(ECSEVENTS.XPPERCENT, (percent: number) => {
		sprite.uniforms.percent = percent
	})
	xpBar.addComponent(new UIPosition({ x: 1, y: 1 }, { x: -1, y: 1 }))
	return xpBar
}
export default XPBarEntity