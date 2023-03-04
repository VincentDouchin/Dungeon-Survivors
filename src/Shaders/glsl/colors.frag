uniform vec4 color;
uniform sampler2D tDiffuse;
uniform bool add;
uniform bool multiply;
varying vec2 vUv;
void main() {
	vec4 pixelColor = texture2D(tDiffuse, vUv);

	if(add && pixelColor.w > 0.) {
		pixelColor += color;
	}
	if(multiply) {
		pixelColor *= color;
	}
	gl_FragColor = pixelColor;
}
