namespace L02_Space_Invaders_v1 {
    import ƒ = FudgeCore;

    export class GameObject extends ƒ.Node {
        protected readonly scale: ƒ.Vector3;
        protected readonly texture: ƒ.Node = new ƒ.Node("GameObjectTexture");

        public constructor(_name: string, _position: ƒ.Vector3, _mesh?: ƒ.Mesh, _material?: ƒ.Material, _scale?: ƒ.Vector3,) {
            super(_name);
            this.scale = _scale || ƒ.Vector3.ONE();

            //--------------------Render a quad plane to see something-----------------\\

            // To move the mesh, we need to add an additional component to the mesh-holding-node,
            // the ƒ.ComponentTransform component.
            // This way we can later move the mesh around in the 'update' function
            this.addComponent(new ƒ.ComponentTransform());

            if(_material){
                this.applyMaterial(_mesh, _material);
            }

            this.mtxLocal.scale(this.scale);

            // Conversion from relative translation to absolute
            const absTranslation: ƒ.Vector3 = new ƒ.Vector3(
                _position.x * (this.scale.x == 0 ? 0 : 1 / this.scale.x),
                _position.y * (this.scale.y == 0 ? 0 : 1 / this.scale.y),
                _position.z * (this.scale.z == 0 ? 0 : 1 / this.scale.z)
            );

            this.mtxLocal.translate(absTranslation);
        }

        protected applyMaterial(_mesh: ƒ.Mesh, _material: ƒ.Material): void {
            // Define a default mesh, in this case a Cube
            let defaultMesh: ƒ.Mesh = new ƒ.MeshCube("CubeMesh");

            // Attach the mesh as a component to the node
            this.texture.addComponent(new ƒ.ComponentMesh(_mesh || defaultMesh));

            // Create a default material so the mesh can be rendered and seen on canvas
            let defaultMaterial: ƒ.Material = new ƒ.Material(
                "Material",
                ƒ.ShaderUniColor,
                new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1))
            );

            // Create a component to attach the material via this to the node
            // if none was provided use default or prefer '_material' over 'defaultMaterial'
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material || defaultMaterial);

            // Now link the material to the node
            this.texture.addComponent(cmpMaterial);

            // Scale texture repetition
            //this.texture.getComponent(ƒ.ComponentMaterial).mtxPivot.scale(this.scale.toVector2());

            // Add the material to the node as a separate node
            this.addChild(this.texture);
        }

        public translate(): void {

        }

    }
}