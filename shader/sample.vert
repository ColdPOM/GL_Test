attribute vec3 Vertex;
attribute vec3 Normal;
attribute vec2 Coord;

uniform mat4 mvpMatrix;

varying vec3 _normal;
varying vec2 _coord;

void main() {
    gl_Position = mvpMatrix * vec4(Vertex, 1.0);
    _normal = Normal;
    _coord = Coord;
}