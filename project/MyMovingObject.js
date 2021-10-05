import { CGFobject } from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks, orient, sp, x, y, z) {
        super(scene);
        this.pyramid = new MyPyramid(scene, slices, stacks);
        this.speed = sp;
        this.orientation = orient;
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = 1;
    }
    update(speedMultiplier, scale) {
        if (this.speed != 0) {
            this.x += Math.sin(this.orientation) * this.speed * speedMultiplier;
            this.z += Math.cos(this.orientation) * this.speed  * speedMultiplier;
        }
        this.scale = scale;
    }

    turn(val){
        this.orientation -= val; 
    }

    accelerate(val){
        this.speed += val; 
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    reset(){
        this.speed = 0;
        this.orientation = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    
    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation+0.5, 0, 1, 0);
        this.scene.scale(this.scale,this.scale,this.scale);
        this.pyramid.display();
        this.scene.popMatrix();

    }

}