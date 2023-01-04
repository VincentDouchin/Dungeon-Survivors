
import RAPIER, { World } from "@dimforge/rapier2d-compat"
// import { AmbientLight, Color, OrthographicCamera, Scene, WebGLRenderer } from "three"
import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP, PAUSE } from "../Constants/InputsNames"
import KeyboardController from "../InputControllers/KeyboardController"
import TouchController from "../InputControllers/TouchController"
import Renderer from "../Renderer/Renderer"
import Scene from "../Renderer/Scene"
import InputManager from "./InputManager"

//! World 
await RAPIER.init()
const world = new World({ x: 0, y: 0 })

// //! Camera
// const createCamera = () => {
// 	const aspect = window.innerWidth / window.innerHeight
// 	const frustumSize = 300
// 	const camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000000)
// 	window.addEventListener('resize', () => {
// 		const aspect = window.innerWidth / window.innerHeight;
// 		camera.left = - frustumSize * aspect / 2
// 		camera.right = frustumSize * aspect / 2
// 		camera.top = frustumSize / 2
// 		camera.bottom = - frustumSize / 2
// 		camera.updateProjectionMatrix()
// 	})

// 	camera.position.set(0, 0, 200)
// 	return camera
// }

// //! Renderer
// const createRenderer = () => {
// 	const renderer = new WebGLRenderer({ alpha: true })
// 	renderer.setPixelRatio(window.devicePixelRatio)
// 	renderer.setSize(window.innerWidth, window.innerHeight)
// 	window.addEventListener('resize', () => {
// 		renderer.setSize(window.innerWidth, window.innerHeight);
// 	})
// 	renderer.autoClear = false
// 	return renderer
// }
// const renderer = createRenderer()

const renderer = new Renderer()
document.body.appendChild(renderer.canvas)
//! Scenes
const scene = new Scene()
// const UIScene = new Scene()
// const scene = new Scene()
// scene.background = new Color(0x444444)
// const backgroundScene = new Scene()

// //! Cameras
// const UICamera = createCamera()
// const camera = createCamera()

//! Lights
// const UILight = new AmbientLight(0xffffff)
// UIScene.add(UILight)
// const light = new AmbientLight(new Color('hsl(0,0%,4%)'))

// scene.add(light)

//! Render
const render = () => {
	renderer.render(scene)
	// renderer.render(UIScene, UICamera)
}

//! Inputs
const inputManager = new InputManager(renderer.canvas, [MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, INTERACT, PAUSE])
inputManager.registerControllers(KeyboardController)
//@ts-ignore
// if (navigator.userAgentData.mobile) {
// 	inputManager.registerControllers(TouchController)
// }

export { render, scene, inputManager, world, renderer }

