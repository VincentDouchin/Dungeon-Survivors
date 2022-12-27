import MeshComponent from "../Components/MeshComponent"
import UIPosition from "../Components/UIPosition"
import ECSEVENTS from "../Constants/ECSEvents"
import AssetManager from "../Globals/AssetManager"
import { ECS, Entity } from "../Globals/ECS"
import State from "../Globals/State"
import updateBar from "./UpdateBar"

const bar = AssetManager.UI.XPBar
const full = AssetManager.UI.XPFull
const XPBarEntity = () => {
	const xpBar = new Entity()
	const mesh = new MeshComponent(bar.clone(), { renderOrder: 100, scale: 3 })
	ECS.eventBus.subscribe(ECSEVENTS.XP, (amount: number) => {
		State.xp += amount
		const levelUp = Math.floor(State.xp / State.nextLevel)
		if (levelUp > 0) {
			for (let i = 0; i < levelUp; i++) {
				State.xp = State.xp % State.nextLevel
				State.nextLevel *= 1.5
				State.level++
			}

		}
		console.log(levelUp, State.xp, State.level, State.nextLevel)
		updateBar(mesh, bar, full, State.xp / State.nextLevel)

	})
	xpBar.addComponent(mesh)
	xpBar.addComponent(new UIPosition({ x: -1, y: -1 }, { x: -1, y: -1 }))
	return xpBar
}
export default XPBarEntity