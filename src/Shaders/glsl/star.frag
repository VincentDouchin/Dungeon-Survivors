uniform float time;
varying vec2 vUv;
void main() {
	vec2 timeA = vec2(1, time / 180.);
	vec2 timeB = vec2(1, time / 240.);
	float noiseUp = cnoise(vec3((vUv.xy - timeA) * vec2(5.), 1.));
	float noiseDown = cnoise(vec3((vUv.xy + timeB) * vec2(5.), 1.));
	float combinedNoise = noiseDown * noiseUp;
	// vec4 color = vec4(noise + 0.2, noise, noise + 0.2, 1);
	// vec4 colorB = vec4(0., 0., noiseB + 0.2, 1);
	gl_FragColor = vec4(vec3(combinedNoise + 0.1) * vec3(0.8, 0.6, 1), 1.);
	// gl_FragColor = color * vec4(vec3(staticNoise), 1.);
}