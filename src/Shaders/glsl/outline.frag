uniform sampler2D tDiffuse;
uniform vec4 color;
varying vec2 vUv;
uniform vec2 size;
void main() {
	float texelSizeX = 1. / size.x;
	float texelSizeY = 1. / size.y;
	float weight = 1. - (texture2D(tDiffuse, vec2(vUv.x + texelSizeX, vUv.y)).w +
		texture2D(tDiffuse, vec2(vUv.x, vUv.y - texelSizeY)).w +
		texture2D(tDiffuse, vec2(vUv.x - texelSizeX, vUv.y)).w +
		texture2D(tDiffuse, vec2(vUv.x, vUv.y + texelSizeY)).w);
	vec4 c = texture2D(tDiffuse, vUv);
	// gl_FragColor = weight > 0. ? texture2D(tDiffuse, vUv) : vec4(1, 1, 0, 1);
	gl_FragColor = c.w > 0. ? c : ((weight < 0.1) ? color : c);
}