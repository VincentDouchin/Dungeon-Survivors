import MeshComponent from "../Components/MeshComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import AssetManager from "../Globals/AssetManager"
import { ECS, Entity } from "../Globals/ECS"
import framedTile from "../Utils/FramedTile"
import updateBar from "../Utils/UpdateBar"
const scalingOptions = { x: { left: 2, right: 4 }, y: { top: 0, bottom: 0 } }
const w = 100
const h = 7
const bar = framedTile(AssetManager.UI.XPBar, scalingOptions, w, h)
const full = framedTile(AssetManager.UI.XPFull, scalingOptions, w, h)
const XPBarEntity = () => {
	const xpBar = new Entity()
	const mesh = new MeshComponent(bar.clone(), { renderOrder: 100, scale: 3 })
	ECS.eventBus.subscribe(ECSEVENTS.XPPERCENT, (percent: number) => {
		updateBar(mesh, bar, full, percent)
	})
	xpBar.addComponent(mesh)
	xpBar.addComponent(new UIPosition({ x: 1, y: 1 }, { x: -1, y: -1 }))
	return xpBar
}
export default XPBarEntity