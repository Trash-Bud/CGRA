import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyCone} from './MyCone.js';
/**
* MyAlgae
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyAlgae extends CGFobject {
    constructor(scene,number) {
        super(scene);
        this.number = number;

        this.myAlgae = [];
        this.colors = [];
        this.positionsX = [];
        this.positionsZ = [];
        this.heights = [];
        this.radiusv = [];
        
        

        for(var i = 0; i < number; i++){
            this.height = 0.3 + Math.random() * 0.7;
            this.heights.push(this.height);

            this.radius = 0.05 + Math.random() * 0.05;
            this.radiusv.push(this.radius);

            this.algae = new MyCone(scene,16,8,this.height,this.radius);
            this.myAlgae.push(this.algae);

            this.g = Math.random();
            this.r = this.g * 0.8;
            this.b = this.g * 0.5;

            this.color = new CGFappearance(scene);
            this.color.setAmbient(this.r, this.g, this.b, 1.0);
            this.color.setDiffuse(this.r, this.g, this.b, 1.0);
            this.color.setShininess(10.0);
            this.colors.push(this.color);

            this.x = (Math.random() -0.5)/2;
            this.z = (Math.random() - 0.5)/2;
            this.positionsX.push(this.x);
            this.positionsZ.push(this.z);

        }

        this.initBuffers();
    }

    
    display(){
        for(var i = 0; i < this.number; i++){
            this.colors[i].apply();
            this.scene.pushMatrix();
            this.scene.translate(this.positionsX[i],0,this.positionsZ[i]);
            this.scene.scale(this.radiusv[i],this.heights[i],this.radiusv[i]);
            this.myAlgae[i].display();
            this.scene.popMatrix();
        }
    }
}


