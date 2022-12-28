uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;
void main() {
	vec4 pixel1 = texture2D(texture1, vUv);
	vec4 pixel2 = texture2D(texture2, vUv);
	gl_FragColor = (pixel1.w) == 1.0 ? pixel1 : pixel2;
	// gl_FragColor = pixel1;
}