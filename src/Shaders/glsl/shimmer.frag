uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float time;
uniform float thickness;
uniform float start;
uniform float delay;
uniform float angle;
uniform float speed;
void main() {
	vec4 pixelColor = texture2D(tDiffuse, vUv);
	float shimmercoord = (mod(time, 4.) / speed + start / (2. + 2. * delay)) + (((vUv.x - 1.) * angle));
	bool shimmer = shimmercoord < vUv.y && shimmercoord > vUv.y - thickness && pixelColor.w > 0.;
	float shimmerColor = 0.2;
	gl_FragColor = pixelColor + vec4(shimmer ? shimmerColor : 0.);
}