attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler3;
uniform float bodyRatio;

varying vec2 vTextureCoord;

void main() {

	vec3 offset = vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	offset = aVertexNormal * 0.15 * texture2D(uSampler3, vTextureCoord).rgb;
	if (vTextureCoord.y < bodyRatio) offset = vec3(0.0,0.0,0.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
