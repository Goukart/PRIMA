"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    class GameObject extends ƒ.Node {
        constructor(_name, _position, _mesh, _material, _scale) {
            super(_name);
            this.facade = new ƒ.Node("GameObjectFacade");
            this.scale = _scale || ƒ.Vector3.ONE();
            //--------------------Render a quad plane to see something-----------------\\
            // To move the mesh, we need to add an additional component to the mesh-holding-node,
            // the ƒ.ComponentTransform component.
            // This way we can later move the mesh around in the 'update' function
            this.addComponent(new ƒ.ComponentTransform());
            this.applyMaterial(_mesh, _material);
            this.mtxLocal.translate(_position);
        }
        applyMaterial(_mesh, _material) {
            // Make facade scalable, independent of parent size
            this.facade.addComponent(new ƒ.ComponentTransform);
            // Scale facade
            this.facade.mtxLocal.scale(this.scale);
            // Define a default mesh, in this case a Quad
            let defaultMesh = new ƒ.MeshQuad("QuadMesh");
            // Attach the mesh as a component to the node
            this.facade.addComponent(new ƒ.ComponentMesh(_mesh || defaultMesh));
            // Create a default material so the mesh can be rendered and seen on canvas
            let defaultMaterial = new ƒ.Material("Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
            // Create a component to attach the material via this to the node
            // if none was provided use default or prefer '_material' over 'defaultMaterial'
            let cmpMaterial = new ƒ.ComponentMaterial(_material || defaultMaterial);
            // Now link the material to the node
            this.facade.addComponent(cmpMaterial);
            // Scale facade repetition
            //this.facade.getComponent(ƒ.ComponentMaterial).mtxPivot.scale(this.scale.toVector2());
            // Add the material to the node as a separate node
            this.addChild(this.facade);
        }
        translate() {
        }
    }
    L02_Space_Invaders_v1.GameObject = GameObject;
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=GameObject.js.map