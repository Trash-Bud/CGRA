import {CGFobject,CGFappearance,CGFshader} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";

export class MyFish extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
    constructor(scene, y, ratio, colour, text, text_map,default_shader) {
        super(scene);

        this.ratio = ratio;
        this.colour = this.scene.hexToRgbA(colour);
        this.text = text;
        this.default = default_shader;
        this.text_map = text_map;
        this.y = y;
        this.timeFactorTail = 0;
        this.timeFactorSideLeft = 0;
        this.timeFactorSideRight = 0;

        this.body = new MySphere(scene, 16, 8);
        this.finSide1 = new MyTriangle(scene);
        this.finSide2 = new MyTriangle(scene);
        this.finTop = new MyTriangle(scene);
        this.tail = new MyTriangle(scene);
        this.leftEye = new MySphere(scene,16,8);
        this.rightEye = new MySphere(scene,16,8);

        this.appearance = new CGFappearance(scene);
		this.appearance.setEmission(1.0, 1.0, 1.0, 1);
		this.appearance.setShininess(120);
        this.appearance.loadTexture('images/eye.png');
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.boddyShader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");
        
        this.boddyShader.setUniformsValues({ bodyRatio: ratio });
        this.boddyShader.setUniformsValues({ uSampler2: 1});
        this.boddyShader.setUniformsValues({ uSampler3: 2 });
        this.boddyShader.setUniformsValues({ customColour: this.colour});
        
    }
    display() {
        this.appearance.apply();
        this.scene.setActiveShader(this.boddyShader);

        this.text.bind(1);
        this.text_map.bind(2);

        //display main body
        this.scene.pushMatrix();
        this.scene.translate(0,this.y,0);
        this.scene.scale(0.5, 0.4,0.2);
        this.scene.rotate(90 * Math.PI/180,0,0,1);
        this.body.display();
        this.scene.popMatrix();

        //display left fin
        this.scene.pushMatrix();
        this.scene.translate(-0.1, this.y-0.2, 0.15);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate(-(30+this.timeFactorSideLeft*15)* Math.PI / 180, 1, 0, 0);
        this.scene.translate(1,-1,0);
        this.finSide1.display();
        this.scene.popMatrix();

        //display right fin
        this.scene.pushMatrix();
        this.scene.translate(-0.1, this.y-0.2, -0.15);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.rotate((30+this.timeFactorSideRight*15) * Math.PI / 180, 1, 0, 0);
        this.scene.translate(1,-1,0);
        this.finSide1.display();
        this.scene.popMatrix();
        
        //display top fin
        this.scene.pushMatrix();
        this.scene.translate(0, this.y + 0.5, 0);
        this.scene.rotate(180 * Math.PI / 180, 0, 1, 0);
        this.scene.scale(0.15, 0.15, 0.15);
        this.finSide2.display();
        this.scene.popMatrix();

        //display back fin
        this.scene.pushMatrix();
        this.scene.translate(0.75-0.2*Math.sqrt(2),this.y, 0);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.rotate(this.timeFactorTail*10*Math.PI/180,0,1,0);
        this.scene.translate(Math.sqrt(2),0,0);
        this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
        this.finSide2.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.default);


        //display right eye
        this.scene.pushMatrix();
        this.scene.translate(-0.3, this.y + 0.1, -0.15);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(100 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(-40*Math.PI/180,0,0,1);
        this.leftEye.display();
        this.scene.popMatrix();

        //display left eye
        this.scene.pushMatrix();
        this.scene.translate(-0.3, this.y + 0.1, 0.15);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(-100 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(-40*Math.PI/180,0,0,1);
        this.leftEye.display();
        this.scene.popMatrix();

    }
    update(timeFactorTail,timeFactorSideLeft,timeFactorSideRight){
        this.timeFactorTail = timeFactorTail;
        this.timeFactorSideLeft = timeFactorSideLeft;
        this.timeFactorSideRight = timeFactorSideRight;
    }
}
