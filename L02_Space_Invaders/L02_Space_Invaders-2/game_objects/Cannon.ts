namespace L02_Space_Invaders_v2 {
    import ƒ = FudgeCore;


    export class Cannon {
        private static instance: Cannon;
        private static readonly rootNode: ƒ.Node = new ƒ.Node("SpaceCannon");

        private static readonly mesh: ƒ.Mesh = new ƒ.MeshQuad("QuadMesh");
        private static readonly material: ƒ.Material = new ƒ.Material(
            "CannonMaterial",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(ƒ.Color.CSS("LIME"))
        );

        private static width: number = 13;
        private static height: number = 8;


        private readonly facade: ƒ.Node = new ƒ.Node("CannonFacade");


        private constructor() {
            Cannon.rootNode.addComponent(new ƒ.ComponentTransform());

            let position: ƒ.Vector3 = new ƒ.Vector3();
            let scale: ƒ.Vector3 = new ƒ.Vector3();

            let part: GameObject;
            const partsWidth: number[] = [Cannon.width, (Cannon.width - 2), 3, 1];
            const partsHeight: number[] = [4, 1, 2, 1];
            let offsetY: number = 0;
            for (let index = 0; index < partsWidth.length; index++) {
                position = new ƒ.Vector3(
                    0,
                    // Vertical offset is (height-1)/2, but parts are not 1 high, so its:
                    // (height-1)/2 + partsHeight[0]/2 = (8-1)/2 + (4/2) = 1,5
                    offsetY - 1.5,
                    0
                );
                offsetY += partsHeight[index] / 2 + 0.5; // 0,5 on top, for own height
                scale = new ƒ.Vector3(
                    partsWidth[index],
                    partsHeight[index],
                    0
                );

                part = new GameObject(
                    "Part_" + index,
                    position,
                    Cannon.mesh,
                    Cannon.material,
                    scale
                );

                this.facade.addChild(part);
            }
            Cannon.rootNode.addChild(this.facade);
        }

        public static get Instance(): Cannon {
            return Cannon.instance || (Cannon.instance = new this());
        }

        public get Node(): ƒ.Node {
            return Cannon.rootNode;
        }
    }
}