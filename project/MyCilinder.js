import { CGFobject, CGFappearance } from '../lib/CGF.js';

/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCilinder extends CGFobject {
    constructor(scene, slices, stacks,height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.initBuffers();

    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang)); //bottom, left -> 0,1
            this.vertices.push(Math.cos(ang), this.height, -Math.sin(ang)); //top, left -> 0,0
            this.vertices.push(Math.cos(ang + alphaAng), 0, -Math.sin(ang + alphaAng)); //bottom, right ->1,1
            this.vertices.push(Math.cos(ang + alphaAng), this.height, -Math.sin(ang + alphaAng)); //top, right -> 1,0

            /*
            this.texCoords.push(0,1);
            this.texCoords.push(0,0);
            this.texCoords.push(1,1);
            this.texCoords.push(1,0);
            */

            
            this.texCoords.push((1 / this.slices) * i, 1);
            this.texCoords.push((1 / this.slices) * i, 0);
            this.texCoords.push((1 / this.slices) * (i + 1), 1);
            this.texCoords.push((1 / this.slices) * (i + 1), 0);


            this.indices.push(4*i + 2, 4*i + 1, 4*i);
            this.indices.push(4*i + 1, 4*i + 2, 4*i +3 );

            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang + alphaAng), 0, -Math.sin(ang + alphaAng));
            this.normals.push(Math.cos(ang + alphaAng), 0, -Math.sin(ang + alphaAng));
            ang += alphaAng;
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


