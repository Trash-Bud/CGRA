attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec2 v2TextureCoord;
uniform sampler2D uSampler4;
uniform float timeFactor;


void main() {

    vec3 offset = vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;
    v2TextureCoord = aTextureCoord + timeFactor * vec2(1.0,1.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}