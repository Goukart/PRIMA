"use strict";
var L02_Space_Invaders_v2;
(function (L02_Space_Invaders_v2) {
    var ƒ = FudgeCore;
    const MESH = new ƒ.MeshQuad("QuadMesh");
    const TEXTURE_PATH = "assets/";
    const squidTexture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
    const squidMaterial = new ƒ.Material("SquidMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), squidTexture));
    const crabTexture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
    const crabMaterial = new ƒ.Material("CrabMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), crabTexture));
    const octopusTexture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
    const octopusMaterial = new ƒ.Material("OctopusMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), octopusTexture));
    const UfoTexture = new ƒ.TextureImage(TEXTURE_PATH + "ufo.png");
    const UfoMaterial = new ƒ.Material("UfoMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), UfoTexture));
    class Invader extends L02_Space_Invaders_v2.GameObject {
        constructor(_name, _position, _scale, _material) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, MESH, _material, _scale);
            this.facade = new ƒ.Node("InvaderFacade");
            this.scale = ƒ.Vector3.ONE();
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;
            const mesh = new ƒ.MeshSprite("SpriteMesh");
            this.applyMaterial(mesh, _material);
        }
    }
    L02_Space_Invaders_v2.Invader = Invader;
    class Squid extends Invader {
        constructor(_position) {
            super("SquidInvader", _position, Squid.scale, squidMaterial);
            this.facade = new ƒ.Node("SquidInvaderTexture");
        }
    }
    Squid.scale = new ƒ.Vector3(8, 8, 0);
    L02_Space_Invaders_v2.Squid = Squid;
    class Crab extends Invader {
        constructor(_position) {
            super("CrabInvader", _position, Crab.scale, crabMaterial);
            this.facade = new ƒ.Node("CrabInvaderTexture");
        }
    }
    Crab.scale = new ƒ.Vector3(11, 8, 0);
    L02_Space_Invaders_v2.Crab = Crab;
    class Octopus extends Invader {
        constructor(_position) {
            super("OctopusInvader", _position, Octopus.scale, octopusMaterial);
            this.facade = new ƒ.Node("SquidInvaderTexture");
        }
    }
    Octopus.scale = new ƒ.Vector3(12, 8, 0);
    L02_Space_Invaders_v2.Octopus = Octopus;
    class UFO extends Invader {
        constructor(_position) {
            super("UfoInvader", _position, UFO.scale, UfoMaterial);
            this.facade = new ƒ.Node("UfoInvaderTexture");
        }
    }
    UFO.scale = new ƒ.Vector3(16, 7, 0);
    L02_Space_Invaders_v2.UFO = UFO;
})(L02_Space_Invaders_v2 || (L02_Space_Invaders_v2 = {}));
//# sourceMappingURL=Invader.js.map