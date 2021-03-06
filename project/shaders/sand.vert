attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler4;
uniform float heightOff;

varying vec2 vTextureCoord;


void main() {
	vec3 offset = vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;


	offset = aVertexNormal* heightOff * texture2D(uSampler4, vTextureCoord).b;


	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}