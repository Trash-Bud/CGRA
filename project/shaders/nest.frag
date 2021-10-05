#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler5;



void main() {
	vec4 color = texture2D(uSampler5, vTextureCoord);
	
	gl_FragColor = color;
}