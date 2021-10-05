import { CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
import { MySphere} from './MySphere.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyNest extends CGFobject {
	constructor(scene, xNest, zNest,nestRadius,numberPos) {
		super(scene);
		this.initBuffers();

        this.rockPositionsX = [];
        this.rockPositionsZ = [];
        this.rockPositionsY = [];

        this.xNest = xNest;
        this.zNest = zNest;
        this.nestRadius = nestRadius;


        for (var i = 0; i< numberPos; i++){
            var x = Math.random();
            var z = Math.random();
            x = x*nestRadius + xNest - nestRadius/2;
            z = z*nestRadius + zNest - nestRadius/2;
            var y = this.scene.distance(x,z,xNest,zNest) * 0.1;
            this.rockPositionsX.push(x);
            this.rockPositionsY.push(y);
            this.rockPositionsZ.push(z);
        }

        this.nest = new MySphere(scene,16,8);

        this.nestText = new CGFtexture(scene, 'images/nest.jpg'); // from https://www.deviantart.com/enchantedgal-stock/art/SeaShell-Mermaid-Texture-Stock-54526607

        this.nestShader = new CGFshader(this.scene.gl, "shaders/nest.vert", "shaders/nest.frag");

        this.nestShader.setUniformsValues({uSampler5: 0});

	}

	display() {
        this.scene.setActiveShader(this.nestShader);
        this.nestText.bind(0);


        //display nest
        this.scene.pushMatrix();
        this.scene.translate(this.xNest,-1,this.zNest);
        this.scene.scale(this.nestRadius,0.2,this.nestRadius);
        this.nest.display();
        this.scene.popMatrix();
    }
}