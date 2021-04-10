"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    class Cannon {
        constructor() {
            this.facade = new ƒ.Node("CannonFacade");
            Cannon.rootNode.addComponent(new ƒ.ComponentTransform());
            const width = 13;
            const height = 8;
            let position = new ƒ.Vector3();
            let scale = new ƒ.Vector3();
            let part;
            const partsWidth = [width, (width - 2), 3, 1];
            const partsHeight = [4, 1, 2, 1];
            let offsetY = 0;
            for (let index = 0; index < partsWidth.length; index++) {
                position = new ƒ.Vector3(0, 
                // Vertical offset is (height-1)/2, but parts are not 1 high, so its:
                // (height-1)/2 + partsHeight[0]/2 = (8-1)/2 + (4/2) = 1,5
                offsetY - 1.5, 0);
                offsetY += partsHeight[index] / 2 + 0.5; // 0,5 on top for own height
                scale = new ƒ.Vector3(partsWidth[index], partsHeight[index], 0);
                part = new L02_Space_Invaders_v1.GameObject("Part_" + index, position, Cannon.mesh, Cannon.material, scale);
                this.facade.addChild(part);
            }
            Cannon.rootNode.addChild(this.facade);
            const testMat = new ƒ.Material("CannonMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
            Cannon.rootNode.addChild(new L02_Space_Invaders_v1.GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), testMat, new ƒ.Vector3(width, 1, 1)));
            Cannon.rootNode.addChild(new L02_Space_Invaders_v1.GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), testMat, new ƒ.Vector3(1, height, 1)));
        }
        static get Instance() {
            return Cannon.instance || (Cannon.instance = new this());
        }
        get Node() {
            return Cannon.rootNode;
        }
    }
    Cannon.rootNode = new ƒ.Node("SpaceCannon");
    Cannon.mesh = new ƒ.MeshQuad("QuadMesh");
    Cannon.material = new ƒ.Material("CannonMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
    L02_Space_Invaders_v1.Cannon = Cannon;
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=Cannon.js.map