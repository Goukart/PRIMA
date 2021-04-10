namespace L02_Space_Invaders_v2 {
    import ƒ = FudgeCore;

    const MESH: ƒ.MeshQuad = new ƒ.MeshQuad("QuadMesh");
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

    const UfoTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "ufo.png");
    const UfoMaterial: ƒ.Material = new ƒ.Material(
        "UfoMaterial",
        ƒ.ShaderTexture,
        new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), UfoTexture)
    );


    export abstract class Invader extends GameObject {
        protected readonly invader: GameObject;
        protected readonly facade: ƒ.Node = new ƒ.Node("InvaderFacade");
        protected readonly scale: ƒ.Vector3 = ƒ.Vector3.ONE();


        public constructor(_name: string, _position: ƒ.Vector3, _scale: ƒ.Vector3, _material: ƒ.Material) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, MESH, _material, _scale);
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;

            const mesh: ƒ.Mesh = new ƒ.MeshSprite("SpriteMesh");
            this.applyMaterial(mesh, _material);
        }
    }

    export class Squid extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(8, 8, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("SquidInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("SquidInvader", _position, Squid.scale, squidMaterial);
        }
    }

    export class Crab extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(11, 8, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("CrabInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("CrabInvader", _position, Crab.scale, crabMaterial);
        }
    }

    export class Octopus extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(12, 8, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("SquidInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("OctopusInvader", _position, Octopus.scale, octopusMaterial);
        }
    }

    export class UFO extends Invader {
        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(16, 7, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("UfoInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("UfoInvader", _position, UFO.scale, UfoMaterial);
        }
    }
}