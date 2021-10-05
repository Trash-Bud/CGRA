#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler4;
varying vec2 v2TextureCoord;
uniform float timeFactor;

void main() {
    vec2 newCoord = vTextureCoord;
    newCoord.x = newCoord.x +0.7*(texture2D(uSampler4, v2TextureCoord).r - 0.5);
    newCoord.y = newCoord.y +0.7* (texture2D(uSampler4, v2TextureCoord).g - 0.5);
    
    if(newCoord.x > 1.0)
        newCoord.x =  vTextureCoord.x;
    if(newCoord.x < 0.0)
        newCoord.x = vTextureCoord.x;

    if(newCoord.y > 1.0)
        newCoord.y = vTextureCoord.y;
    if(newCoord.y < 0.0)
        newCoord.y = vTextureCoord.y;
    
	vec4 color = texture2D(uSampler3, newCoord);
	

	
	gl_FragColor = color;
}