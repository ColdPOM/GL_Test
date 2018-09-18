precision mediump float;

uniform sampler2D Texture;
uniform mat4 modelMatrix;

varying vec3 _normal;
varying vec2 _coord;

vec4 light = vec4(1, 1, 1, 0);
vec4 ambientColor = vec4(0.3, 0.3, 0.3, 0.0);

void main() {
    float diff = clamp(dot(normalize(modelMatrix * vec4(_normal, 0)), normalize(light)), 0.0, 1.0);
    vec4 color = vec4(vec3(diff), 1.0) + ambientColor;
    gl_FragColor = texture2D(Texture, _coord) * color;
}