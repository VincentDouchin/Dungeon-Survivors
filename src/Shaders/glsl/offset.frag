uniform float offsetX;
uniform float offsetY;
uniform float repeatX;
uniform float repeatY;
uniform sampler2D uTexture;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D(uTexture, vUv / (1. / vec2(repeatX, repeatY)) + vec2(offsetX, offsetY));
}