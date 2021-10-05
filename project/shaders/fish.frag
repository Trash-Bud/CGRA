#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform float bodyRatio;
uniform vec4 customColour;

void main() {
	vec4 color = texture2D(uSampler2, vTextureCoord);
    vec4 filter = texture2D(uSampler3, vTextureCoord );

    if (vTextureCoord.y < bodyRatio){
        color = customColour;
    }
    gl_FragColor = color;
}
