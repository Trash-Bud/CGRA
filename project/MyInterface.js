import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name("Display axis");

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleMovingObject', 0.5, 3).name('Object Scale');

        this.gui.add(this.scene, 'multiplySpeed', 0.1, 3).name('Speed Multiplier');

        //Dropdown to select object part
        this.gui.add(this.scene, 'selectedPart', this.scene.parts).name('Selected Part');
        
        //Dropdown for textures
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));

        //Dropdown for objects
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object');

        
        //initiate key control
        this.initKeys();

        return true;
    }

    initKeys() {

        // create reference from the scene to the GUI

        this.scene.gui = this;



        // disable the processKeyboard function

        this.processKeyboard = function(){};



        // create a named array to store which keys are being pressed

        this.activeKeys = {};

    }


    processKeyDown(event) {

        // called when a key is pressed down

        // mark it as active in the array

        this.activeKeys[event.code] = true;

    };


    processKeyUp(event) {

        // called when a key is released, mark it as inactive in the array

        this.activeKeys[event.code] = false;

    };


    isKeyPressed(keyCode) {

        if (this.activeKeys[keyCode] == true && (keyCode == "keyL" || keyCode == "keyP")) {

            this.activeKeys[keyCode] = false;

            return true;

        }

        return this.activeKeys[keyCode] || false;

    }
}