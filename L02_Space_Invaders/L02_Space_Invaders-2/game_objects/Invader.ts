namespace L02_Space_Invaders_v2 {
    import ƒ = FudgeCore;

    const QUAD_MESH: ƒ.MeshQuad = new ƒ.MeshQuad("QuadMesh");
    const TEXTURE_PATH: string = "assets/";
    const SPRITE_MESH: ƒ.Mesh = new ƒ.MeshSprite("SpriteMesh");
    const MATERIAL: ƒ.Material = new ƒ.Material(
        "InvaderMaterial",
        ƒ.ShaderTexture,
        new ƒ.CoatTextured()
    );

    export abstract class Invader extends GameObject {
        protected readonly invader: GameObject;
        protected readonly facade: ƒ.Node = new ƒ.Node("InvaderFacade");
        protected readonly scale: ƒ.Vector3 = ƒ.Vector3.ONE();


        public constructor(_name: string, _position: ƒ.Vector3, _scale: ƒ.Vector3, _coatTexture: ƒ.CoatTextured) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, QUAD_MESH, new ƒ.Material("InvaderMaterial", ƒ.ShaderTexture, _coatTexture), _scale);
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;
 
            MATERIAL.setCoat(_coatTexture);
            this.applyMaterial(SPRITE_MESH, MATERIAL);
        }
    }

    export class Squid extends Invader {
        private static readonly squidTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
        private static readonly squidCoat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Squid.squidTexture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(8, 8, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("SquidInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("SquidInvader", _position, Squid.scale, Squid.squidCoat);
        }
    }

    export class Crab extends Invader {
        private static readonly crabTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
        private static readonly crabCoat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Crab.crabTexture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(11, 8, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("CrabInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("CrabInvader", _position, Crab.scale, Crab.crabCoat);
        }
    }

    export class Octopus extends Invader {
        private static readonly octopusTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
        private static readonly octopusCoat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Octopus.octopusTexture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(12, 8, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("SquidInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("OctopusInvader", _position, Octopus.scale, Octopus.octopusCoat);
        }
    }

    export class UFO extends Invader {
        private static UfoTexture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "ufo.png");
        private static UfoCoat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), UFO.UfoTexture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(16, 7, 0);
        protected readonly facade: ƒ.Node = new ƒ.Node("UfoInvaderTexture");


        constructor(_position: ƒ.Vector3) {
            super("UfoInvader", _position, UFO.scale, UFO.UfoCoat);
            this.setPrimaryColor(ƒ.Color.CSS("RED"));
        }
    }
}