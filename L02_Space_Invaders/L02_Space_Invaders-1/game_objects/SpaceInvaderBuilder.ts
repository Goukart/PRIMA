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


                // Conversion from relative translation to absolute
                const absTranslation: ƒ.Vector3 = new ƒ.Vector3(
                    _position.x * (1 / this.width),
                    _position.y * (1 / this.height),
                    _position.z
                );
                this.mtxLocal.translate(absTranslation);

                this.addChild(slice);
            }


            this.addChild(new GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(this.width, 1, 1)));
            this.addChild(new GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(1, this.height, 1)));
        }
    }

    export class Projectile extends GameObject {
        private static readonly mesh: ƒ.MeshQuad = new ƒ.MeshQuad("QuadMesh");
        private static readonly material: ƒ.Material = new ƒ.Material(
            "ProjectileMaterial",
            ƒ.ShaderUniColor,
            new ƒ.CoatColored(ƒ.Color.CSS("WHITE"))
        );
        private static scale: ƒ.Vector3 = new ƒ.Vector3(1, 4, 0);

        constructor(_position: ƒ.Vector3) {
            super("Projectile", _position, Projectile.mesh, Projectile.material, Projectile.scale);

        }
    }


    export function buildLevel(_scene: ƒ.Node, _cmpCamera: ƒ.ComponentCamera, _cannon: Cannon): void {
        /*
        let some: Invader = new Squid(new ƒ.Vector3(-13.5, 0, 0));
        _scene.addChild(some);
        console.log(some);

        let gO: GameObject = new GameObject("SomeGameObject", new ƒ.Vector3(0, 5, 0));
        _scene.addChild(gO);
        console.log(gO);

        const sh = new Shield("Shield", new ƒ.Vector3(0, 0, 0));
        _scene.addChild(sh);
        console.log(sh);
        */


        _scene.addChild(createInvaders());

        _scene.addChild(createShields());

        for (let index = 0; index < 4; index++) {
            _scene.addChild(new Projectile(new ƒ.Vector3(index, index + 8, 0)));
        }
        
        _scene.addChild(Cannon.getInstance())

    }

    function createInvaders(): ƒ.Node {
        const rows: number = 5;
        const numberOfInvaders: number = 11;
        const numberOfSpaces: number = numberOfInvaders - 1;

        // 8 places them edge to edge, good to check alignment
        const spaceY: number = 16;
        // The actual space between them is 3 (total space from center to center is 3 + 12 (widest invader))
        const spaceX: number = 15;
        // Put them above the canon and shields 
        const offsetY: number = 45
        // Off set to the left to center them
        const offsetX: number = - ((numberOfSpaces / 2) * spaceX);


        const allInvaders: ƒ.Node = new ƒ.Node("AllInvaders");
        let invader: Invader;
        for (let row = 0; row < rows; row++) {
            for (let invaderInRow = 0; invaderInRow < numberOfInvaders; invaderInRow++) {
                switch (row) {
                    case 4:
                        // The squid must be off set to the left by half a unit to align like in the original
                        invader = new Squid(new ƒ.Vector3(invaderInRow * spaceX + offsetX - 0.5, row * spaceY + offsetY, 0));
                        break;

                    case 3:
                    case 2:
                        invader = new Crab(new ƒ.Vector3(invaderInRow * spaceX + offsetX, row * spaceY + offsetY, 0));
                        break;

                    case 1:
                    case 0:
                        invader = new Octopus(new ƒ.Vector3(invaderInRow * spaceX + offsetX, row * spaceY + offsetY, 0));
                        break;
                }
                allInvaders.addChild(invader);
            }
        }

        return allInvaders;
    }

    function createShields(): ƒ.Node {
        const shields: ƒ.Node = new ƒ.Node("Shields");
        let shield: Shield = new Shield("Shield", ƒ.Vector3.ZERO());


        const numberOfShields: number = 4;
        const numberOfSpaces: number = numberOfShields - 1;
        const spaceX: number = shield.width + 19;
        const offsetX: number = - ((numberOfSpaces / 2) * spaceX);
        const offsetY: number = 10;


        for (let index = 0; index < numberOfShields; index++) {
            const position: ƒ.Vector3 = new ƒ.Vector3(
                index * spaceX + offsetX,
                offsetY,
                0
            );

            shield = new Shield(
                "Shield_" + index,
                position
            );
            shields.addChild(shield);
        }
        console.log(shields);

        return shields;
    }
}