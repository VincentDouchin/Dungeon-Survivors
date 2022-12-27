import { Color, SpotLight } from "three";
import { Component } from "../Globals/ECS";
class LightComponent extends Component {
	light: SpotLight
	constructor(color = 0x111111, distance = 200) {
		super()
		const colorObj = new Color(color)
		this.light = new SpotLight(colorObj, 10, 0, 100)
		this.light.penumbra = 1
		this.light.position.z = distance

	}
	destroy() {
		this.light.removeFromParent()
	}
}
LightComponent.register()
export default LightComponent