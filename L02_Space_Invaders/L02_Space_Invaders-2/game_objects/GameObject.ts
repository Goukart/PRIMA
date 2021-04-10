namespace L02_Space_Invaders_v2 {
    import ƒ = FudgeCore;

    export class GameObject extends ƒ.Node {
        protected readonly scale: ƒ.Vector3;
        protected readonly facade: ƒ.Node = new ƒ.Node("GameObjectFacade");

        public constructor(_name: string, _position: ƒ.Vector3, _mesh?: ƒ.Mesh, _material?: ƒ.Material, _scale?: ƒ.Vector3,) {
            super(_name);
            this.scale = _scale || ƒ.Vector3.ONE();

            // Add component to move and scale the node
            this.addComponent(new ƒ.ComponentTransform());

            this.applyMaterial(_mesh, _material);

            this.mtxLocal.translate(_position);
        }

        protected applyMaterial(_mesh: ƒ.Mesh, _material: ƒ.Material): void {
            // Make facade scalable, independent of parent size
            this.facade.addComponent(new ƒ.ComponentTransform);
            // Scale facade
            this.facade.mtxLocal.scale(this.scale);

            // Define a default mesh, in this case a Quad
            let defaultMesh: ƒ.Mesh = new ƒ.MeshQuad("QuadMesh");

            // Attach the mesh as a component to the node
            this.facade.addComponent(new ƒ.ComponentMesh(_mesh || defaultMesh));

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
            this.facade.addComponent(cmpMaterial);

            // Scale facade repetition
            //this.facade.getComponent(ƒ.ComponentMaterial).mtxPivot.scale(this.scale.toVector2());

            // Add the material to the node as a separate node
            this.addChild(this.facade);
        }

        public translate(): void {

        }
    }
}