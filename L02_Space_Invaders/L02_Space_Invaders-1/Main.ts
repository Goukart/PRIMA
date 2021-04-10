namespace L02_Space_Invaders_v1 {
    // 30.03.2021
    import ƒ = FudgeCore;


    /************************************************************************************
     * Task was:
     * Build a static scene for the Space Invaders game. Just objects no functionality. 
     * 
     * Done today:
     * Creating custom class for Invader
     * 
     * Next task:
     * Restructure the code to shorten the init() method and use more classes.
     * 
     * Definitions:
     * What is 0?
     * The Origin point is center bottom, so the cannon moves on the x-axis. Other
     * components like the score or other UI elements are outside the game area.
     * Score is above the Invaders and lives are below the cannon (also in negative y)
     * 
     * What is 1?
     * The projectile is 1 wide because the resolution is so low one pixel can be one
     * and makes sense defining sized based on original width in pixel.
    ************************************************************************************/



    // Wait for elements in html to load
    window.addEventListener("load", init);


    const root: ƒ.Node = new ƒ.Node("rootNode");
    // Globally define the player character
    const spaceCannon: Cannon = Cannon.Instance;

    // Define the viewport to bring camera, scene and canvas together
    // Must also be declared here to be accessible in 'update' to draw all the frames 
    const viewport: ƒ.Viewport = new ƒ.Viewport();

    function init(_event: Event): void {
        // Get the canvas (with query) from the HTML file to draw to
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        // Define the camera to view the scene from one perspective
        const cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        // Move camera so 1px = 1 and all borders are actual borders
        configureCamera(cmpCamera);

        // Here we tell the viewport alle the things it needs to know
        viewport.initialize(
            "Viewport", // The name of the object
            root,       // What we want to render / the scene from the root-node (root ≙ node here)
            cmpCamera,  // From which perspective/camera to view the scene from (usually the root-node)
            canvas      // Where to render to, here the html canvas so the user can see it
        );

        
        // Build the Level
        buildLevel(root, cmpCamera, spaceCannon);


        // Start the game loop in real time mode at 60 fps
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        // To couple our game to the "engine" with the 'update' function. 'update' gets called every frame
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    }

    function update(_event: Event): void {
        // Things are happening, but we can't see anything if we don't draw the changes
        viewport.draw();
    }


    function configureCamera(_cmpCamera: ƒ.ComponentCamera): void {
        const distance = 310;

        _cmpCamera.mtxPivot.translateZ(distance);
        _cmpCamera.mtxPivot.translateY(90);
        _cmpCamera.mtxPivot.rotateY(180);
    }
}