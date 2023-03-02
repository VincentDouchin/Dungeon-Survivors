uniform sampler2D tDiffuse;
uniform float time;
uniform float seed;
varying vec2 vUv;

void main() {
	float noise = cnoise(vec3((vUv.xy + vec2(seed)) * vec2(5.), 0.));
	vec4 pixelColor = texture2D(tDiffuse, vUv);
	gl_FragColor = noise < (1. - time * 3.) ? pixelColor : vec4(0);
}