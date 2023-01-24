import { AmbientLight, Color, PointLight } from "three";

import { Component } from "../Globals/ECS";
import { lightScene } from "../Globals/Initialize";

class LightComponent extends Component {
	// light: SpotLight
	lightId: number | null = null
	color: number | Color
	distance: number
	type: Constructor<PointLight | AmbientLight>
	constructor(color: number | Color = 0x111111, distance = 500, type?: Constructor<PointLight | AmbientLight>) {
		super()
		this.color = color
		this.distance = distance
		this.type = type ?? PointLight
	}
	destroy() {
		if (this.lightId) {
			lightScene.getObjectById(this.lightId)?.removeFromParent()
		}
	}
}
LightComponent.register()
export default LightComponent