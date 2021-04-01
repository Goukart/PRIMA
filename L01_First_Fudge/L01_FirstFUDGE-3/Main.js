"use strict";
var L01_FirstFUDGE_v3;
(function (L01_FirstFUDGE_v3) {
    // 25.03.2021
    var ƒ = FudgeCore;
    // Wait for elements in html to load
    window.addEventListener("load", init);
    // Declare 'node' here to be able to use it later in 'update()'
    let node;
    function init(_event) {
        // Get the canvas (with query) from the HTML file to draw to
        const canvas = document.querySelector("canvas");
        //--------------------Render a quad plane to see something-----------------\\
        // Define a node to attach components to
        node = new ƒ.Node("QuadNode");
        // Define a mesh, in this case a quad
        let mesh = new ƒ.MeshQuad("QuadMesh");
        // Attach the mesh as a component to the node
        node.addComponent(new ƒ.ComponentMesh(mesh));
        // Create a material so the mesh can be rendered and seen on canvas
        let material = new ƒ.Material("Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        // Create a component to attach the material via this to the node
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        // Now link the material to the node
        node.addComponent(cmpMaterial);
        // Define the camera to view the scene from one perspective
        const cmpCamera = new ƒ.ComponentCamera();
        // Move and rotate camera to point at the quad
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
        // Define the viewport to bring everything together
        const viewport = new ƒ.Viewport();
        // Here we tell the viewport alle the things it needs to know
        viewport.initialize("Viewport", // The name of the object
        node, // What we want to render / the scene from the root-node (root ≙ node here)
        cmpCamera, // From which perspective/camera to view the scene from (usually the root-node)
        canvas // Where to render to, here the html canvas so the user can see it
        );
        // Draw the scene on canvas element of html
        viewport.draw();
        /////////////////////////////////////////////////////////////////////////////
        //                               The Game Loop                             //
        /////////////////////////////////////////////////////////////////////////////
        // FUDGE has a static class 'Loop',  which is the engine, that drives the game.
        // It's the so called "game loop". This essentially makes the game run and do things.
        // To start the Loop, you need to tell it in which mode to run in:
        // enum LOOP_MODE {
        //     FRAME_REQUEST = "frameRequest",
        //         > The browser tells the loop when to draw the next frame, so the browser
        //           determines when it's ready for the next frame.
        //     TIME_REAL = "timeReal",
        //         > The loop cycles every set time, like every 1/60 second or 16,666 ms
        //           when 60 fps was set as the framerate. This would run every 16,666 ms in 
        //           real time
        //     TIME_GAME = "timeGame"
        //         > Like 'TIME_REAL', but scalable to some value, to vary animation speed
        //           with individual game times for example.
        // }
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 10);
        // With this configuration the engine runs at ten beats per second but the browser
        // controls when its time for the next frame (trying to satisfy the set 10 fps)
        // To couple our game to the engine to actually run, we need to add a listener to the
        // Loop. The listener waits for the Loop to request the next frame, which then triggers
        // our 'update' function. In that function we need to handle everything, from physics
        // calculations, moving objects, animations to drawing the frame on screen.
        /**
         * This adds an event listener to Loop, requiring:
         * (Event, function)
         * 'Event' determines what to listen to and 'function', what to do/run
         *
         * Here we listen to the loop to request a new frame. When the loop requests a new frame,
         * we run the function 'update', where everything (draw frame, calculate, move, etc.) is
         * handled.
         * So on "request new frame", run update([...])
         */
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        console.log(_event);
        //
        node.mtxLocal.rotateY(1);
        // *'node' has to be global or somehow accessible in this function to be usable*
    }
})(L01_FirstFUDGE_v3 || (L01_FirstFUDGE_v3 = {}));
//# sourceMappingURL=Main.js.map