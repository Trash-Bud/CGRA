attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;


void main() {
	float o = 0.0;

    vTextureCoord = aTextureCoord;

	if (vTextureCoord.y < 0.5 && vTextureCoord.y >=0.0){
		o = aVertexNormal.y * vTextureCoord.y * 20.0;
	}

	vec3 offset = vec3(0.0,o,0.0);


	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}