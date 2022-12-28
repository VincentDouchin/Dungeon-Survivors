uniform sampler2D main_texture;
uniform sampler2D light_texture;
varying vec2 vUv;
void main() {
	vec4 lightColor = texture2D(light_texture, vUv);
	vec4 pixelColor = texture2D(main_texture, vUv);
	vec4 pixelColor2 = vec4(pixelColor.xyz * vec3(0.2), lightColor.x);

	vec4 pixelColor3 = pixelColor * vec4(1.0 - lightColor.x);

	gl_FragColor = pixelColor2 + pixelColor3
	// gl_FragColor = mix(pixelColor, pixelColor2, 0.2);
	;
}