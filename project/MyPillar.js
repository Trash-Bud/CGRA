import {CGFobject,CGFappearance} from '../lib/CGF.js';
import {MyCilinder} from './MyCilinder.js';

export class MyPillar extends CGFobject {
    constructor(scene) {
        super(scene);
        this.woodTex = new CGFappearance(scene);
        this.woodTex.setAmbient(1, 1, 1, 1.0);
        this.woodTex.setDiffuse(1, 1, 1, 1.0);
        this.woodTex.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.woodTex.setShininess(10.0);
        this.woodTex.loadTexture('images/wood.png'); //from: https://ar.pinterest.com/pin/310537336808340553/
        this.woodTex.setTextureWrap('REPEAT', 'REPEAT');
        
        this.pillar = new MyCilinder(scene,16,8,10.5);
        this.initBuffers();
    }
    display(){
        this.woodTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.pillar.display();
        this.scene.popMatrix();
    }
}