attribute vec2 position;
varying vec2 uv;

void main() {
  gl_Position = vec4((position * 2. - 1.) * vec2(1, -1), 0, 1);
  uv = position;
}
