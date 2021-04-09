namespace L02_Space_Invaders_v1 {
    import ƒ = FudgeCore;


    const TEXTURE_PATH: string = "assets/";

    const squidTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
    const squidMaterial: ƒ.Material = new ƒ.Material(
        "SquidMaterial",
        ƒ.ShaderTexture,
        new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), squidTexture)
    );

    const crabTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
    const crabMaterial: ƒ.Material = new ƒ.Material(
        "CrabMaterial",
        ƒ.ShaderTexture,
        new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), crabTexture)
    );

    const octopusTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
    const octopusMaterial: ƒ.Material = new ƒ.Material(
        "OctopusMaterial",
        ƒ.ShaderTexture,
        new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), octopusTexture)
    );


    export abstract class Invader extends GameObject {
        protected readonly invader: GameObject;
        protected readonly facade: ƒ.Node = new ƒ.Node("InvaderFacade");
        protected readonly scale: ƒ.Vector3 = ƒ.Vector3.ONE();


        public constructor(_name: string, _position: ƒ.Vector3, _scale: ƒ.Vector3, _material: ƒ.Material) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, new ƒ.MeshCube("CubeMesh"), _material);
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;

            const mesh: ƒ.Mesh = new ƒ.MeshSprite("SpriteMesh");
            this.applyMaterial(mesh, _material);
        }

        protected applyMaterial(_mesh: ƒ.Mesh, _material: ƒ.Material): void {
            // Make texture scalable
            this.facade.addComponent(new ƒ.ComponentTransform);
            // Scale texture
            this.facade.mtxLocal.scale(this.scale);

            // Attach the mesh as a component to the node
            this.facade.addComponent(new ƒ.ComponentMesh(_mesh));
            // Create a component to attach the material via this to the node
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material);
            // Now link the material to the node
            this.facade.addComponent(cmpMaterial);

            // Add the material to the node as a separate node
            this.addChild(this.facade);
        }
    }

    export class Squid extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(8, 8, 1);
        protected readonly facade: ƒ.Node = new ƒ.Node("SquidInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("SquidInvader", _position, Squid.scale, squidMaterial);
        }
    }

    export class Crab extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(11, 8, 1);
        protected readonly facade: ƒ.Node = new ƒ.Node("CrabInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("CrabInvader", _position, Crab.scale, crabMaterial);
        }
    }

    export class Octopus extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(12, 8, 1);
        protected readonly facade: ƒ.Node = new ƒ.Node("SquidInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("OctopusInvader", _position, Octopus.scale, octopusMaterial);
        }
    }
}