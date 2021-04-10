"use strict";
var L02_Space_Invaders_v2;
(function (L02_Space_Invaders_v2) {
    var ƒ = FudgeCore;
    const QUAD_MESH = new ƒ.MeshQuad("QuadMesh");
    const TEXTURE_PATH = "assets/";
    const SPRITE_MESH = new ƒ.MeshSprite("SpriteMesh");
    const MATERIAL = new ƒ.Material("InvaderMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured());
    class Invader extends L02_Space_Invaders_v2.GameObject {
        constructor(_name, _position, _scale, _coatTexture) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, QUAD_MESH, new ƒ.Material("InvaderMaterial", ƒ.ShaderTexture, _coatTexture), _scale);
            this.facade = new ƒ.Node("InvaderFacade");
            this.scale = ƒ.Vector3.ONE();
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;
            MATERIAL.setCoat(_coatTexture);
            this.applyMaterial(SPRITE_MESH, MATERIAL);
        }
    }
    L02_Space_Invaders_v2.Invader = Invader;
    class Squid extends Invader {
        constructor(_position) {
            super("SquidInvader", _position, Squid.scale, Squid.squidCoat);
            this.facade = new ƒ.Node("SquidInvaderTexture");
        }
    }
    Squid.squidTexture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
    Squid.squidCoat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Squid.squidTexture);
    Squid.scale = new ƒ.Vector3(8, 8, 0);
    L02_Space_Invaders_v2.Squid = Squid;
    class Crab extends Invader {
        constructor(_position) {
            super("CrabInvader", _position, Crab.scale, Crab.crabCoat);
            this.facade = new ƒ.Node("CrabInvaderTexture");
        }
    }
    Crab.crabTexture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
    Crab.crabCoat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Crab.crabTexture);
    Crab.scale = new ƒ.Vector3(11, 8, 0);
    L02_Space_Invaders_v2.Crab = Crab;
    class Octopus extends Invader {
        constructor(_position) {
            super("OctopusInvader", _position, Octopus.scale, Octopus.octopusCoat);
            this.facade = new ƒ.Node("SquidInvaderTexture");
        }
    }
    Octopus.octopusTexture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
    Octopus.octopusCoat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Octopus.octopusTexture);
    Octopus.scale = new ƒ.Vector3(12, 8, 0);
    L02_Space_Invaders_v2.Octopus = Octopus;
    class UFO extends Invader {
        constructor(_position) {
            super("UfoInvader", _position, UFO.scale, UFO.UfoCoat);
            this.facade = new ƒ.Node("UfoInvaderTexture");
            this.setPrimaryColor(ƒ.Color.CSS("RED"));
        }
    }
    UFO.UfoTexture = new ƒ.TextureImage(TEXTURE_PATH + "ufo.png");
    UFO.UfoCoat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), UFO.UfoTexture);
    UFO.scale = new ƒ.Vector3(16, 7, 0);
    L02_Space_Invaders_v2.UFO = UFO;
})(L02_Space_Invaders_v2 || (L02_Space_Invaders_v2 = {}));
//# sourceMappingURL=Invader.js.map