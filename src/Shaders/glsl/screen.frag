// #define DEBUG false
precision mediump float;
varying vec2 uv;
uniform sampler2D texture;

void main() {
  vec4 pixelColor = texture2D(texture, uv);

  gl_FragColor = pixelColor;
}
