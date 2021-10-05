import { CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MySphere} from './MySphere.js';
/**
 * MyWaterSurface
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWaterSurface extends CGFobject {
	constructor(scene,divs, dim, waterLevel) {
		super(scene);
		this.initBuffers();
    
        this.dim = dim;
        this.waterLevel = waterLevel;
        
        this.surface = new MyPlane(scene,divs,0.0,1.0,0.0,1.0); 
        this.waterText = new CGFtexture(scene, 'images/pier.jpg');
        this.distortionMap = new CGFtexture(scene,'images/distortionmap.png');

        this.waterShader = new CGFshader(this.scene.gl, 'shaders/waterTop.vert', 'shaders/waterTop.frag');
        this.waterShader.setUniformsValues({uSampler3 : 0});
        this.waterShader.setUniformsValues({uSampler4: 1});
        

	}

	display() {
        this.scene.setActiveShader(this.waterShader);
        this.waterText.bind(0);
        this.distortionMap.bind(1);

        //display surface
		this.scene.pushMatrix();
        this.scene.translate(0,this.waterLevel,0);
        this.scene.scale(this.dim,1,this.dim);
        this.scene.rotate(90*Math.PI/180,1,0,0);
        this.surface.display();
        this.scene.popMatrix();
        
    }

    update(t){
        this.waterShader.setUniformsValues({timeFactor: t});
    }
}