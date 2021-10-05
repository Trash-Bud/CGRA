import { CGFobject } from '../lib/CGF.js';
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

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.smallTriangle1 = new MyTriangleSmall(scene);
        this.bigTriangle1 = new MyTriangleBig(scene);
        this.smallTriangle2 = new MyTriangleSmall(scene);
        this.bigTriangle2 = new MyTriangleBig(scene);

    }

	display() {
        /////////////////////// BIG TRIANGLE 1
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
}