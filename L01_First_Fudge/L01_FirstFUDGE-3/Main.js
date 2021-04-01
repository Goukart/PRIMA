"use strict";
var L01_FirstFUDGE_v3at10fps;
(function (L01_FirstFUDGE_v3at10fps) {
    // 25.03.2021
    var ƒ = FudgeCore;
    // Wait for elements in html to load
    window.addEventListener("load", init);
    // Declare 'node' here to be able to use it later in 'update()'
    let node;
    // Define the viewport to bring camera, scene and canvas together
    // Must also be declared here to be accessible in 'update' to draw all the frames 
    const viewport = new ƒ.Viewport();
    function init(_event) {
        // Get the canvas (with query) from the HTML file to draw to
        const canvas = document.querySelector("canvas");
        //--------------------Render a quad plane to see something-----------------\\
        // Define a node to attach components to
        node = new ƒ.Node("QuadNode");
        // To move the mesh, we need to add an additional component to the mesh-holding-node,
        // the ƒ.ComponentTransform component.
        // This way we can later move the mesh around in the 'update' function
        node.addComponent(new ƒ.ComponentTransform());
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
        //           determines when it's ready for the next frame, not the fps value.
        //     TIME_REAL = "timeReal",
        //         > The loop cycles every set time, like every 1/60 second or 16,666 ms
        //           when 60 fps was set as the framerate. This would run every 16,666 ms in 
        //           real time.
        //     TIME_GAME = "timeGame"
        //         > Like 'TIME_REAL', but scalable to some value, to vary animation speed
        //           with individual game times for example.
        // }
        /**
         * This starts the loop with these settings:
         * Loop Mode:   Sets the mode how to count
         *              Real time:       Real world time
         *              Game time:       Some scaled version of real time
         *              frame request:   Let Browser decide when to trigger
         * FPS:         Sets how many times per second (real or scaled game time) a request
         *              for a new frame is made
         *              FRAME_REQUEST runs as fast as the browser can handle, and triggers
         *              every time window.requestAnimationFrame send a request not a fixed
         *              amount of seconds like in Game/Real time with fps.
         */
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 10);
        // With this configuration the engine runs at ten "beats" per second but the browser
        // controls when its time for the next frame, when its ready, so it runs at maximum
        // fps, not 10 fps.
        // *The frame rate should also be a global constant*
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
         * So on event "request new frame", run update([...])
         */
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        // console.log(_event);
        // Move the node with the quad mesh:
        // *'node' has to be global or somehow accessible in this function to be usable*
        // Explicit way:
        // Search node for components with:         node.getComponent()
        // Access the attached transform component: node.getComponent(ƒ.ComponentTransform)
        // Now access the transformation matrix:    node.getComponent(ƒ.ComponentTransform).mtxLocal
        node.getComponent(ƒ.ComponentTransform).mtxLocal.rotateZ(1);
        // Short way:
        // This does the same as the code above but is a short cut to the 'mtxLocal' of its
        // ƒ.ComponentTransform
        // *This also only work if the node actually has an ƒ.ComponentTransform component attached*
        node.mtxLocal.rotateZ(1);
        /*
        This moves the node and all its children and components. Another way to move the mesh would be:
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(1);
        This was the node 'node' does not move, just its mesh gets translated, this could be useful,
        when you want to keep one character steady, and just want to move its head. In any case using
        nodes to translate is better, than moving meshes directly. This way nodes have a managing and
        grouping role.
        */
        // *'mtxPivot' is the same thing as 'mtxLocal'*
        // Things are happening, but we can't see anything if we don't draw the changes
        viewport.draw();
    }
})(L01_FirstFUDGE_v3at10fps || (L01_FirstFUDGE_v3at10fps = {}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                     //
//                                                                                                                                                     //
//                                                      SECOND VARIATION OF THE SAME THING                                                             //
//                                                                                                                                                     //
//                                                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var L01_FirstFUDGE_v3at60fps;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                     //
//                                                                                                                                                     //
//                                                      SECOND VARIATION OF THE SAME THING                                                             //
//                                                                                                                                                     //
//                                                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function (L01_FirstFUDGE_v3at60fps) {
    // 25.03.2021
    var ƒ = FudgeCore;
    // Wait for elements in html to load
    window.addEventListener("load", init);
    // Declare 'node' here to be able to use it later in 'update()'
    let node;
    // Define the viewport to bring camera, scene and canvas together
    // Must also be declared here to be accessible in 'update' to draw all the frames 
    const viewport = new ƒ.Viewport();
    function init(_event) {
        // Get the canvas (with query) from the HTML file to draw to
        const canvas = document.querySelector("canvas");
        //--------------------Render a quad plane to see something-----------------\\
        // Define a node to attach components to
        node = new ƒ.Node("QuadNode");
        // To move the mesh, we need to add an additional component to the mesh-holding-node,
        // the ƒ.ComponentTransform component.
        // This way we can later move the mesh around in the 'update' function
        node.addComponent(new ƒ.ComponentTransform());
        // Define a mesh, in this case a quad
        let mesh = new ƒ.MeshQuad("QuadMesh");
        // Attach the mesh as a component to the node
        node.addComponent(new ƒ.ComponentMesh(mesh));
        // Create a material so the mesh can be rendered and seen on canvas
        let material = new ƒ.Material("Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 1, 1)));
        // Create a component to attach the material via this to the node
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        // Now link the material to the node
        node.addComponent(cmpMaterial);
        // Define the camera to view the scene from one perspective
        const cmpCamera = new ƒ.ComponentCamera();
        // Move and rotate camera to point at the quad
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
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
        //           determines when it's ready for the next frame, not the fps value.
        //     TIME_REAL = "timeReal",
        //         > The loop cycles every set time, like every 1/60 second or 16,666 ms
        //           when 60 fps was set as the framerate. This would run every 16,666 ms in 
        //           real time.
        //     TIME_GAME = "timeGame"
        //         > Like 'TIME_REAL', but scalable to some value, to vary animation speed
        //           with individual game times for example.
        // }
        /**
         * This starts the loop with these settings:
         * Loop Mode:   Sets the mode how to count
         *              Real time:       Real world time
         *              Game time:       Some scaled version of real time
         *              frame request:   Let Browser decide when to trigger
         * FPS:         Sets how many times per second (real or scaled game time) a request
         *              for a new frame is made
         *              FRAME_REQUEST runs as fast as the browser can handle, and triggers
         *              every time window.requestAnimationFrame send a request not a fixed
         *              amount of seconds like in Game/Real time with fps.
         */
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        // With this configuration the engine runs at 60 "beats" per second trying to satisfy
        // the target 60 fps.
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
         * So on event "request new frame", run update([...])
         */
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
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
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(ƒ.Loop.timeFrameReal / 1000 * rotSpeed);
        /*
        Cleaner version:
        let timeSinceLastFrameInSeconds: number = ƒ.Loop.timeFrameReal / 1000 * rotSpeed;
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateZ(timeSinceLastFrameInSeconds * rotSpeed);

        Now the elapsed time can be reused without recalculating it and it's more understandable
        */
        // Things are happening, but we can't see anything if we don't draw the changes
        viewport.draw();
    }
})(L01_FirstFUDGE_v3at60fps || (L01_FirstFUDGE_v3at60fps = {}));
//# sourceMappingURL=Main.js.map