varying vec2 vUv;
uniform float time;
void main() {
	bool isCenter = sqrt((vUv.x - 0.5) * (vUv.x - 0.5) + (vUv.y - 0.5) * (vUv.y - 0.5)) < time;
	gl_FragColor = vec4(0, 0, 0, isCenter ? 0 : 1);
}
