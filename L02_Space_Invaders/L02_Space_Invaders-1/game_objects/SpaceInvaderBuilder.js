"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    //const colors: Array<string> = new Array<string>("ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", /*"BLACK",*/ "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN");
    const MESH = new ƒ.MeshQuad("QuadMesh");
    const MATERIAL = new ƒ.Material("WhiteMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    // Constant Values
    const screenWidth = 224;
    const screenHight = 239;
    class Shield extends ƒ.Node {
        constructor(_name, _position) {
            super("Shield");
            this.material = new ƒ.Material("ShieldMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
            // also number of slices
            this.totalWidth = 21;
            this.totalHeight = 16;
            this.verticalCentering = -2;
            this.horizontalCentering = -center(this.totalWidth);
            this.sliceHeights = [
                12, 13, 14, 15, 16, 14, 13,
                12, 12, 12, 12, 12, 12, 12,
                13, 14, 16, 15, 14, 13, 12
            ];
            this.sliceOffsetY = [
                0, 0.5, 1, 1.5, 2, 3, 3.5,
                4, 4, 4, 4, 4, 4, 4,
                3.5, 3, 2, 1.5, 1, 0.5, 0
            ];
            this.addComponent(new ƒ.ComponentTransform);
            this.mtxLocal.translate(_position);
            for (let index = 0; index < this.totalWidth; index++) {
                const slicePosition = new ƒ.Vector3(index + this.horizontalCentering, this.sliceOffsetY[index] + this.verticalCentering, 0);
                const sliceScale = new ƒ.Vector3(1, this.sliceHeights[index], 0);
                const slice = new L02_Space_Invaders_v1.GameObject("Slice" + index, slicePosition, MESH, this.material, sliceScale);
                this.addChild(slice);
            }
        }
    }
    class Projectile extends L02_Space_Invaders_v1.GameObject {
        constructor(_position) {
            super("Projectile", _position, MESH, Projectile.material, Projectile.scale);
        }
    }
    Projectile.material = new ƒ.Material("ProjectileMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    Projectile.scale = new ƒ.Vector3(1, 4, 0);
    L02_Space_Invaders_v1.Projectile = Projectile;
    function buildLevel(_scene, _cmpCamera, _cannon) {
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
    L02_Space_Invaders_v1.buildLevel = buildLevel;
    function createUI() {
        const rootUI = new ƒ.Node("rootUI");
        // Lower line
        rootUI.addChild(new L02_Space_Invaders_v1.GameObject("BottomLine", new ƒ.Vector3(0, -20, 0), MESH, MATERIAL, new ƒ.Vector3(screenWidth, 1, 0)));
        // reference height // y=91, x=0 perfect center of screen
        rootUI.addChild(new L02_Space_Invaders_v1.GameObject("HightReference", new ƒ.Vector3(-110, 91, 0), MESH, MATERIAL, new ƒ.Vector3(1, screenHight, 0)));
        return rootUI;
    }
    function createInvaders() {
        const rows = 5;
        const nInvaders = 11;
        const nSpaces = nInvaders - 1;
        // 8 places them edge to edge, good to check alignment
        const spaceY = 16;
        // The actual space between them is 3 (total space from center to center is 3 + 12 (widest invader))
        const spaceX = 15;
        // Put them above the canon and shields 
        const offsetY = 88;
        // Off set to the left to center them
        const offsetX = -((nSpaces / 2) * spaceX);
        const allInvaders = new ƒ.Node("AllInvaders");
        let invader;
        for (let row = 0; row < rows; row++) {
            for (let invaderInRow = 0; invaderInRow < nInvaders; invaderInRow++) {
                switch (row) {
                    case 4:
                        // The squid must be off set to the left by half a unit to align like in the original
                        invader = new L02_Space_Invaders_v1.Squid(new ƒ.Vector3(invaderInRow * spaceX + offsetX - 0.5, row * spaceY + offsetY, 0));
                        break;
                    case 3:
                    case 2:
                        invader = new L02_Space_Invaders_v1.Crab(new ƒ.Vector3(invaderInRow * spaceX + offsetX, row * spaceY + offsetY, 0));
                        break;
                    case 1:
                    case 0:
                        invader = new L02_Space_Invaders_v1.Octopus(new ƒ.Vector3(invaderInRow * spaceX + offsetX, row * spaceY + offsetY, 0));
                        break;
                }
                allInvaders.addChild(invader);
            }
        }
        allInvaders.addChild(new L02_Space_Invaders_v1.UFO(new ƒ.Vector3(65, 175.5, 0)));
        return allInvaders;
    }
    function createShields() {
        const shields = new ƒ.Node("Shields");
        let shield = new Shield("Shield", ƒ.Vector3.ZERO());
        const nShields = 4;
        const nSpaces = nShields - 1;
        const spaceX = shield.totalWidth + 19;
        const offsetX = -((nSpaces / 2) * spaceX);
        const offsetY = 19.5;
        for (let index = 0; index < nShields; index++) {
            const position = new ƒ.Vector3(index * spaceX + offsetX, offsetY, 0);
            shield = new Shield("Shield_" + index, position);
            shields.addChild(shield);
        }
        return shields;
    }
    function center(_value) {
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
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=SpaceInvaderBuilder.js.map