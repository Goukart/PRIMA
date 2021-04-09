"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    // 30.03.2021
    var ƒ = FudgeCore;
    /************************************************************************************
     * Task was:
     * Build a static scene for the Space Invaders game. Just objects no functionality.
     *
     * Done today:
     *
     *
     * Definitions:
     * What is 0?
     *
     * What is 1?
     * The projectile is 1 wide because
     * The Origin point is center bottom, because
     * Barricade b * l: 22wide * 16high (pixel, is one projectile 1 px wide?, if not correct this)
    ************************************************************************************/
    /**
     * Game object most basic properties and it is a Node
     *
     * Invader -> MotherShip;Different types? (or just different skin?)
     *
     * Player, custom object not a node singleton.
     *
     * Barricade
     */
    // Wait for elements in html to load
    window.addEventListener("load", init);
    // Declare 'node' here to be able to use it later in 'update()'
    let node;
    const root = new ƒ.Node("rootNode");
    // Define the viewport to bring camera, scene and canvas together
    // Must also be declared here to be accessible in 'update' to draw all the frames 
    const viewport = new ƒ.Viewport();
    function init(_event) {
        // Get the canvas (with query) from the HTML file to draw to
        const canvas = document.querySelector("canvas");
        /*
        //--------------------Render a quad plane to see something-----------------\\
        // Define a node to attach components to
        node = new ƒ.Node("QuadNode");

        // To move the mesh, we need to add an additional component to the mesh-holding-node,
        // the ƒ.ComponentTransform component.
        // This way we can later move the mesh around in the 'update' function
        node.addComponent(new ƒ.ComponentTransform());

        // Define a mesh, in this case a quad
        let mesh: ƒ.Mesh = new ƒ.MeshQuad("QuadMesh");
        // Attach the mesh as a component to the node
        node.addComponent(new ƒ.ComponentMesh(mesh));

        // Create a material so the mesh can be rendered and seen on canvas
        let material: ƒ.Material = new ƒ.Material(
            "Material",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(new ƒ.Color(0, 1, 1, 1))
        );
        // Create a component to attach the material via this to the node
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // Now link the material to the node
        node.addComponent(cmpMaterial);
        */
        // Define the camera to view the scene from one perspective
        const cmpCamera = new ƒ.ComponentCamera();
        // Move and rotate camera to point at the quad
        // to test each thing:
        //cmpCamera.mtxPivot.translateZ(40);
        cmpCamera.mtxPivot.translateZ(200);
        cmpCamera.mtxPivot.translateY(50);
        cmpCamera.mtxPivot.rotateY(180);
        // Here we tell the viewport alle the things it needs to know
        viewport.initialize("Viewport", // The name of the object
        root, // What we want to render / the scene from the root-node (root ≙ node here)
        cmpCamera, // From which perspective/camera to view the scene from (usually the root-node)
        canvas // Where to render to, here the html canvas so the user can see it
        );
        // Build the Level
        L02_Space_Invaders_v1.buildLevel(root, cmpCamera, L02_Space_Invaders_v1.Cannon.getInstance());
        // Start the game loop in real time mode at 60 fps
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        // To couple our game to the engine with the 'update' function. 'update' gets called every frame
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        viewport.draw();
    }
    function update(_event) {
        // Move the node with the quad mesh:
        // *'node' has to be global or somehow accessible in this function to be usable*
        // Rotate the Quad around z-axis
        // *This also only work if the node actually has an ƒ.ComponentTransform component attached*
        /*node.mtxLocal.rotateZ(10);*/
        // This alone spins quite fast, if we don't want to make speed dependent on how fast the
        // the game runs we need to calculate a bit.
        // If we want to turn the quad 90° per second, regardless of framerate, we need to do some
        // things:
        // First we define the target rotation/movement per second
        const rotSpeed = 90;
        // *Ideally this would be defined somewhere else, because we don't need to redefine it every frame*
        // Because [time * speed = distance], we simply calculate the distance it should have moved and
        // move it by that value.
        // To get the time elapsed since last cycle/call/trigger, we use ƒ.Loop.timeFrameReal, since
        // we started the loop in real time mode, we also should call that time. But the time we get
        // is ms and would result in a 90° rotation very ms. To get the seconds we divide by 1000
        // 100ms = 0,1 s -> 100ms / 1000 => time in s
        //node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(ƒ.Loop.timeFrameReal / 1000 * rotSpeed);
        /*
        Cleaner version:
        let timeSinceLastFrameInSeconds: number = ƒ.Loop.timeFrameReal / 1000 * rotSpeed;
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(timeSinceLastFrameInSeconds * rotSpeed);

        Now the elapsed time can be reused without recalculating it and it's more understandable
        */
        // Things are happening, but we can't see anything if we don't draw the changes
        //viewport.draw();
    }
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=Main.js.map