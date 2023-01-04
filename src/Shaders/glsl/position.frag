precision mediump float;
uniform sampler2D texture;
varying vec2 uv;

void main() {
  vec4 pixelColor = texture2D(texture, uv);
  gl_FragColor = pixelColor;

}
