
import RAPIER, { World } from "@dimforge/rapier2d-compat"
import { AmbientLight, Color, OrthographicCamera, Scene, WebGLRenderer } from "three"
import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"
import KeyboardController from "../InputControllers/KeyboardController"
import TouchController from "../InputControllers/TouchController"
import InputManager from "./InputManager"

//! World 
await RAPIER.init()
const world = new World({ x: 0, y: 0 })

//! Camera
const createCamera = () => {
	const aspect = window.innerWidth / window.innerHeight
	const frustumSize = 300
	const camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000000)
	window.addEventListener('resize', () => {
		const aspect = window.innerWidth / window.innerHeight;
		camera.left = - frustumSize * aspect / 2
		camera.right = frustumSize * aspect / 2
		camera.top = frustumSize / 2
		camera.bottom = - frustumSize / 2
		camera.updateProjectionMatrix()
	})

	camera.position.set(0, 0, 200)
	return camera
}

//! Renderer
const createRenderer = () => {
	const renderer = new WebGLRenderer({ alpha: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
	})
	renderer.autoClear = false
	return renderer
}
const renderer = createRenderer()


document.body.appendChild(renderer.domElement)
//! Scenes
const UIScene = new Scene()
const scene = new Scene()
scene.background = new Color(0x444444)
const backgroundScene = new Scene()

//! Cameras
const UICamera = createCamera()
const camera = createCamera()

//! Lights
const UILight = new AmbientLight(0xffffff)
UIScene.add(UILight)
const light = new AmbientLight(new Color('hsl(0,0%,4%)'))

scene.add(light)

//! Render
const render = () => {
	renderer.render(scene, camera)
	renderer.render(UIScene, UICamera)
}

//! Inputs
const inputManager = new InputManager(renderer.domElement, [MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, INTERACT])
inputManager.registerControllers(KeyboardController)
inputManager.registerControllers(TouchController)

export { render, scene, inputManager, world, camera, UIScene, UICamera, backgroundScene, renderer }

