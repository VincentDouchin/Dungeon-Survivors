uniform sampler2D uTexture;
uniform float uRepeatX;
uniform float uRepeatY;
uniform float uOffsetX;
uniform float uOffsetY;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
	vec4 pixelColor = texture2D(uTexture, vec2(vUv.x * uRepeatX + uOffsetX, vUv.y * uRepeatY + uOffsetY));
	vec4 color = (uColor.x + uColor.y + uColor.z) > 0.0 ? pixelColor * vec4(uColor.xyz, 1) : pixelColor;

	gl_FragColor = color;
}