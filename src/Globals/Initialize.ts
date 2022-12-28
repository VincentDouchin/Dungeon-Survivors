
import RAPIER, { World } from "@dimforge/rapier2d-compat"
import { Color, OrthographicCamera, Scene, WebGLRenderer } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { INTERACT, MOVEDOWN, MOVELEFT, MOVERIGHT, MOVEUP } from "../Constants/InputsNames"
import KeyboardController from "../InputControllers/KeyboardController"
import CombineShader from "../Shaders/CombineShader"
import LightShader from "../Shaders/LigthShader"
import InputManager from "./InputManager"

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
//! Scenes
const UIScene = new Scene()
const scene = new Scene()
const lightScene = new Scene()
lightScene.background = new Color(0xFFFFFF)

//! Cameras
const UICamera = createCamera()
const camera = createCamera()

//! Composers
const UIcomposer = new EffectComposer(renderer)
UIcomposer.renderToScreen = false
const lightComposer = new EffectComposer(renderer)
lightComposer.renderToScreen = false
const mainComposer = new EffectComposer(renderer)
mainComposer.renderToScreen = false
const finalComposer = new EffectComposer(renderer)

//! Passes
const mainPass = new RenderPass(scene, camera)

const UIPass = new RenderPass(UIScene, UICamera)
UIPass.clear = false
const lightPass = new RenderPass(lightScene, camera)
const mainLightPass = new ShaderPass(LightShader(mainComposer, lightComposer))
const combinePass = new ShaderPass(CombineShader(UIcomposer.renderTarget2.texture, finalComposer.renderTarget1.texture))
UIcomposer.addPass(UIPass)
mainComposer.addPass(mainPass)
lightComposer.addPass(lightPass)
finalComposer.addPass(mainLightPass)
finalComposer.addPass(combinePass)

//! Render
const render = () => {
	mainComposer.render()
	lightComposer.render()
	UIcomposer.render()
	finalComposer.render()

}


//! Resize


const inputManager = new InputManager(MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, INTERACT)
inputManager.registerControllers(KeyboardController)
const world = new World({ x: 0, y: 0 })
export { render, scene, inputManager, world, camera, UIScene, UICamera, lightScene, renderer }
