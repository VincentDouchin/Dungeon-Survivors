import type { AmbientLight, Color } from 'three'
import { PointLight } from 'three'

import { Component } from '../Globals/ECS'
import { lightScene } from '../Globals/Initialize'

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
			const lightObject = lightScene.getObjectById(this.lightId) as THREE.Light
			if (lightObject) {
				lightObject.removeFromParent()
				lightObject.dispose()
			}
		}
	}
}
LightComponent.register()
export default LightComponent
