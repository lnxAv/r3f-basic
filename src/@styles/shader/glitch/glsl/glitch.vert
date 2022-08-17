precision mediump float;
uniform float iTime;
uniform vec2 iResolution;

void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
 