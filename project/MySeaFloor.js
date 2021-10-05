import { CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyNest} from './MyNest.js';
/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject {
	constructor(scene,divs, dim, heightOffset, xNest, zNest,nestRadius,numberPos) {
		super(scene);
		this.initBuffers();
        this.dim = dim;
        this.xNest = xNest;
        this.zNest = zNest;
        this.nestRadius = nestRadius;
        this.plane = new MyPlane(scene,divs,0.0,1.0,0.0,1.0); 

        this.sand = new CGFtexture(scene, 'images/sand.png');
        this.sand_height = new CGFtexture(scene, 'images/sandMap.png');

        this.sandShader = new CGFshader(this.scene.gl, "shaders/sand.vert", "shaders/sand.frag");

        this.nest = new MyNest(scene,xNest,zNest,nestRadius,numberPos);

        this.nestText = new CGFtexture(scene, 'images/nest.jpg'); // from https://www.deviantart.com/enchantedgal-stock/art/SeaShell-Mermaid-Texture-Stock-54526607

        this.nestShader = new CGFshader(this.scene.gl, "shaders/nest.vert", "shaders/nest.frag");
        
        this.sandShader.setUniformsValues({ uSampler3: 0})
        this.sandShader.setUniformsValues({uSampler4:  1});
        this.sandShader.setUniformsValues({ heightOff: heightOffset});

        this.nestShader.setUniformsValues({uSampler5: 2});

	}

	display() {
        this.scene.setActiveShader(this.sandShader);
        this.sand.bind(0);
        this.sand_height.bind(1);

        //display sand
		this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.scene.scale(this.dim,1,this.dim);
        this.scene.rotate(-90*Math.PI/180,1,0,0);
        this.plane.display();
        this.scene.popMatrix();

        this.nest.display();
    }
}