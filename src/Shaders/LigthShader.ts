import { ShaderMaterial, Uniform } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import lightFrag from './frag/lights.frag?raw'

import mainVert from './vert/main.vert?raw'
const LightShader = (mainComposer: EffectComposer, lightComposer: EffectComposer) => new ShaderMaterial({
	uniforms: {
		main_texture: new Uniform(mainComposer.renderTarget2.texture),
		light_texture: new Uniform(lightComposer.renderTarget2.texture)
	},
	vertexShader: mainVert,
	fragmentShader: lightFrag,

})
export default LightShader