import { Raycaster, Vector3 } from 'three'
import { UICamera, UIScene, camera, renderer, scene } from '../Globals/Initialize'

import { ECS } from '../Globals/ECS'
import { InputController } from '../Globals/InputManager'
import State from '../Globals/State'

class TouchController implements InputController{
	constructor(){
		const detectPointerEvent = (eventName: 'mousedown' | 'mouseup' | 'mousemove' | 'touchstart' | 'touchend' | 'touchmove', state: 'down' | 'up' | 'move') => {

			renderer.domElement.addEventListener(eventName, (event: MouseEvent | TouchEvent) => {
				const target = event.target as HTMLCanvasElement
				const bounds = renderer.domElement.getBoundingClientRect()
				const sendEvent = (event: MouseEvent | TouchEvent['touches'][number]) => {
					const x = ((event.clientX - bounds.left) / target.clientWidth) * 2 - 1
					const y = 1 - ((event.clientY - bounds.top) / target.clientHeight) * 2
					const mouse = {
						x,
						y,
						clientX: (UICamera.right * x),
						clientY: (UICamera.top * y),
					}
					const vec = new Vector3()
					const pos = new Vector3()

					vec.set(
						(event.clientX / window.innerWidth) * 2 - 1,
						- (event.clientY / window.innerHeight) * 2 + 1,
						200)

					vec.unproject(camera)

					vec.sub(camera.position).normalize()

					const distance = - camera.position.z / vec.z
					pos.copy(camera.position).add(vec.multiplyScalar(distance))
					const raycaster = new Raycaster()
					raycaster.setFromCamera(mouse, UICamera)
					const uiObjects = raycaster.intersectObjects(UIScene.children, true).map(intersect => intersect.object.id)

					const raycasterScene = new Raycaster()
					raycasterScene.setFromCamera(mouse, camera)
					const objects = raycasterScene.intersectObjects(scene.children, true).map(intersect => intersect.object.id)
					ECS.eventBus.publish(state, { uiObjects, objects, ...mouse, identifier: event instanceof MouseEvent ? null : event.identifier })
				}

				if (event instanceof TouchEvent) {
					Array.from(event.changedTouches).forEach((touch) => sendEvent(touch))
				} else {
					sendEvent(event)
				}
			})

		}
		detectPointerEvent(State.mobile ? 'touchstart' : 'mousedown', 'down')
		detectPointerEvent(State.mobile ? 'touchend' : 'mouseup', 'up')
		detectPointerEvent(State.mobile ? 'touchmove' : 'mousemove', 'move')
	}
}
export default TouchController