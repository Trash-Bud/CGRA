import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import {MyFish} from "./MyFish.js";

export class MyAnimatedFish extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, y, ratio, colour, text, text_map, default_shader,xCenter,zCenter,period,radius) {
        super(scene);

        this.fish = new MyFish(scene, y, ratio, colour, text, text_map, default_shader);
        this.radius = radius;
        
        this.xCenter = xCenter;
        this.zCenter = zCenter;
        this.x = xCenter + this.radius;
        this.z = zCenter + this.radius;
        this.angle = 0;
        this.period = period;
        this.lastTime = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.xCenter, 0, this.zCenter);
        this.scene.translate(Math.sin(this.angle)  *  this.radius,  0,  Math.cos(this.angle)  *  this.radius);
        this.scene.rotate(this.angle + Math.PI, 0, 1, 0);
        this.fish.display();
        this.scene.popMatrix();
    }
    
    update(timeFactorTail, t, timeFactorSideRight) {
        this.fish.update(timeFactorTail * this.radius * (2 * Math.PI / this.period)*0.1, 0, timeFactorSideRight * this.radius * (2 * Math.PI / this.period)*0.2);
        this.angle += 2*Math.PI *(t-this.lastTime)/(this.period*1000);
        this.lastTime = t;
    }
}