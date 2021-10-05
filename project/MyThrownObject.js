import {  CGFobject  } from '../lib/CGF.js';
import { MyRock  } from './MyRock.js';

export class MyThrownObject extends CGFobject {
    constructor(scene, rock, nestX, nestZ, nestY) {
        super(scene);
        this.rock = rock;
        this.inX = rock.x;
        this.inZ = rock.z;
        this.nestY = nestY;
        this.nestX = nestX;
        this.nestZ = nestZ;
        
        // we initialize a displacement vector that will serve as the guideline for the horizontal movement while the object falls

        this.displacement = [nestX - this.rock.x, nestZ - this.rock.z];
        this.initialTime = 0;
    }

    display() {
        this.rock.texture.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.rock.x, this.rock.y, this.rock.z);
        this.scene.scale(this.rock.sizeX, this.rock.sizeY, this.rock.sizeZ);
        this.scene.rotate(this.rock.angle * Math.PI / 180, 0, 1, 0);
        this.rock.display();
        this.scene.popMatrix();
    }

    update(t) {
        if (this.initialTime == 0) this.initialTime = t;
        this.rock.y = 5 - 1.25*Math.pow((t-this.initialTime)/1000,2); //"gravity" has a value of 2.5 units/ s^2, fall time will be 2 seconds
        this.rock.x = this.inX + ((t-this.initialTime)  /  1000)  *  this.displacement[0]  /  2;
        this.rock.z = this.inZ + ((t-this.initialTime)/1000)*this.displacement[1]/2;
    }
    
}