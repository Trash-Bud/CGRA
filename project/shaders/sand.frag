#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler4;
uniform float heightOff;


void main() {
	vec4 color = texture2D(uSampler3, vTextureCoord);
	vec4 filter = texture2D(uSampler4, vTextureCoord);


	
	gl_FragColor = color * 0.5 + 0.5 * filter;
}