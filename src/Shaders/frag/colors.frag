uniform vec4 color;
uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D(tDiffuse, vUv) * color;
}
