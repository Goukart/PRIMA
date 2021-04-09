namespace L02_Space_Invaders_v1 {
    import ƒ = FudgeCore;




    export class Cannon extends GameObject {
        private static readonly instance: Cannon = new Cannon();

        private static readonly mesh: ƒ.MeshQuad = new ƒ.MeshQuad("QuadMesh");
        private static readonly material: ƒ.Material = new ƒ.Material(
            "CannonMaterial",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(ƒ.Color.CSS("GREEN"))
        );
        private static scale: ƒ.Vector3 = new ƒ.Vector3(13, 7, 0);


        private constructor() {
            super("SpaceCannon", ƒ.Vector3.ZERO(), Cannon.mesh, Cannon.material);
            


        }

        public static getInstance(): Cannon {
            return this.instance;
        }
    }
}