
import { World } from "@dimforge/rapier2d-compat"
import { OrthographicCamera, Scene, WebGLRenderer } from "three"
import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"
import KeyboardController from "../InputControllers/KeyboardController"
import InputManager from "./InputManager"
import RAPIER from "@dimforge/rapier2d-compat"

await RAPIER.init()

//! Camera
const aspect = window.innerWidth / window.innerHeight
const frustumSize = 300
const camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000)
window.addEventListener('resize', () => {
	const aspect = window.innerWidth / window.innerHeight;
	camera.left = - frustumSize * aspect / 2
	camera.right = frustumSize * aspect / 2
	camera.top = frustumSize / 2
	camera.bottom = - frustumSize / 2
	camera.updateProjectionMatrix()
})

camera.position.set(0, 0, 200)

//! Scene
const scene = new Scene()

//! Renderer
const renderer = new WebGLRenderer({ alpha: true, })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
document.body.appendChild(renderer.domElement)

const render = () => renderer.render(scene, camera)

//! Resize
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
})

const inputManager = new InputManager(MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, INTERACT)
inputManager.registerControllers(KeyboardController)
const world = new World({ x: 0, y: 0 })
export { render, scene, inputManager, world, camera }