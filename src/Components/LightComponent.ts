import { Color } from "three";
import { Component } from "../Globals/ECS";
import { scene } from "../Globals/Initialize";
class LightComponent extends Component {
	// light: SpotLight
	lightId: number | null = null
	color: number | Color
	distance: number
	constructor(color: number | Color = 0x111111, distance = 500) {
		super()
		this.color = color
		this.distance = distance
		// const colorObj = new Color(color)
		// this.light = new SpotLight(colorObj, 10, 0, 100)
		// this.light.penumbra = 1
		// this.light.position.z = distance

	}
	destroy() {
		if (this.lightId) {
			scene.getObjectById(this.lightId)?.removeFromParent()
		}
	}
}
LightComponent.register()
export default LightComponent