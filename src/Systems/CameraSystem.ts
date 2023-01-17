import { Vector3 } from "three";
import CameraTargetComponent from "../Components/CameraTargetComponent";
import PositionComponent from "../Components/PositionComponent";
import ECSEVENTS from "../Constants/ECSEvents";
import { ECS, Entity, System } from "../Globals/ECS";
import { camera } from "../Globals/Initialize";

class CameraSystem extends System {
    constructor() {
        super(CameraTargetComponent)
    }
    update(entities: Entity[]): void {
        entities.forEach(entity => {
            const position = entity.getComponent(PositionComponent)
            const cameraTarget = entity.getComponent(CameraTargetComponent)
            ECS.eventBus.publish(ECSEVENTS.CAMERAMOVE, { x: position.x, y: position.y })
            if (cameraTarget.left && cameraTarget.right && cameraTarget.top && cameraTarget.bottom) {
                const width = cameraTarget.right - cameraTarget.left
                const height = cameraTarget.top - cameraTarget.bottom
                const aspect = width < height ? window.innerWidth / window.innerHeight : window.innerHeight / window.innerWidth
                const frustumSize = Math.min(width, height)
                camera.left = -frustumSize / 2
                camera.right = frustumSize / 2
                camera.top = frustumSize / aspect / 2
                camera.bottom = -frustumSize / aspect / 2
                camera.updateProjectionMatrix()
            } else {
                const aspect = window.innerWidth / window.innerHeight;
                const frustumSize = 300
                camera.left = - frustumSize * aspect / 2
                camera.right = frustumSize * aspect / 2
                camera.top = frustumSize / 2
                camera.bottom = - frustumSize / 2
                camera.updateProjectionMatrix()
            }

            camera.position.x = position.x

            if (cameraTarget?.bottom && cameraTarget.bottom - position.y > camera.bottom) {
                camera.position.y = cameraTarget.bottom - camera.bottom
            } else if (cameraTarget?.top && cameraTarget.top - position.y < camera.top) {
                camera.position.y = cameraTarget.top - camera.top
            } else {
                camera.position.y = position.y
            }
            if (cameraTarget?.left && cameraTarget.left - position.x > camera.left) {
                camera.position.x = cameraTarget.left - camera.left
            } else if (cameraTarget?.right && cameraTarget.right - position.x < camera.right) {
                camera.position.x = cameraTarget.right - camera.right
            } else {
                camera.position.x = position.x
            }
            camera.lookAt(new Vector3(camera.position.x, camera.position.y, 0))
        })
    }
}
export default CameraSystem