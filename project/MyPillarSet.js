import {CGFobject} from '../lib/CGF.js';
import {MyPillar} from './MyPillar.js';

export class MyPillarSet extends CGFobject {
    constructor(scene) {
        super(scene);

        this.pillar1 = new MyPillar(scene);
        this.pillar2 = new MyPillar(scene);
        this.pillar3 = new MyPillar(scene);
        this.pillar4 = new MyPillar(scene);
        this.pillar5 = new MyPillar(scene);
        this.pillar6 = new MyPillar(scene);
        this.initBuffers();
    }
    display(){

        this.scene.pushMatrix();
        this.scene.translate(1.5,0,2);
        this.pillar1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5,0,-7);
        this.pillar2.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(12,0,2);
        this.pillar3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(12,0,-7);
        this.pillar4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(24,0,2);
        this.pillar5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(24,0,-7);
        this.pillar6.display();
        this.scene.popMatrix();

        

    }
}