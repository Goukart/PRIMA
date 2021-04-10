"use strict";
var L02_Space_Invaders_v2;
(function (L02_Space_Invaders_v2) {
    // 01.04.2021
    var ƒ = FudgeCore;
    /************************************************************************************
     * Task was:
     * Restructure the code to shorten the init() method and use more classes.
     *
     * Done today:
     *
     *
     * Next task:
     *
    ************************************************************************************/
    // Wait for elements in html to load
    window.addEventListener("load", init);
    const root = new ƒ.Node("rootNode");
    // Globally define the player character
    const spaceCannon = L02_Space_Invaders_v2.Cannon.Instance;
    // Define the viewport to bring camera, scene and canvas together
    // Must also be declared here to be accessible in 'update' to draw all the frames 
    const viewport = new ƒ.Viewport();
    function init(_event) {
        // Get the canvas (with query) from the HTML file to draw to
        const canvas = document.querySelector("canvas");
        // Define the camera to view the scene from one perspective
        const cmpCamera = new ƒ.ComponentCamera();
        // Move camera so 1px = 1 and all borders are actual borders
        configureCamera(cmpCamera, canvas);
        // Here we tell the viewport alle the things it needs to know
        viewport.initialize("Viewport", // The name of the object
        root, // What we want to render / the scene from the root-node (root ≙ node here)
        cmpCamera, // From which perspective/camera to view the scene from (usually the root-node)
        canvas // Where to render to, here the html canvas so the user can see it
        );
        // Build the Level
        L02_Space_Invaders_v2.buildLevel(root, cmpCamera, spaceCannon);
        // Start the game loop in real time mode at 60 fps
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        // To couple our game to the "engine" with the 'update' function. 'update' gets called every frame
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // Things are happening, but we can't see anything if we don't draw the changes
        viewport.draw();
    }
    function configureCamera(_cmpCamera, _canvas) {
        const deg2Rad = Math.PI / 180;
        const distance = 310;
        const fov = _cmpCamera.getFieldOfView();
        let height = 2 * Math.abs(distance) * Math.tan(fov * 0.5 * deg2Rad);
        let width = height * _cmpCamera.getAspect();
        /*
        let height: number = 2 * Math.abs(distance) * Math.tan(fov * 0.595 * deg2Rad);
        let length: number = height * (_canvas.height / _canvas.width);
        */
        _cmpCamera.mtxPivot.translateZ(distance);
        _cmpCamera.mtxPivot.translateY(90);
        _cmpCamera.mtxPivot.rotateY(180);
    }
})(L02_Space_Invaders_v2 || (L02_Space_Invaders_v2 = {}));
//# sourceMappingURL=Main.js.map