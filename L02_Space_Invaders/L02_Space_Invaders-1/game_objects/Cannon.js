"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    class Cannon extends L02_Space_Invaders_v1.GameObject {
        constructor() {
            super("SpaceCannon", ƒ.Vector3.ZERO(), Cannon.mesh, Cannon.material);
        }
        static getInstance() {
            return this.instance;
        }
    }
    Cannon.instance = new Cannon();
    Cannon.mesh = new ƒ.MeshQuad("QuadMesh");
    Cannon.material = new ƒ.Material("CannonMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
    Cannon.scale = new ƒ.Vector3(13, 7, 0);
    L02_Space_Invaders_v1.Cannon = Cannon;
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=Cannon.js.map