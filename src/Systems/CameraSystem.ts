import { Vector2, Vector3 } from 'three'
import { ECS, System } from '../Globals/ECS'

import CameraTargetComponent from '../Components/CameraTargetComponent'
import { ECSEVENTS } from '../Constants/Events'
import type { Entity } from '../Globals/ECS'
import PositionComponent from '../Components/PositionComponent'
import State from '../Globals/State'
import { camera } from '../Globals/Initialize'
import saveData from '../Globals/SaveManager'

class CameraSystem extends System {
	frustumSize = 600
	newFrustrumSize?: number
	static min = 300
	static max = 910
	spacingX = 0
	aspect: number = window.innerWidth / window.innerHeight
	get zoom() {
		return Math.min(CameraSystem.max, Math.max(CameraSystem.min, Math.max(saveData.zoom, this.spacingX)))
	}

	get defaultAspect() {
		return window.innerHeight / window.innerWidth
	}

	constructor() {
		super(CameraTargetComponent)
	}

	update(entities: Entity[]): void {
		const cameraTarget = State.cameraBounds

		if (
			(cameraTarget.left && cameraTarget.right && cameraTarget.top && cameraTarget.bottom)
			&& (
				((cameraTarget.right - cameraTarget.left) < this.zoom)
				|| ((cameraTarget.top - cameraTarget.bottom) < (this.zoom * this.defaultAspect))
			)

		) {
			const width = cameraTarget.right - cameraTarget.left
			const height = cameraTarget.top - cameraTarget.bottom
			this.newFrustrumSize = Math.min(width, height)
			this.aspect = height < width ? window.innerWidth / window.innerHeight : window.innerHeight / window.innerWidth
		}
		else {
			this.newFrustrumSize = this.zoom
			this.aspect = this.defaultAspect
		}
		if (this.frustumSize !== this.newFrustrumSize) {
			this.frustumSize = this.newFrustrumSize
			camera.left = -this.frustumSize / 2
			camera.right = this.frustumSize / 2
			camera.top = this.frustumSize * this.aspect / 2
			camera.bottom = -this.frustumSize * this.aspect / 2
			camera.updateProjectionMatrix()
		}
		if (entities.length === 0) return
		const position = new Vector2()
		if (entities.length > 1) {
			const min: { x: null | number; y: null | number } = { x: null, y: null }
			const max: { x: null | number; y: null | number } = { x: null, y: null }
			entities.forEach((entity) => {
				const entityPosition = entity.getComponent(PositionComponent)
				if (!entityPosition) return
				if (min.x === null || entityPosition.x < min.x) {
					min.x = entityPosition.x
				}
				if (max.x === null || entityPosition.x > max.x) {
					max.x = entityPosition.x
				}
				if (min.y === null || entityPosition.y < min.y) {
					min.y = entityPosition.y
				}
				if (max.y === null || entityPosition.y > max.y) {
					max.y = entityPosition.y
				}
			})

			this.spacingX = Math.max(Math.abs((max.x ?? 0) - (min.x ?? 0)), Math.abs((max.y ?? 0) - (min.y ?? 0)) / this.aspect) + 100
		}
		entities.forEach((entity) => {
			const entityPosition = entity.getComponent(PositionComponent)
			if (!entityPosition) return
			position.add(entityPosition.position)
		})
		position.divide(new Vector2(entities.length, entities.length))
		if (cameraTarget?.bottom && cameraTarget.bottom - position.y > camera.bottom) {
			camera.position.y = cameraTarget.bottom - camera.bottom
		}
		else if (cameraTarget?.top && cameraTarget.top - position.y < camera.top) {
			camera.position.y = cameraTarget.top - camera.top
		}
		else {
			camera.position.y = position.y
		}
		if (cameraTarget?.left && cameraTarget.left - position.x > camera.left) {
			camera.position.x = cameraTarget.left - camera.left
		}
		else if (cameraTarget?.right && cameraTarget.right - position.x < camera.right) {
			camera.position.x = cameraTarget.right - camera.right
		}
		else {
			camera.position.x = position.x
		}
		ECS.eventBus.publish(ECSEVENTS.CAMERA_MOVE, { x: position.x, y: position.y })

		camera.lookAt(new Vector3(camera.position.x, camera.position.y, 0))
	}
}
export default CameraSystem
