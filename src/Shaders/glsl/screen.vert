attribute vec2 position;
varying vec2 uv;

void main() {
  vec2 pos2 = position;
  gl_Position = vec4(pos2 * 2. - 1., 0, 1);
  uv = position;
}
