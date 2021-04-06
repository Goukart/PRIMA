"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    class GameObject extends ƒ.Node {
        constructor(_name, _position, _mesh, _material, _scale) {
            super(_name);
            this.texture = new ƒ.Node("GameObjectTexture");
            this.scale = _scale || ƒ.Vector3.ONE();
            //--------------------Render a quad plane to see something-----------------\\
            // To move the mesh, we need to add an additional component to the mesh-holding-node,
            // the ƒ.ComponentTransform component.
            // This way we can later move the mesh around in the 'update' function
            this.addComponent(new ƒ.ComponentTransform());
            if (_material) {
                this.applyMaterial(_mesh, _material);
            }
            this.mtxLocal.scale(this.scale);
            // Conversion from relative translation to absolute
            const absTranslation = new ƒ.Vector3(_position.x * (this.scale.x == 0 ? 0 : 1 / this.scale.x), _position.y * (this.scale.y == 0 ? 0 : 1 / this.scale.y), _position.z * (this.scale.z == 0 ? 0 : 1 / this.scale.z));
            this.mtxLocal.translate(absTranslation);
        }
        applyMaterial(_mesh, _material) {
            // Define a default mesh, in this case a Cube
            let defaultMesh = new ƒ.MeshCube("CubeMesh");
            // Attach the mesh as a component to the node
            this.texture.addComponent(new ƒ.ComponentMesh(_mesh || defaultMesh));
            // Create a default material so the mesh can be rendered and seen on canvas
            let defaultMaterial = new ƒ.Material("Material", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
            // Create a component to attach the material via this to the node
            // if none was provided use default or prefer '_material' over 'defaultMaterial'
            let cmpMaterial = new ƒ.ComponentMaterial(_material || defaultMaterial);
            // Now link the material to the node
            this.texture.addComponent(cmpMaterial);
            // Scale texture repetition
            //this.texture.getComponent(ƒ.ComponentMaterial).mtxPivot.scale(this.scale.toVector2());
            // Add the material to the node as a separate node
            this.addChild(this.texture);
        }
        translate() {
        }
    }
    L02_Space_Invaders_v1.GameObject = GameObject;
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=GameObject.js.map