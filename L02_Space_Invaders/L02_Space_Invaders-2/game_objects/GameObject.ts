namespace L02_Space_Invaders_v2 {
    import ƒ = FudgeCore;

    export class GameObject extends ƒ.Node {
        // Define a default mesh, in this case a Quad
        private static readonly defaultMesh: ƒ.Mesh = new ƒ.MeshQuad("QuadMesh");
        // Create a default material so the mesh can be rendered and seen on canvas
        private static readonly defaultMaterial: ƒ.Material = new ƒ.Material(
            "Material",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1))
        );

        protected readonly scale: ƒ.Vector3;
        protected readonly facade: ƒ.Node = new ƒ.Node("GameObjectFacade");
        protected readonly cmpMaterial: ƒ.ComponentMaterial;

        public constructor(_name: string, _position: ƒ.Vector3, _mesh?: ƒ.Mesh, _material?: ƒ.Material, _scale?: ƒ.Vector3,) {
            super(_name);
            this.scale = _scale || ƒ.Vector3.ONE();
            this.facade.name = _name + "Facade";

            // Add component to move and scale the node
            this.addComponent(new ƒ.ComponentTransform());

            this.applyMaterial(_mesh, _material);
            this.cmpMaterial = this.facade.getComponent(ƒ.ComponentMaterial);

            this.mtxLocal.translate(_position);
        }

        protected applyMaterial(_mesh: ƒ.Mesh, _material: ƒ.Material): void {
            // Make facade scalable, independent of parent size
            this.facade.addComponent(new ƒ.ComponentTransform);
            // Scale facade
            this.facade.mtxLocal.scale(this.scale);


            // Attach the mesh as a component to the node
            this.facade.addComponent(new ƒ.ComponentMesh(_mesh || GameObject.defaultMesh));

            // Create a component to attach the material via this to the node
            // if none was provided use default or prefer '_material' over 'GameObject.defaultMaterial'
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material || GameObject.defaultMaterial);
            // Now link the material to the node
            this.facade.addComponent(cmpMaterial);

            // Add the material to the node as a separate node
            this.addChild(this.facade);
        }

        public setPrimaryColor(_color: ƒ.Color): void {
            // This component can also transform how the mesh is rendered (size, scale, position). But
            // the component holds additional information, how to render the material. Because the 
            // component links together material and node, it can tell, to render some material in a
            // different color for example. The material stays the same but the primary color of the
            // component gets multiplied with the material.
            this.cmpMaterial.clrPrimary = _color;
            // long: this.facade.getComponent(ƒ.ComponentMaterial) = _color;
        }
    }
}