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

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.smallTriangle1 = new MyTriangleSmall(scene);
        this.bigTriangle1 = new MyTriangleBig(scene);
        this.smallTriangle2 = new MyTriangleSmall(scene);
        this.bigTriangle2 = new MyTriangleBig(scene);

        this.customPurple = new CGFappearance(scene);

        this.customPurple.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customPurple.setDiffuse(0.65, 0.36, 0.9, 1.0);
        this.customPurple.setSpecular(0.54, 0, 0.99, 1.0);
        this.customPurple.setShininess(10.0);

        this.customOrange = new CGFappearance(scene);

        this.customOrange.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customOrange.setDiffuse(0.96, 0.62, 0.25, 0);
        this.customOrange.setSpecular(1, 0.53, 0, 1.0);
        this.customOrange.setShininess(10.0);

        this.customYellow = new CGFappearance(scene);

        this.customYellow.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customYellow.setDiffuse(0.90, 0.89, 0.34, 1.0);
        this.customYellow.setSpecular(1, 1, 0, 1.0);
        this.customYellow.setShininess(10.0);

        this.customRed = new CGFappearance(scene);

        this.customRed.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customRed.setDiffuse(0.93, 0.29, 0.29, 1.0);
        this.customRed.setSpecular(1, 0, 0, 1.0);
        this.customRed.setShininess(10.0);

        this.customBlue = new CGFappearance(scene);

        this.customBlue.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customBlue.setDiffuse(0.13, 0.58, 0.87, 1.0);
        this.customBlue.setSpecular(0.16, 0.93, 0.95, 1.0);
        this.customBlue.setShininess(10.0);


        this.customGreen = new CGFappearance(scene);

        this.customGreen.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customGreen.setDiffuse(0.28, 0.82, 0.35, 1.0);
        this.customGreen.setSpecular(0.0, 0.82, 0.11, 1.0);
        this.customGreen.setShininess(10.0);

        this.customPink = new CGFappearance(scene);

        this.customPink.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.customPink.setDiffuse(0.95, 0.39, 0.97, 1.0);
        this.customPink.setSpecular(0.97, 0, 1, 1.0);
        this.customPink.setShininess(10.0);

    }

	display() {
        /////////////////////// BIG TRIANGLE 1


        if (this.scene.selectedMaterial == 5) { this.customBlue.apply()};

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

        if (this.scene.selectedMaterial == 5) { this.customOrange.apply() };

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
        if (this.scene.selectedMaterial == 5) { this.scene.customMaterial.apply() };

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

        if (this.scene.selectedMaterial == 5) { this.customPink.apply() };

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

        if (this.scene.selectedMaterial == 5) { this.customYellow.apply() };
        
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

        
        if (this.scene.selectedMaterial == 5) { this.customRed.apply() };

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

        if (this.scene.selectedMaterial == 5) { this.customPurple.apply() };
        

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