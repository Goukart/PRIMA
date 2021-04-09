"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    const TEXTURE_PATH = "assets/";
    const squidTexture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
    const squidMaterial = new ƒ.Material("SquidMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), squidTexture));
    const crabTexture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
    const crabMaterial = new ƒ.Material("CrabMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), crabTexture));
    const octopusTexture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
    const octopusMaterial = new ƒ.Material("OctopusMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), octopusTexture));
    class Invader extends L02_Space_Invaders_v1.GameObject {
        constructor(_name, _position, _scale, _material) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, new ƒ.MeshCube("CubeMesh"), _material);
            this.texture = new ƒ.Node("InvaderTexture");
            this.scale = ƒ.Vector3.ONE();
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;
            const mesh = new ƒ.MeshSprite("SpriteMesh");
            this.applyMaterial(mesh, _material);
        }
        applyMaterial(_mesh, _material) {
            // Make texture scalable
            this.texture.addComponent(new ƒ.ComponentTransform);
            // Scale texture
            this.texture.mtxLocal.scale(this.scale);
            // Attach the mesh as a component to the node
            this.texture.addComponent(new ƒ.ComponentMesh(_mesh));
            // Create a component to attach the material via this to the node
            let cmpMaterial = new ƒ.ComponentMaterial(_material);
            // Now link the material to the node
            this.texture.addComponent(cmpMaterial);
            // Add the material to the node as a separate node
            this.addChild(this.texture);
        }
    }
    L02_Space_Invaders_v1.Invader = Invader;
    class Squid extends Invader {
        constructor(_position) {
            super("SquidInvader", _position, Squid.scale, squidMaterial);
            this.texture = new ƒ.Node("SquidInvaderTexture");
        }
    }
    Squid.scale = new ƒ.Vector3(8, 8, 1);
    L02_Space_Invaders_v1.Squid = Squid;
    class Crab extends Invader {
        constructor(_position) {
            super("CrabInvader", _position, Crab.scale, crabMaterial);
            this.texture = new ƒ.Node("CrabInvaderTexture");
        }
    }
    Crab.scale = new ƒ.Vector3(11, 8, 1);
    L02_Space_Invaders_v1.Crab = Crab;
    class Octopus extends Invader {
        constructor(_position) {
            super("OctopusInvader", _position, Octopus.scale, octopusMaterial);
            this.texture = new ƒ.Node("SquidInvaderTexture");
        }
    }
    Octopus.scale = new ƒ.Vector3(12, 8, 1);
    L02_Space_Invaders_v1.Octopus = Octopus;
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=Invader.js.map