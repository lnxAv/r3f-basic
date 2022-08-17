uniform float iTime;
uniform vec2 iResolution;
void main()	{
  float x = mod(iTime + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
  float y = mod(iTime + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
  gl_FragColor = vec4(vec3(min(x, y) * vec3(0.9412, 0.898, 0.898)), 1.);
}