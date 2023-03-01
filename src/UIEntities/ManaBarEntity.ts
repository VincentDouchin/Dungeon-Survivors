import { ECS, Entity } from "../Globals/ECS"
import ECSEVENTS, { MANA_PERCENT } from "../Constants/ECSEvents"

import BarShader from "../Shaders/BarShader"
import SpriteComponent from "../Components/SpriteComponent"
import UIPositionComponent from "../Components/UIPositionComponent"
import assets from "../Globals/Assets"

const scalingOptions = { x: { left: 2, right: 5 }, y: { top: 0, bottom: 0 } }
const w = window.innerWidth * 0.04
const h = 7
const bar = assets.UI.bar.framed(scalingOptions, w, h)
const full = assets.UI.mana.framed(scalingOptions, w, h)
const ManaBarEntity = () => {
	const manaBar = new Entity('mana bar')
	const sprite = manaBar.addComponent(new SpriteComponent(bar, { renderOrder: 100, scale: 3, shaders: [new BarShader(full.texture, 0)], flipped: true }))
	ECS.eventBus.subscribe<MANA_PERCENT>(ECSEVENTS.MANA_PERCENT, (percent: number) => {
		sprite.uniforms.percent = percent
	})
	manaBar.addComponent(new UIPositionComponent({ x: -1, y: 1 }, { x: 1, y: 1 }))
	return manaBar
}
export default ManaBarEntity