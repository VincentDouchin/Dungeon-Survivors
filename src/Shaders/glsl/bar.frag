uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform sampler2D fullTexture;
uniform float percent;
uniform float width;
void main() {
	vec4 fullPixel = texture2D(fullTexture, vUv);
	vec4 emptyPixel = texture2D(tDiffuse, vUv);
	gl_FragColor = (fullPixel.w > 0. && vUv.x <= percent) ? fullPixel : emptyPixel;
}