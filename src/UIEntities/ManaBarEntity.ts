import { ECS, Entity } from "../Globals/ECS"

import BarShader from "../Shaders/BarShader"
import { ECSEVENTS } from "../Constants/Events"
import SpriteComponent from "../Components/SpriteComponent"
import { UICamera } from "../Globals/Initialize"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"

const scalingOptions = { x: { left: 2, right: 6 }, y: { top: 0, bottom: 0 } }
const w = UICamera.right / 5
const h = 7
const bar = assets.UI.bar.framed(scalingOptions, w, h)
const full = assets.UI.mana.framed(scalingOptions, w, h)
const ManaBarEntity = () => {
	const manaBar = new Entity('mana bar')
	const sprite = manaBar.addComponent(new SpriteComponent(bar, { renderOrder: 100, scale: 3, shaders: [new BarShader(full.texture, 0)], flipped: true }))
	ECS.eventBus.subscribe(ECSEVENTS.MANA_PERCENT, (percent) => {
		sprite.uniforms.percent = percent
	})
	manaBar.addComponent(new UIPositionComponent({ x: -1, y: 1 }, { x: 1, y: 1 }))
	return manaBar
}
export default ManaBarEntity