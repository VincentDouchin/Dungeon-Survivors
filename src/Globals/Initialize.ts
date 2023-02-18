import { Clock, Mesh, MeshStandardMaterial, MultiplyBlending, NearestFilter, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Uniform, WebGLRenderTarget, WebGLRenderer } from "three"
import INPUTS, { PAUSE } from "../Constants/InputsNames"
import RAPIER, { World } from "@dimforge/rapier2d-compat"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import GamepadController from "../InputControllers/GamepadController"
import InputManager from "./InputManager"
import KeyboardController from "../InputControllers/KeyboardController"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import TouchController from "../InputControllers/TouchController"

// ! Clock
const clock = new Clock()

//! World 
await RAPIER.init()
const world = new World({ x: 0, y: 0 })

//! Camera
const createCamera = () => {
	const aspect = window.innerWidth / window.innerHeight
	const frustumSize = 300
	const camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000000)
	// window.addEventListener('resize', () => {
	// 	const aspect = window.innerWidth / window.innerHeight;
	// 	camera.left = - frustumSize * aspect / 2
	// 	camera.right = frustumSize * aspect / 2
	// 	camera.top = frustumSize / 2
	// 	camera.bottom = - frustumSize / 2
	// 	camera.updateProjectionMatrix()
	// })

	camera.position.set(0, 0, 200)
	return camera
}

//! Renderer
const createRenderer = () => {
	const renderer = new WebGLRenderer({ alpha: true, })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
	})
	renderer.setClearColor(0xffffff, 0)
	renderer.autoClear = false
	return renderer
}
const renderer = createRenderer()


document.body.appendChild(renderer.domElement)

//! Cameras
const UICamera = createCamera()
const camera = createCamera()

//! Scenes
const UIScene = new Scene()
const scene = new Scene()


//! Lights
const lightScene = new Scene()
const background = new Mesh(
	new PlaneGeometry(window.innerWidth, window.innerHeight),
	new MeshStandardMaterial({ color: 0xffffff })
)
background.position.set(0, 0, 0)
lightScene.add(background)
const lightsTarget = new WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: NearestFilter, magFilter: NearestFilter })
const composer = new EffectComposer(renderer)
const vignette = new ShaderMaterial({
	transparent: true,
	vertexShader:/*glsl*/`
	varying vec2 vUv;
	void main() {
		vUv = uv;
		vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix * modelViewPosition;
	}`,
	fragmentShader:/*glsl*/`
	varying vec2 vUv;
	void main() {
		vec2 vignetteUV = vUv;
		vignetteUV *=  1.0 - vUv.yx;   //vec2(1.0)- uv.yx; -> 1.-u.yx; Thanks FabriceNeyret !
		float vig = vignetteUV.x*vignetteUV.y * 15.0; // multiply with sth for intensity
		vig = pow(vig, 0.15); // change pow for modifying the extend of the  vignette
		gl_FragColor = vec4(0,0,0,1.-vig);
	}`

})
composer.addPass(new ShaderPass(vignette))
composer.addPass(new ShaderPass(new ShaderMaterial({
	transparent: true,
	blending: MultiplyBlending,
	uniforms: {
		lightsTexture: new Uniform(lightsTarget.texture)
	},
	vertexShader:/*glsl*/`
	varying vec2 vUv;
	void main() {
		vUv = uv;
		vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix * modelViewPosition;
	}`,
	fragmentShader:/*glsl*/`
	varying vec2 vUv;
	uniform sampler2D  lightsTexture;
	uniform sampler2D  tDiffuse;
	void main() {
		gl_FragColor =  texture2D(lightsTexture,vUv);
	}`
})))

//! Render
const render = () => {
	background.position.set(camera.position.x, camera.position.y, 0)
	renderer.setRenderTarget(lightsTarget)
	renderer.render(lightScene, camera)
	renderer.setRenderTarget(null)
	renderer.render(scene, camera)
	composer.render()
	renderer.clearDepth()
	renderer.render(UIScene, UICamera)
}

//! Inputs
const inputManager = new InputManager(renderer.domElement, INPUTS)
inputManager.registerControllers(KeyboardController)
inputManager.registerControllers(GamepadController)
inputManager.registerControllers(TouchController)
inputManager.eventBus.subscribe(PAUSE, (s) => console.log(s))
export { render, scene, inputManager, world, camera, UIScene, UICamera, renderer, clock, lightScene }

