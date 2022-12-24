import { Color, OrthographicCamera, Scene, WebGLRenderer } from "three"


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
scene.background = new Color(0x000000)

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


export { render, scene }