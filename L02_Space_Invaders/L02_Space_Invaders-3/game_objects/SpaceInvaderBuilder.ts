namespace L02_Space_Invaders_v3 {
    import ƒ = FudgeCore;

    //const colors: Array<string> = new Array<string>("ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", /*"BLACK",*/ "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN");

    // Constant global values
    const TEXTURE_PATH: string = "assets/";
    const QUAD_MESH: ƒ.MeshQuad = new ƒ.MeshQuad("QuadMesh");
    const SPRITE_MESH: ƒ.Mesh = new ƒ.MeshSprite("SpriteMesh");
    const MATERIAL: ƒ.Material = new ƒ.Material(
        "WhiteMaterial",
        ƒ.ShaderUniColor,
        new ƒ.CoatColored(ƒ.Color.CSS("WHITE"))
    );
    const SCREEN_WIDTH: number = 224;
    const SCREEN_HIGHT: number = 239;


    abstract class Invader extends GameObject {
        protected readonly facade: ƒ.Node = new ƒ.Node("InvaderFacade");
        protected readonly scale: ƒ.Vector3 = ƒ.Vector3.ONE();


        public constructor(_name: string, _position: ƒ.Vector3, _scale: ƒ.Vector3, _coatTexture: ƒ.CoatTextured) {
            super(_name, _position, SPRITE_MESH, new ƒ.Material("InvaderMaterial", ƒ.ShaderTexture, _coatTexture), _scale);
            this.facade.name = _name + "Facade";
        }
    }

    class Squid extends Invader {
        private static readonly Texture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
        private static readonly Coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Squid.Texture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(8, 8, 0);

        constructor(_position: ƒ.Vector3) {
            super("SquidInvader", _position, Squid.scale, Squid.Coat);
        }
    }

    class Crab extends Invader {
        private static readonly Texture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
        private static readonly Coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Crab.Texture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(11, 8, 0);

        constructor(_position: ƒ.Vector3) {
            super("CrabInvader", _position, Crab.scale, Crab.Coat);
        }
    }

    class Octopus extends Invader {
        private static readonly Texture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
        private static readonly Coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Octopus.Texture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(12, 8, 0);

        constructor(_position: ƒ.Vector3) {
            super("OctopusInvader", _position, Octopus.scale, Octopus.Coat);
        }
    }

    class UFO extends Invader {
        private static readonly Texture: ƒ.Texture = new ƒ.TextureImage(TEXTURE_PATH + "ufo.png");
        private static readonly Coat: ƒ.CoatTextured = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), UFO.Texture);

        protected static readonly scale: ƒ.Vector3 = new ƒ.Vector3(16, 7, 0);

        constructor(_position: ƒ.Vector3) {
            super("UfoInvader", _position, UFO.scale, UFO.Coat);
            this.setPrimaryColor(ƒ.Color.CSS("RED"));
        }
    }


    class Shield extends ƒ.Node {
        public readonly totalWidth: number = 21; // also number of slices
        public readonly totalHeight: number = 16;


        private readonly verticalCentering: number = -2;
        private readonly horizontalCentering: number = - center(this.totalWidth);
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

            this.mtxLocal.translate(_position);

            for (let index = 0; index < this.totalWidth; index++) {

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
                    QUAD_MESH,
                    MATERIAL,
                    sliceScale
                );
                slice.setPrimaryColor(ƒ.Color.CSS("LIME"));
                this.addChild(slice);
            }
        }
    }

    class Projectile extends GameObject {
        private static scale: ƒ.Vector3 = new ƒ.Vector3(1, 4, 0);

        constructor(_position: ƒ.Vector3) {
            super("Projectile", _position, QUAD_MESH, MATERIAL, Projectile.scale);
            
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

        _scene.addChild(createUI());

        _scene.addChild(createInvaders());

        _scene.addChild(createShields());

        _scene.addChild(_cannon.Node);

        _scene.addChild(new Projectile(new ƒ.Vector3(0, 22, 0)));
        _scene.addChild(new Projectile(new ƒ.Vector3(30, 35, 0)));

    }

    function createUI(): ƒ.Node {
        const rootUI: ƒ.Node = new ƒ.Node("rootUI");

        // Lower line
        rootUI.addChild(new GameObject("BottomLine", new ƒ.Vector3(0, -20, 0), QUAD_MESH, MATERIAL, new ƒ.Vector3(SCREEN_WIDTH, 1, 0)));

        // reference height // y=91, x=0 perfect center of screen
        rootUI.addChild(new GameObject("HightReference", new ƒ.Vector3(-110, 91, 0), QUAD_MESH, MATERIAL, new ƒ.Vector3(1, SCREEN_HIGHT, 0)));

        return rootUI;
    }

    function createInvaders(): ƒ.Node {
        const rows: number = 5;
        const nInvaders: number = 11;
        const nSpaces: number = nInvaders - 1;

        // 8 places them edge to edge, good to check alignment
        const spaceY: number = 16;
        // The actual space between them is 3 (total space from center to center is 3 + 12 (widest invader))
        const spaceX: number = 15;
        // Put them above the canon and shields 
        const offsetY: number = 88;
        // Off set to the left to center them
        const offsetX: number = - ((nSpaces / 2) * spaceX);


        const allInvaders: ƒ.Node = new ƒ.Node("AllInvaders");
        let invader: Invader;
        for (let row = 0; row < rows; row++) {
            for (let invaderInRow = 0; invaderInRow < nInvaders; invaderInRow++) {
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

        allInvaders.addChild(new UFO(new ƒ.Vector3(65, 175.5, 0)));

        return allInvaders;
    }

    function createShields(): ƒ.Node {
        const shields: ƒ.Node = new ƒ.Node("Shields");
        let shield: Shield = new Shield("Shield", ƒ.Vector3.ZERO());


        const nShields: number = 4;
        const nSpaces: number = nShields - 1;
        const spaceX: number = shield.totalWidth + 19;
        const offsetX: number = - ((nSpaces / 2) * spaceX);
        const offsetY: number = 19.5;


        for (let index = 0; index < nShields; index++) {
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

        return shields;
    }

    function center(_value: number) {
        // To find the offset you need to center something, you need to divide by the number of
        // objects besides the first one:
        /**  ____  ____  ____  ____  ____ 
         *  | 1  || 2  || 3  || 4  || 5  |
         *  |____||____||____||____||____|
         *    |<-1->|<-2->|<-3->|<-4->|
         *    |           |
         *    |<--offset->|<-The center of the row is here = (n-1) / 2
         *    |
         *  This is the origin, so x = 0 is in the center of the first object
         * 
         * Because the origin is in the center of the first object, there are only n-1 objects,
         * that need to be offset, so the middle object aligns with x=0.
         * 
         * 
         *   ____  ____  ____  ____  ____ 
         *  | 1  || 2  || 3  || 4  || 5  |
         *  |____||____||____||____||____|
         *  |<-1->|<-2->|<-3->|<-4->|<-5->|
         *  |              |
         *  |<---offset--->|<-The center of the row is here = n / 2
         *  |
         *  If the origin where  here so the very left side of an object, there is no extra
         *  offset, just to align the middle object with x=0, because n/2 is already the center
         *  of the middle object.
         */
        return (_value - 1) / 2;
    }
}