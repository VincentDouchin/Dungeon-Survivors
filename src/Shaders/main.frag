uniform sampler2D uTexture;
uniform float uRepeatX;
uniform float uOffsetX;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
	vec4 pixelColor = texture2D(uTexture, vec2(vUv.x * uRepeatX + uOffsetX, vUv.y));

	vec4 color = pixelColor + vec4(uColor.xyz, pixelColor.w);
	gl_FragColor = color;
}