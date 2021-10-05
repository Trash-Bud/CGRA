import { CGFobject } from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0.5,	//0
			0.5, 0.5, -0.5,	//1
			0.5, -0.5, -0.5, //2
			0.5, -0.5, 0.5, //3
			-0.5, 0.5, 0.5,	//4
			-0.5, 0.5, -0.5,	//5
			-0.5, -0.5, -0.5, //6
			-0.5, -0.5, 0.5, //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			3, 2, 1, // right face
		    1, 0, 3,
			4, 7, 3, // up face
			3, 0, 4,
			4, 7, 6, //left face
			6, 5, 4,
			6, 2, 1, // down face
			1, 5, 6,
			4, 0, 1, // front face
			1, 5, 4,
			7, 3, 2, // back face
			2, 6, 7,

			1, 2, 3, // right face
			3, 0, 1,
			3, 7, 4, // up face
			4, 0, 3,
			6, 7, 4, //left face
			4, 5, 6,
			1, 2, 6, // down face
			6, 5, 1,
			1, 0, 4, // front face
			4, 5, 1,
			2, 3, 7, // back face
			7, 6, 2,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}