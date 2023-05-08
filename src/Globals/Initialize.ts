import { Clock, OrthographicCamera, Scene, ShaderMaterial, WebGL1Renderer, WebGLRenderer } from 'three'
import { World, init } from '@dimforge/rapier2d-compat'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import INPUTS from '../Constants/InputsNames'
import LandscapeInfoEntity from '../UIEntities/LanscapeInfoEntity'
import waitFor from '../Utils/WaitFor'
import Engine from './Engine'
import InputManager from './InputManager'
import SoundManager from './SoundManager'
import assets from './Assets'
import type { Entity } from './ECS'
import Coroutine from './Coroutine'

// ! Engine

const engine = new Engine()

// ! Clock
const clock = new Clock()

// ! World
await init()
const world = new World({ x: 0, y: 0 })

// ! Camera
const createCamera = (update: boolean) => {
	const aspect = window.innerWidth / window.innerHeight
	const frustumSize = 300
	const camera = new OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000000)
	if (update) {
		window.addEventListener('resize', () => {
			window.screen.orientation.lock('landscape')
			const aspect = window.innerWidth / window.innerHeight
			camera.left = -frustumSize * aspect / 2
			camera.right = frustumSize * aspect / 2
			camera.top = frustumSize / 2
			camera.bottom = -frustumSize / 2
			camera.updateProjectionMatrix()
		})
		window.screen.orientation.addEventListener('change', () => {
			window.screen.orientation.lock('landscape')
			const aspect = window.innerWidth / window.innerHeight
			camera.left = -frustumSize * aspect / 2
			camera.right = frustumSize * aspect / 2
			camera.top = frustumSize / 2
			camera.bottom = -frustumSize / 2
			camera.updateProjectionMatrix()
		})
	}

	camera.position.set(0, 0, 200)
	return camera
}

// ! Renderer
const createRenderer = () => {
	let renderer: WebGL1Renderer | WebGLRenderer
	try {
		renderer = new WebGLRenderer({ alpha: true })
	} catch {
		renderer = new WebGL1Renderer({ alpha: true })
	}
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
	})
	window.screen.orientation.addEventListener('change', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
	})
	renderer.setClearColor(0xFFFFFF, 0)
	renderer.autoClear = false
	return renderer
}
const renderer = createRenderer()

document.body.appendChild(renderer.domElement)

// ! Inputs
const inputManager = new InputManager(Object.values(INPUTS))

// ! INFO
let info: null | Entity = null
const createInfo = () => {
	if ((window.innerWidth / window.innerHeight) < 1 && !info) {
		inputManager.enabled = false
		info = LandscapeInfoEntity()
		new Coroutine(function*() {
			yield * waitFor(10)
			engine.stop()
		})
	} else 	if (info) {
		inputManager.enabled = true
		engine.start()
		info.destroy()
		info = null
	}
}
createInfo()
window.addEventListener('resize', createInfo)

// ! Cameras
const UICamera = createCamera(true)
const camera = createCamera(false)

// ! Scenes
const UIScene = new Scene()
const scene = new Scene()

const composer = new EffectComposer(renderer)
const vignette = new ShaderMaterial({
	transparent: true,
	vertexShader: /* glsl */`
	varying vec2 vUv;
	void main() {
		vUv = uv;
		vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix * modelViewPosition;
	}`,
	fragmentShader: /* glsl */`
	varying vec2 vUv;
	void main() {
		vec2 vignetteUV = vUv;
		vignetteUV *=  1.0 - vUv.yx;   //vec2(1.0)- uv.yx; -> 1.-u.yx; Thanks FabriceNeyret !
		float vig = vignetteUV.x*vignetteUV.y * 15.0; // multiply with sth for intensity
		vig = pow(vig, 0.15); // change pow for modifying the extend of the  vignette
		gl_FragColor = vec4(0,0,0,1.-vig);
	}`,

})
composer.addPass(new ShaderPass(vignette))
// composer.addPass(new ShaderPass(new ShaderMaterial({
// 	transparent: true,
// 	blending: MultiplyBlending,
// 	uniforms: {
// 		lightsTexture: new Uniform(lightsTarget.texture)
// 	},
// 	vertexShader:/*glsl*/`
// 	varying vec2 vUv;
// 	void main() {
// 		vUv = uv;
// 		vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
// 		gl_Position = projectionMatrix * modelViewPosition;
// 	}`,
// 	fragmentShader:/*glsl*/`
// 	varying vec2 vUv;
// 	uniform sampler2D  lightsTexture;
// 	uniform sampler2D  tDiffuse;
// 	void main() {
// 		gl_FragColor =  texture2D(lightsTexture,vUv);
// 	}`
// })))

// ! Render
const render = () => {
	renderer.setRenderTarget(null)
	renderer.render(scene, camera)
	composer.render()
	renderer.clearDepth()
	renderer.render(UIScene, UICamera)
}

// ! Sound
const soundManager = new SoundManager(assets.sounds)

export { render, scene, inputManager, world, camera, UIScene, UICamera, renderer, clock, soundManager, engine }
