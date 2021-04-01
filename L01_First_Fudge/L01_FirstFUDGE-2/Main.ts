namespace L01_FirstFUDGE_v2 {
    // 23.03.2021
    console.log("Logging something");

    import ƒ = FudgeCore;


    // Add an event listener, to wait for the html to load.
    // The canvas is in the <body> of the html, but the scrips (this) are in
    // the <head> and load before all elements (like the canvas) of the html are
    // available. So to find the canvas this method waits for the html to
    // load before executing a function.
    /**
     * Tells the window to wait for an event, in this case "load" is a known
     * event and can be passed as string, to happen before executing the function
     * "init"
     */
    window.addEventListener("load", init);

    function init(_event: Event): void {

        // Every node requires a name; handy when debugging
        let node: ƒ.Node = new ƒ.Node("L01-Node");
        console.log(node);


        // Get the canvas (with query) from the HTML file to draw to
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        console.log(canvas);





        /////////////////////////////////////////////////////////////////////////////
        //                    Render a quad plane to see something                 //
        /////////////////////////////////////////////////////////////////////////////

        // Define a mesh, in this case a quad. This gives/defines the shape
        // Effectively this is a point cloud and on its own invisible
        let mesh: ƒ.Mesh = new ƒ.MeshQuad("QuadMesh");
        // *defining mesh as a ƒ.Mesh not ƒ.MeshQuad gives more flexibility later on*
        console.log(mesh);

        // Reuse old Node
        node = new ƒ.Node("QuadNode");

        // Add the mesh as a component to the node
        // Components link resources (in this case the quad mesh) with nodes
        // This is done, so the node has a manipulatable and later viewable component
        node.addComponent(new ƒ.ComponentMesh(mesh));
        console.log(node);

        // Create a material so meshes can be rendered and seen on canvas
        // *When using multiple colors defining them into variables would be better, to avoid
        // constructing too many objects with the 'new' operator*
        // This creates a white square, in one solid color without shadows, because of the shader
        /**
         * The Material needs a name and optionally a:
         * Shader:
         *      Defines how the pixels are drawn. It receives the point clouds, materials,
         *      lights, transformations, ect. and generates pixels out of them, which are
         *      then drawn to the display.
         *      ƒ.ShaderUniColor: Renders just one color. It's simple and thats why we use
         *      it. Contours are still visible.
         * Coat:
         *      Defines the color of the material. ƒ.ShaderTexture can also use textures
         *      with multiple color.
         */
        let material: ƒ.Material = new ƒ.Material(
            "Material",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1))
        );
        // Create a component to link the material (resource) to the node
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);

        // Now link the material to the node
        node.addComponent(cmpMaterial);


        // -----------------------
        // Now if you make many such objects reusing the objects is more efficient:
        /*
        node = new ƒ.Node("Sphere");
        mesh = new ƒ.MeshSphere("SphereMesh");
        node.addComponent(new ƒ.ComponentMesh(mesh));
        material = new ƒ.Material(
            "Aqua",
            ƒ.ShaderFlat,
            // Hex is also possible: "#00ffff"
            // or HSLA(Hue, Saturation, Light, Opacity/Alpha): HSLA(180,100%,50%, 1)
            // Everything you can do in CSS is also possible here
            new ƒ.CoatColored(ƒ.Color.CSS("aqua")));
        root.addChild(node);
        */
        // -----------------------




        // Now we have the object, shape and color we want to draw, but the camera is missing
        // Define the camera as a component, which will render the scene from the perspective
        // of the node it is attached (linked) to.
        // I can be attached to the root-node (like top-down, or bird perspective), a player
        // (first person, 3rd person, etc.) or some other node. But its not a resource, so
        // it can be a standalone component, like it is here
        const cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        console.log(cmpCamera);
        /*  Here are some properties of the Camera:
            aspectRatio: 1
                > The aspect ratio between width and height of projectionspace.(Default = canvas.clientWidth / canvas.ClientHeight)
            
            backgroundEnabled: true
            clrBackground: EventTarget {r: 0, g: 0, b: 0, a: 1}
                > What color to render when nothing (no object, mesh, etc.) is visible
            
            direction: 2
                > how the field of View is measured:
                    enum FIELD_OF_VIEW {
                        HORIZONTAL = 0,
                        VERTICAL = 1,
                        DIAGONAL = 2
                    }

            fieldOfView: 45
                > Defines how wide the field of view is in degrees (default 45°)
            
            projection: "central"
                > It has typical distortions of perspective (like warping at the edges)
                    enum PROJECTION {
                        CENTRAL = "central",
                        ORTHOGRAPHIC = "orthographic",
                        DIMETRIC = "dimetric",
                        STEREO = "stereo"
                    }
        */


        // FUDGE uses the right hand coordinate system like this:
        /*
               +y
                |__ +x
               /
             +z
        */
       // Like in Math 'x' goes right and 'y' goes up, but 'z' comes toward us
       // To visualize take your right hand with your palm facing you. Now make an "L" shape and spread
       // your middle finger towards you, trying to keep 90° angles between your fingers. Your thumb is
       // 'x', your index finger is 'y' and you middle finger is 'z'.
       //
       // Now by default a quad lies on the x-y-plane facing positive 'z'. so 'z' is moving forth and back.
       //
       // Since both Camera and the quad are at origin and facing the same direction, so you cant see it.
       // to face the camera at the quad you need to move in +z and turn the camera around the y-axis,
       // which is up:
       cmpCamera.mtxPivot.translateZ(3);
       cmpCamera.mtxPivot.rotateY(180);
       /*
       The camera component has a "pivot point", which can be translated and rotated to change the camera
       perspective. To move or rotate, the camera you have to use its pivot-matrix, 'mtxPivot'.
       Other objects may use the 'mtxLocal' Matrix to accomplish the same thing, but only if that object/node
       has a transform-component attached to it.
       */



        // The last missing thing to draw to the canvas is the viewport
        // The viewport links the camera (projection of the scene or the desired perspective to draw),
        // the scene (the things to draw) and the canvas (the place to draw all that to, which is seen
        // by the user in front of the screen)
        const viewport: ƒ.Viewport = new ƒ.Viewport();
        // Here we tell the viewport alle the things it needs to know and bring together
        viewport.initialize(
            "Viewport", // The name of the object
            node,       // What we want to render / the scene from the root-node (root ≙ node here)
            cmpCamera,  // From which perspective/camera to view the scene from (usually the root-node)
            canvas      // Where to render to, here the html canvas so the user can see it
        );

        // Finally we can tell the view port to draw the current scene
        viewport.draw();
        // *now we don't need a light, because the ƒ.ShaderUniColor shader just draws everything in one
        // solid color regardless of light*


    }
}