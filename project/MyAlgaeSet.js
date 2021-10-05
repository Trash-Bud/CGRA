import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyAlgae} from './MyAlgae.js';
/**
* MyAlgaeSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyAlgaeSet extends CGFobject {
    constructor(scene,number,floorSize,nestX,nestZ,nestRadius) {
        super(scene);
        this.number = number;

        this.myAlgae = [];
        this.positionsX = [];
        this.positionsZ = [];

        var x, z;
        var algae;
        var numberA;

        for(var i = 0; i < number; i++){

            numberA = 5 + Math.random() * 5

            algae = new MyAlgae(scene,numberA);
            this.myAlgae.push(algae);

            do{
                x = Math.random() * floorSize - floorSize/2;
                z = Math.random() * floorSize - floorSize/2;
            }while(this.scene.distance(x,z,nestX,nestZ) <= nestRadius)
      
            this.positionsX.push(x);
            this.positionsZ.push(z);



        }

        this.initBuffers();
    }

    
    display(){
        for(var i = 0; i < this.number; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.positionsX[i],-0.5,this.positionsZ[i]);
            this.myAlgae[i].display();
            this.scene.popMatrix();
        }
    }
}


