namespace L02_Space_Invaders_v1 {
    import ƒ = FudgeCore;

    const colors: Array<string> = new Array<string>("ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", /*"BLACK",*/ "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN");


    class Shield extends ƒ.Node {
        private readonly material: ƒ.Material = new ƒ.Material(
            "ShieldMaterial",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1))
        );

        // Total width, also number of slices
        public readonly width: number = 21;
        // Total height
        public readonly height: number = 16;


        private readonly verticalCentering: number = -2;
        private readonly horizontalCentering: number = - (this.width / 2) + 0.5;
        private readonly sliceHeights: number[] = [
            12, 13, 14, 15, 16, 14, 13,
            12, 12, 12, 12, 12, 12, 12,
            13, 14, 16, 15, 14, 13, 12
        ];
        private readonly sliceOffsetY: number[] = [
            0, 0.5, 1, 1.5, 2, 3, 3.5,
            4, 4, 4, 4, 4, 4, 4,
            3.5, 3, 2, 1.5, 1, 0.5, 0
        ];



        public constructor(_name: string, _position: ƒ.Vector3) {
            super("Shield");

            this.addComponent(new ƒ.ComponentTransform);

            for (let index = 0; index < this.width; index++) {

                const testMat: ƒ.Material = new ƒ.Material(
                    "ShieldTestMaterial",
                    ƒ.ShaderUniColor,
                    new ƒ.CoatColored(ƒ.Color.CSS(colors[8 +
                        index % 2]))
                );

                const slicePosition: ƒ.Vector3 = new ƒ.Vector3(
                    index + this.horizontalCentering,
                    this.sliceOffsetY[index] + this.verticalCentering,
                    0
                );
                const sliceScale: ƒ.Vector3 = new ƒ.Vector3(
                    1,
                    this.sliceHeights[index],
                    0
                );

                const slice: GameObject = new GameObject(
                    "Slice" + index,
                    slicePosition,
                    new ƒ.MeshCube("CubeMesh"),
                    testMat,
                    sliceScale
                );

                this.mtxLocal.translate(_position);

                this.addChild(slice);
            }


            this.addChild(new GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(this.width, 1, 1)));
            this.addChild(new GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(1, this.height, 1)));
        }
    }


    export function buildLevel(_scene: ƒ.Node, _cmpCamera: ƒ.ComponentCamera, _defender: Defender): void {
        let some: Invader = new Squid(new ƒ.Vector3(-12, 0, 0));
        let gO: GameObject = new GameObject("SomeGameObject", new ƒ.Vector3(0, -8, 0));

        _scene.addChild(some);

        some = new Crab(new ƒ.Vector3(-3, 0, 0));
        _scene.addChild(some);

        some = new Octopus(new ƒ.Vector3(9, 0, 0));
        _scene.addChild(some);

        const sh = new Shield("Shield", new ƒ.Vector3(0, 20, 0));
        _scene.addChild(sh);


        console.log(some);

    }
}