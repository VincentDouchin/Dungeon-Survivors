uniform sampler2D tDiffuse;
uniform float time;
uniform float seed;
uniform bool invert;
uniform float kernel;
varying vec2 vUv;

void main() {
	float noise = cnoise(vec3((vUv.xy + vec2(seed)) * vec2(kernel), 99.));
	vec4 pixelColor = texture2D(tDiffuse, vUv);
	gl_FragColor = (invert ? (noise < time) : (noise > time)) ? pixelColor : vec4(0);
}