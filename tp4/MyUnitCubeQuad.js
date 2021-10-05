import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, t1, t2, t3, t4, t5, t6) {
		super(scene);
		this.initBuffers();

		this.t1 = t1;
		this.t2 = t2;
		this.t3 = t3;
		this.t4 = t4;
		this.t5 = t5;
		this.t6 = t6;

		this.texquad = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];

		this.quad1 = new MyQuad(scene, this.texquad);
		this.quad2 = new MyQuad(scene, this.texquad);
		this.quad3 = new MyQuad(scene, this.texquad);
		this.quad4 = new MyQuad(scene, this.texquad);
		this.quad5 = new MyQuad(scene, this.texquad);
		this.quad6 = new MyQuad(scene, this.texquad);

		
			
	}

	display() {
		//back face
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if (this.t1) this.t1.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.5)
		this.scene.rotate(Math.PI,0, 1,0);
		this.quad1.display();
		this.scene.popMatrix();

		//front face
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if (this.t2) this.t2.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad2.display();
		this.scene.popMatrix();

		//right face
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if (this.t3) this.t3.apply();
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(90*Math.PI/180,0,1,0);
		this.quad3.display();
		this.scene.popMatrix();

		//left face
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if (this.t4) this.t4.apply();
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(-90*Math.PI/180,0,1,0);
		this.quad4.display();
		this.scene.popMatrix();

		//top face
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if (this.t5) this.t5.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-90*Math.PI/180,1,0,0);
		this.quad5.display();
		this.scene.popMatrix();

		//bottom face
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if (this.t6) this.t6.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(90*Math.PI/180,1,0,0);
		this.quad6.display();
		this.scene.popMatrix();

    }
}