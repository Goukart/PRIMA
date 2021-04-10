"use strict";
var L02_Space_Invaders_v2;
(function (L02_Space_Invaders_v2) {
    var ƒ = FudgeCore;
    class GameObject extends ƒ.Node {
        constructor(_name, _position, _mesh, _material, _scale) {
            super(_name);
            this.facade = new ƒ.Node("GameObjectFacade");
            this.scale = _scale || ƒ.Vector3.ONE();
            this.facade.name = _name + "Facade";
            // Add component to move and scale the node
            this.addComponent(new ƒ.ComponentTransform());
            this.applyMaterial(_mesh, _material);
            this.cmpMaterial = this.facade.getComponent(ƒ.ComponentMaterial);
            this.mtxLocal.translate(_position);
        }
        applyMaterial(_mesh, _material) {
            // Make facade scalable, independent of parent size
            this.facade.addComponent(new ƒ.ComponentTransform);
            // Scale facade
            this.facade.mtxLocal.scale(this.scale);
            // Attach the mesh as a component to the node
            this.facade.addComponent(new ƒ.ComponentMesh(_mesh || GameObject.defaultMesh));
            // Create a component to attach the material via this to the node
            // if none was provided use default or prefer '_material' over 'GameObject.defaultMaterial'
            let cmpMaterial = new ƒ.ComponentMaterial(_material || GameObject.defaultMaterial);
            // Now link the material to the node
            this.facade.addComponent(cmpMaterial);
            // Add the material to the node as a separate node
            this.addChild(this.facade);
        }
        setPrimaryColor(_color) {
            // This component can also transform how the mesh is rendered (size, scale, position). But
            // the component holds additional information, how to render the material. Because the 
            // component links together material and node, it can tell, to render some material in a
            // different color for example. The material stays the same but the primary color of the
            // component gets multiplied with the material.
            this.cmpMaterial.clrPrimary = _color;
            // long: this.facade.getComponent(ƒ.ComponentMaterial) = _color;
        }
    }
    // Define a default mesh, in this case a Quad
    GameObject.defaultMesh = new ƒ.MeshQuad("QuadMesh");
    // Create a default material so the mesh can be rendered and seen on canvas
    GameObject.defaultMaterial = new ƒ.Material("Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    L02_Space_Invaders_v2.GameObject = GameObject;
})(L02_Space_Invaders_v2 || (L02_Space_Invaders_v2 = {}));
//# sourceMappingURL=GameObject.js.map