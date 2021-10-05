import {CGFobject,CGFappearance} from '../lib/CGF.js';
import {MyRock} from './MyRock.js';

export class MyRockSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene,number,floorSize,height,nestX,nestZ,nestRadius) {
    super(scene);

    this.rockTex = new CGFappearance(scene);

    this.rockTex.setAmbient(1, 1, 1, 1.0);
    this.rockTex.setDiffuse(1, 1, 1, 1.0);
    this.rockTex.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.rockTex.setShininess(10.0);
    this.rockTex.loadTexture('images/rock.png'); //from: https://www.deviantart.com/hhh316/art/Seamless-Rock-Face-Texture-271675185
    this.rockTex.setTextureWrap('REPEAT', 'REPEAT');

    this.number = number;
    this.height = height;
    this.floorSize = floorSize;

    var x = 0;
    var z = 0;
    var sizeX = 0;
    var sizeY = 0;
    var sizeZ = 0;
    var angle = 0;

    this.rocks = [];
    this.nestRocks = [];

    for (var i = 0; i<= number; i++){
        do{
          x = Math.random() * this.floorSize - this.floorSize/2;
          z = Math.random() * this.floorSize - this.floorSize/2;
        }while(this.scene.distance(x,z,nestX,nestZ) <= nestRadius)

        sizeX = (Math.random() * 0.1 + 0.1);
        sizeY = (Math.random() * 0.1 + 0.1);
        sizeZ = (Math.random() * 0.1 + 0.1);
        angle = Math.random() * 180;
        


        var rock = new MyRock(scene,16,8,sizeX,sizeY,sizeZ,x,z,this.height,angle,this.rockTex);
        this.rocks.push(rock);
    }

    this.initBuffers();
    
  }

  display(){

    this.rockTex.apply();
    
    for (var i = 0; i < this.rocks.length; i++){
        this.scene.pushMatrix();
        this.scene.translate(this.rocks[i].x,this.rocks[i].y,this.rocks[i].z);
        this.scene.scale(this.rocks[i].sizeX,this.rocks[i].sizeY,this.rocks[i].sizeZ);
        this.scene.rotate(this.rocks[i].angle*Math.PI/180,0,1,0);
        this.rocks[i].display();
        this.scene.popMatrix();
    }

    for (var i = 0; i < this.nestRocks.length; i++){
      this.scene.pushMatrix();
      this.scene.translate(this.nestRocks[i].x,this.nestRocks[i].y,this.nestRocks[i].z);
      this.scene.scale(this.nestRocks[i].sizeX,this.nestRocks[i].sizeY,this.nestRocks[i].sizeZ);
      this.scene.rotate(this.nestRocks[i].angle*Math.PI/180,0,1,0);
      this.nestRocks[i].display();
      this.scene.popMatrix();
  }

  }

  removeRock(i){
    this.rocks.splice(i,1);
  }

  addRock(i){
    this.rocks.push(i);
  }
  
  addRockNest(i){
    this.nestRocks.push(i);
  }
}
