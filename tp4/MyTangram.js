import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();

        this.sTriangle1TexCoords = [
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75,
        ];

        this.sTriangle2TexCoords = [
            0.25, 0.25,
            0, 0,
            0,0.5,
        ];

        this.lTriangle1TexCoords = [
            0, 0,
            0.5, 0.5,
            1,0,
        ];
        
        this.lTriangle2TexCoords = [
            1, 0,
            0.5, 0.5,
            1,1,
        ];

        this.diamondCoords = [
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5,
        ];

        this.triangleCoords = [
            0, 0.5,
            0, 1,
            0.5, 1,
        ];

        this.parallelogramCoords = [
            1, 1,
			0.5, 1,
			0.75, 0.75,
			0.25, 0.75,
        ];

        this.diamond = new MyDiamond(scene, this.diamondCoords);
        this.triangle = new MyTriangle(scene, this.triangleCoords);
        this.parallelogram = new MyParallelogram(scene, this.parallelogramCoords);
        this.smallTriangle1 = new MyTriangleSmall(scene, this.sTriangle1TexCoords);
        this.bigTriangle1 = new MyTriangleBig(scene, this.lTriangle1TexCoords);
        this.smallTriangle2 = new MyTriangleSmall(scene, this.sTriangle2TexCoords);
        this.bigTriangle2 = new MyTriangleBig(scene, this.lTriangle2TexCoords);


        this.customTexture = new CGFappearance(scene);

        this.customTexture.setAmbient(1, 1, 1, 1.0);
        this.customTexture.setDiffuse(1, 1, 1, 1.0);
        this.customTexture.setSpecular(1, 1, 1, 1.0);
        this.customTexture.setShininess(10.0);
        this.customTexture.loadTexture('images/tangram.png');
        this.customTexture.setTextureWrap('REPEAT', 'REPEAT');

    }

	display() {
        /////////////////////// BIG TRIANGLE 1


        this.customTexture.apply();

        this.scene.pushMatrix();

        var rotMatrix = [
            Math.cos(-45 * Math.PI / 180), Math.sin(-45 * Math.PI / 180), 0, 0,
            -Math.sin(-45 * Math.PI / 180), Math.cos(-45 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var t1Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sqrt(2), -Math.sqrt(2), 0, 1,
        ];

        this.scene.multMatrix(t1Matrix);
        this.scene.multMatrix(rotMatrix);

        this.bigTriangle1.display();
        this.scene.popMatrix();

        ////////////////////////////////////// BIG TRIANGLE 2

        this.customTexture.apply();

        this.scene.pushMatrix();

        var rotMatrix = [
            Math.cos(135 * Math.PI / 180), Math.sin(135 * Math.PI / 180), 0, 0,
            -Math.sin(135 * Math.PI / 180), Math.cos(135 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var t1Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sqrt(2), -Math.sqrt(2) + Math.sqrt(8), 0, 1,
        ];

        this.scene.multMatrix(t1Matrix);
        this.scene.multMatrix(rotMatrix);

        this.bigTriangle2.display();
        this.scene.popMatrix();

        //////////////////////////////////  DIAMOND
        

        this.customTexture.apply();
        this.scene.pushMatrix();
        var t2Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sqrt(8) / 2, -(1 + Math.sqrt(8) / 2), 0, 1,
        ];
        this.scene.multMatrix(t2Matrix);

        
        this.diamond.display();
        this.scene.popMatrix();

        ///////////////////////////////////// Triangle Medium

        this.customTexture.apply();

        this.scene.pushMatrix();

        var rotMatrix = [
            Math.cos(-135 * Math.PI / 180), Math.sin(-135 * Math.PI / 180), 0, 0,
            -Math.sin(-135 * Math.PI / 180), Math.cos(-135 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var t1Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sqrt(8) / 2 + 1, -Math.sqrt(8) / 2 - 1 - Math.sqrt(2), 0, 1,
        ];

        this.scene.multMatrix(t1Matrix);
        this.scene.multMatrix(rotMatrix);

        this.triangle.display();
        this.scene.popMatrix();

        ///////////////////////////////////// Paralelogram

        this.customTexture.apply();
        
        this.scene.pushMatrix();

        var sMatrix = [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var t1Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -Math.sqrt(8), 0, 1,
        ];

        this.scene.multMatrix(t1Matrix);
        this.scene.multMatrix(sMatrix);

        this.parallelogram.display();
        this.scene.popMatrix();


        ///////////////////////////////////// Small triangle 1

        
        this.customTexture.apply();

        this.scene.pushMatrix();


        var rotMatrix = [
            Math.cos(90 * Math.PI / 180), Math.sin(90 * Math.PI / 180), 0, 0,
            -Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var t1Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sqrt(8), -0.5, 0, 1,
        ];

        this.scene.multMatrix(t1Matrix);

        this.scene.multMatrix(rotMatrix);

        this.smallTriangle1.display();
        this.scene.popMatrix();
        ///////////////////////////////////// Small triangle 2

        this.customTexture.apply();
        

        this.scene.pushMatrix();


        var rotMatrix = [
            Math.cos(-135 * Math.PI / 180), Math.sin(-135 * Math.PI / 180), 0, 0,
            -Math.sin(-135 * Math.PI / 180), Math.cos(-135 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];

        var t1Matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -Math.sqrt(8) - Math.sqrt(2) / 2, Math.sqrt(8), 0, 1,
        ];

        this.scene.multMatrix(t1Matrix);

        this.scene.multMatrix(rotMatrix);

        this.smallTriangle2.display();
        this.scene.popMatrix();
    }
    enableNormalViz() {
        this.bigTriangle1.enableNormalViz();
        this.bigTriangle2.enableNormalViz();
        this.smallTriangle1.enableNormalViz();
        this.smallTriangle2.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
    }
}