import {CGFobject} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { MyRock } from './MyRock.js';
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject{

constructor(scene, orient, sp, x, height, z, ratio, colour, text, text_map,default_shader,maxHeight,minHeight){
    super(scene, 0, 0, orient, sp, x, height, z);
    this.fish = new MyFish(scene, height, ratio, colour, text, text_map, default_shader);
    this.rock = null;
    this.height = 0;
    this.maxHeight = maxHeight;
    this.minHeight = minHeight;
    this.y = 0;
    this.height = height;
}

update(speedMultiplier, timeFactor1, timeFactor2, timeFactor3, scale) {
    super.update(speedMultiplier,scale);
    this.fish.update(timeFactor1*(this.speed*10 +1),timeFactor2,timeFactor3);
}

collectRock(rock){
    if (this.rock == null) this.rock = rock;
}

throwingRock() {
    this.rock.x = (0.5 + this.rock.sizeX) * Math.sin(this.orientation) + this.x;
    this.rock.y = this.height + this.y;
    this.rock.z = (0.5 + this.rock.sizeZ) * Math.cos(this.orientation) + this.z;
}
    
display(){

    if (this.rock != null){
        this.rock.texture.apply();
        this.scene.pushMatrix();
        this.scene.translate((0.5*this.scale+this.rock.sizeX)*Math.sin(this.orientation) + this.x,this.height+this.y,(0.5*this.scale+this.rock.sizeZ)*Math.cos(this.orientation) + this.z);
        this.scene.scale(this.rock.sizeX,this.rock.sizeY,this.rock.sizeZ);
        this.scene.rotate(this.rock.angle*Math.PI/180,0,1,0);
        this.rock.display();
        this.scene.popMatrix();
    }

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.orientation+90*Math.PI/180, 0, 1, 0);
    this.scene.translate(0,this.fish.y,0);
    this.scene.scale(this.scale,this.scale,this.scale);
    this.scene.translate(0,-this.fish.y,0);
    this.fish.display();
    this.scene.popMatrix();


}

changeHeight(val){
    if (this.y + this.height + val <= this.maxHeight && this.y + this.height + val >= this.minHeight) {
        this.y += val;
    }
    else if (this.y + this.height + val < this.minHeight) {

        this.y = this.minHeight - this.height;
        this.scene.goDown = false;
    }
    else if (this.y + this.height + val > this.maxHeight) {

        this.y = this.maxHeight - this.height;
        this.scene.goUp = false;
    }
}

}