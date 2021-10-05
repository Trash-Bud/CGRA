import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillarSet } from "./MyPillarSet.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
import { CGFcamera2 } from "./MyCamera2.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";
import { MyThrownObject } from "./MyThrownObject.js";



/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        this.enableTextures(true);

        //Other variables connected to MyInterface
        this.selectedObject = 0;
        this.displayAxis = true;
        this.selectedTexture = 0;
        this.scaleMovingObject = 1;
        this.selectedObject = 0;
        this.objectComplexity = 0.5;
        this.multiplySpeed = 1;
        this.selectedPart = 1;

        //Initialize scene objects

        var xNest = 15;
        var zNest = 15;
        var nestRadius = 4.0; //must be float since it's used in the shader

        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this, 3, 1, 0, 0, 0, 0, 0);
        this.cubeMap = new MyCubeMap(this,this.back, this.front, this.left, this.right, this.bottom, this.top);
        this.cilinder = new MyCilinder(this, 30, 1, 3);
        this.fish = new MyMovingFish(this, 0, 0, 0, 3, 0, 0.4, '#DC143C', this.scales,this.scales_filter,this.defaultShader,5,0.5);
        this.seaFloor = new MySeaFloor(this,20,50,1,xNest,zNest,nestRadius,1);
        this.waterSurface = new MyWaterSurface(this,20,50,10);
        this.rocks = new MyRockSet(this,50,50,-0.4,xNest,zNest,nestRadius);
        this.pillars = new MyPillarSet(this);
        this.algaes = new MyAlgaeSet(this,100,50,xNest,zNest,nestRadius);
        this.animatedFish1 = new MyAnimatedFish(this, 2, 0.4, '#11FF45', this.scales, this.scales_filter, this.defaultShader, Math.random() * 40 - 20, Math.random() * 40 - 20,Math.random()*8+2,5);
        this.animatedFish2 = new MyAnimatedFish(this, 4, 0.4, '#FFC0CB', this.scales, this.scales_filter, this.defaultShader, Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random()*8 +2,5);
        this.thrownRock = null;
        this.objects = [this.movingObject, this.incompleteSphere, this.cilinder];

        //other variables
        this.goDown = false;
        this.goUp = false;

    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        //this.camera = new CGFcamera(1.5, 2.0, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
        this.camera = new CGFcamera2(1.5, 2.0, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    initMaterials() {

        //Appearances
        this.front = new CGFappearance(this);
        this.front.setEmission(1, 1, 1, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/underwater_cubemap/front.jpg');
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        this.left = new CGFappearance(this);
        this.left.setEmission(1,1,1,1);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/underwater_cubemap/left.jpg');
        this.left.setTextureWrap('REPEAT', 'REPEAT');

        this.right = new CGFappearance(this);
        this.right.setEmission(1, 1, 1, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/underwater_cubemap/right.jpg');
        this.right.setTextureWrap('REPEAT', 'REPEAT');

        this.top = new CGFappearance(this);
        this.top.setEmission(1, 1, 1, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/underwater_cubemap/top.jpg');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.back = new CGFappearance(this);
        this.back.setEmission(1, 1, 1, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/underwater_cubemap/back.jpg');
        this.back.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(this);
        this.bottom.setEmission(1, 1, 1, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/underwater_cubemap/bottom.jpg');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');

        this.text = new CGFappearance(this);
        this.text.setAmbient(1, 1, 1, 1.0);
        this.text.setDiffuse(1, 1, 1, 1.0);
        this.text.setSpecular(1, 1, 1, 1.0);
        this.text.setShininess(10.0);
        this.text.loadTexture('images/FEUP.jpg');
        this.text.setTextureWrap('REPEAT', 'REPEAT');

        this.earth = new CGFappearance(this);
        this.earth.setAmbient(1, 1, 1, 1.0);
        this.earth.setDiffuse(1, 1, 1, 1.0);
        this.earth.setSpecular(1, 1, 1, 1.0);
        this.earth.setShininess(10.0);
        this.earth.loadTexture('images/earth.jpg');
        this.earth.setTextureWrap('REPEAT', 'REPEAT');

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        //textures
        this.scales = new CGFtexture(this, 'images/scales.jpg'); //texture from https://3dtextures.me/about/ licensed as CC0
        this.scales_filter = new CGFtexture(this, 'images/scales_map.jpg'); //texture from https://3dtextures.me/about/ licensed as CC0

        this.front1 = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.front2 = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.underWaterFront = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');

        this.back1 = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.back2 = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.underWaterBack = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');

        this.left1 = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.left2 = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.underWaterLeft = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');

        this.right1 = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.right2 = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.underWaterRight = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');

        this.top1 = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.top2 = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.underWatertop = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');

        this.bottom1 = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.bottom2 = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.underWaterBottom = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');


        this.frontTextures = [ this.underWaterFront, this.front1, this.front2 ];

        this.backTextures = [this.underWaterBack , this.back1, this.back2 ];

        this.leftTextures = [ this.underWaterLeft, this.left1, this.left2 ];

        this.rightTextures = [this.underWaterRight, this.right1, this.right2 ];

        this.topTextures = [ this.underWatertop, this.top1, this.top2 ];

        this.bottomTextures = [ this.underWaterBottom, this.bottom1, this.bottom2 ];

        this.textureIds = {'Underwater': 0, 'Mountain': 1, 'Test': 2};
        this.objectIDs = { 'Moving Object': 0, 'Sphere': 1, 'Cylinder': 2 };
        this.parts = {'Part A': 0, 'Part B' : 1};


    }

    updateAppliedTexture() {
        this.front.setTexture(this.frontTextures[this.selectedTexture]);
        this.left.setTexture(this.leftTextures[this.selectedTexture]);
        this.right.setTexture(this.rightTextures[this.selectedTexture]);
        this.back.setTexture(this.backTextures[this.selectedTexture]);
        this.top.setTexture(this.topTextures[this.selectedTexture]);
        this.bottom.setTexture(this.bottomTextures[this.selectedTexture]);
    }


    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update(this.multiplySpeed,this.scaleMovingObject);

    
        this.timeFactor3 =   t / 200 % 200/200;

        this.timeFactor1 =  Math.sin(t / 100 % 100);
        this.timeFactor2 =  Math.sin(t / 200 % 200);
        this.timeFactor4 = this.timeFactor2;
        
        this.animatedFish1.update(this.timeFactor1, t, this.timeFactor4);
        this.animatedFish2.update(this.timeFactor1, t, this.timeFactor4);

        if (this.gui.isKeyPressed("KeyA")) this.timeFactor2 = 0;
        if (this.gui.isKeyPressed("KeyD")) this.timeFactor4 = 0;

        if (this.goUp){
            this.fish.changeHeight(0.2);
        }
        if (this.goDown){
            this.fish.changeHeight(-0.2);
        }

        this.fish.update(this.multiplySpeed,this.timeFactor1,this.timeFactor2,this.timeFactor4,this.scaleMovingObject);

        if (this.thrownRock != null) {
            if (this.thrownRock.rock.y <= this.thrownRock.nestY) {
                this.thrownRock.rock.x = this.thrownRock.nestX;
                this.thrownRock.rock.z = this.thrownRock.nestZ;
                this.thrownRock.rock.y = this.thrownRock.nestY;
                this.addRockNestThrow(this.thrownRock.rock);
                this.thrownRock = null;
            }
            else this.thrownRock.update(t);
        }
        
        
        this.waterSurface.update(this.timeFactor3);
    }

    collectRock(){
        for (var i = 0; i<this.rocks.rocks.length; i++){
            if (this.distance(this.fish.x,this.fish.z,this.seaFloor.xNest,this.seaFloor.zNest) <= this.seaFloor.nestRadius){
                return;
            }
            if (this.distance(this.fish.x,this.fish.z,this.rocks.rocks[i].x,this.rocks.rocks[i].z) <= 1.5){
                this.fish.collectRock(this.rocks.rocks[i]);
                this.rocks.removeRock(i);
                return;
            }
        }
    }

    dropRock(){
        if (this.distance(this.fish.x,this.fish.z,this.seaFloor.xNest,this.seaFloor.zNest) <= this.seaFloor.nestRadius){
            var rock = this.fish.rock;
            this.fish.rock = null;
            this.addRockToNest(rock);
        }
    }

    addRockNestThrow(rock){
        this.rocks.addRockNest(rock);
    }

    addRockToNest(rock) {
        var pos = Math.floor(Math.random() * (this.seaFloor.nest.rockPositionsX.length - 1));
        rock.x = this.seaFloor.nest.rockPositionsX[pos];
        rock.z = this.seaFloor.nest.rockPositionsZ[pos];
        for (var i = this.rocks.nestRocks.length - 1; i >= 0; i--) {
            if (this.rocks.nestRocks[i].x == rock.x && this.rocks.nestRocks[i].z == rock.z) {
                rock.y = this.rocks.nestRocks[i].y + rock.sizeY + this.rocks.nestRocks[i].sizeY;
                break;
            }
            if (i == 0) {
                rock.y = this.seaFloor.nest.rockPositionsY[pos];
            }
        }
        if (this.rocks.nestRocks.length == 0) rock.y = this.seaFloor.nest.rockPositionsY[pos];
        this.rocks.addRockNest(rock);
    }

    throwRock(){
        if (this.distance(this.fish.x, this.fish.z, this.seaFloor.xNest, this.seaFloor.zNest) <= 5+ this.seaFloor.nestRadius && this.fish.y + this.fish.height == this.fish.maxHeight) {
            this.fish.throwingRock();

            var pos = Math.floor(Math.random() * (this.seaFloor.nest.rockPositionsX.length - 1));
            var xNest = this.seaFloor.nest.rockPositionsX[pos];
            var zNest = this.seaFloor.nest.rockPositionsZ[pos];
            var yNest;
            for (var i = this.rocks.nestRocks.length - 1; i >= 0; i--) {
                if (this.rocks.nestRocks[i].x  == xNest  && this.rocks.nestRocks[i].z == zNest) {
                    yNest = this.rocks.nestRocks[i].y + this.fish.rock.sizeY + this.rocks.nestRocks[i].sizeY;
                    break;
                }
                if (i == 0) {
                    yNest = this.seaFloor.nest.rockPositionsY[pos];
                }
            }
            if (this.rocks.nestRocks.length == 0) yNest = this.seaFloor.nest.rockPositionsY[pos];

            this.thrownRock = new MyThrownObject(this, this.fish.rock, xNest, zNest, yNest);
            this.fish.rock = null;
        }
    }

    distance(x1,z1,x2,z2){
        return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((z2-z1),2));
    }

    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {

            this.movingObject.accelerate(0.05);
            this.fish.accelerate(0.05);
        }

        if (this.gui.isKeyPressed("KeyS")) {

            this.movingObject.accelerate(-0.05);
            this.fish.accelerate(-0.05);
        }

        if (this.gui.isKeyPressed("KeyP")) {
            
            if (this.goDown)this.goDown = false;
            else this.goUp = true;
            
        }

        if (this.gui.isKeyPressed("KeyL")) {

            if (this.goUp) this.goUp = false;
            else this.goDown = true;

        }

        if (this.gui.isKeyPressed("KeyA")) {

            this.movingObject.turn(-0.1);
            this.fish.turn(-0.1);

        }


        if (this.gui.isKeyPressed("KeyD")) {

            this.movingObject.turn(0.1);
            this.fish.turn(0.1);

        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.goDown = false;
            this.goUp = false;

            this.movingObject.reset();

            if (this.fish.rock != null){
                this.rocks.addRock(this.fish.rock);
                this.fish.rock = null;
            }

            this.fish.reset();
        }

        if (this.gui.isKeyPressed("KeyC")){
            if (this.fish.y + this.fish.height == 0.5) {
                if (this.fish.rock == null) this.collectRock();
                else this.dropRock();
            }
            else if (this.fish.y + this.fish.height == 5) {
                if (this.fish.rock != null) throwRock();
            }
        }

        if(this.gui.isKeyPressed("KeyT")){
            if (this.fish.rock != null) this.throwRock();
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis) this.axis.display();

        this.sphereAppearance.apply();
        
        // ---- BEGIN Primitive drawing section


        if (this.selectedPart == 0){
            if (this.selectedObject == 1) {
                this.earth.apply();
            }
            else if (this.selectedObject == 2) {
                this.text.apply();
            }
            this.objects[this.selectedObject].display();
        }
        else if (this.selectedPart == 1){

            this.fish.display();
            this.seaFloor.display();
            this.waterSurface.display();
            
            this.animatedFish1.display();
            this.animatedFish2.display();
    
            if (this.thrownRock != null) {
                this.thrownRock.display();
            }
            
            
            this.setActiveShader(this.defaultShader);
    
            this.rocks.display();
            this.pillars.display();
            this.algaes.display();
        }

        this.pushMatrix();
        this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
        this.scale(500, 500, 500);
        this.cubeMap.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}