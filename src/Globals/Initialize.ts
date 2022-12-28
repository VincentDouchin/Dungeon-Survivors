
import { World } from "@dimforge/rapier2d-compat"
import { Color, OrthographicCamera, Scene, WebGLRenderer, } from "three"
import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"
import KeyboardController from "../InputControllers/KeyboardController"
import InputManager from "./InputManager"
import RAPIER from "@dimforge/rapier2d-compat"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import LightShader from "../Shaders/LigthShader"

await RAPIER.init()

//! Camera
const createCamera = () => {
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


//! UI

const UICamera = createCamera()
const UIScene = new Scene()
const UIcomposer = new EffectComposer(renderer)
const UIPass = new RenderPass(UIScene, UICamera)
UIPass.clear = false
UIcomposer.addPass(UIPass)


//! Light
const lightScene = new Scene()
const camera = createCamera()
lightScene.background = new Color(0xFFFFFF)
const lightComposer = new EffectComposer(renderer)
lightComposer.addPass(new RenderPass(lightScene, camera))
lightComposer.renderToScreen = false

//! Main
const scene = new Scene()
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const lightPass = new ShaderPass(LightShader(composer, lightComposer))
composer.addPass(lightPass)



//! Render
const render = () => {
	lightComposer.render()
	composer.render()
	UIcomposer.render()
}


//! Resize


const inputManager = new InputManager(MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, INTERACT)
inputManager.registerControllers(KeyboardController)
const world = new World({ x: 0, y: 0 })
export { render, scene, inputManager, world, camera, UIScene, UICamera, lightScene, renderer }