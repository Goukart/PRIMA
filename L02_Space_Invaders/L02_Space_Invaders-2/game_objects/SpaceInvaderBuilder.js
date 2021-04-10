"use strict";
var L02_Space_Invaders_v2;
(function (L02_Space_Invaders_v2) {
    var ƒ = FudgeCore;
    //const colors: Array<string> = new Array<string>("ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", /*"BLACK",*/ "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN");
    // Constant global values
    const TEXTURE_PATH = "assets/";
    const QUAD_MESH = new ƒ.MeshQuad("QuadMesh");
    const SPRITE_MESH = new ƒ.MeshSprite("SpriteMesh");
    const MATERIAL = new ƒ.Material("WhiteMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    const INVADER_MATERIAL = new ƒ.Material("InvaderMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured());
    const SCREEN_WIDTH = 224;
    const SCREEN_HIGHT = 239;
    class Invader extends L02_Space_Invaders_v2.GameObject {
        constructor(_name, _position, _scale, _coatTexture) {
            // Since we don't want the Invader node to scale, we don't provide a value in the constructor
            super(_name, _position, QUAD_MESH, new ƒ.Material("InvaderMaterial", ƒ.ShaderTexture, _coatTexture), _scale);
            this.facade = new ƒ.Node("InvaderFacade");
            this.scale = ƒ.Vector3.ONE();
            // But we do want to define the scale variable to scale the texture and hit box
            this.scale = _scale;
            INVADER_MATERIAL.setCoat(_coatTexture);
            this.applyMaterial(SPRITE_MESH, INVADER_MATERIAL);
        }
    }
    class Squid extends Invader {
        constructor(_position) {
            super("SquidInvader", _position, Squid.scale, Squid.Coat);
        }
    }
    Squid.Texture = new ƒ.TextureImage(TEXTURE_PATH + "squid.png");
    Squid.Coat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Squid.Texture);
    Squid.scale = new ƒ.Vector3(8, 8, 0);
    class Crab extends Invader {
        constructor(_position) {
            super("CrabInvader", _position, Crab.scale, Crab.Coat);
        }
    }
    Crab.Texture = new ƒ.TextureImage(TEXTURE_PATH + "crab.png");
    Crab.Coat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Crab.Texture);
    Crab.scale = new ƒ.Vector3(11, 8, 0);
    class Octopus extends Invader {
        constructor(_position) {
            super("OctopusInvader", _position, Octopus.scale, Octopus.Coat);
        }
    }
    Octopus.Texture = new ƒ.TextureImage(TEXTURE_PATH + "octopus.png");
    Octopus.Coat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), Octopus.Texture);
    Octopus.scale = new ƒ.Vector3(12, 8, 0);
    class UFO extends Invader {
        constructor(_position) {
            super("UfoInvader", _position, UFO.scale, UFO.Coat);
            this.setPrimaryColor(ƒ.Color.CSS("RED"));
        }
    }
    UFO.Texture = new ƒ.TextureImage(TEXTURE_PATH + "ufo.png");
    UFO.Coat = new ƒ.CoatTextured(ƒ.Color.CSS("WHITE"), UFO.Texture);
    UFO.scale = new ƒ.Vector3(16, 7, 0);
    class Shield extends ƒ.Node {
        constructor(_name, _position) {
            super("Shield");
            this.totalWidth = 21; // also number of slices
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
                const slice = new L02_Space_Invaders_v2.GameObject("Slice" + index, slicePosition, QUAD_MESH, MATERIAL, sliceScale);
                slice.setPrimaryColor(ƒ.Color.CSS("LIME"));
                this.addChild(slice);
            }
        }
    }
    class Projectile extends L02_Space_Invaders_v2.GameObject {
        constructor(_position) {
            super("Projectile", _position, QUAD_MESH, MATERIAL, Projectile.scale);
        }
    }
    Projectile.scale = new ƒ.Vector3(1, 4, 0);
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
    L02_Space_Invaders_v2.buildLevel = buildLevel;
    function createUI() {
        const rootUI = new ƒ.Node("rootUI");
        // Lower line
        rootUI.addChild(new L02_Space_Invaders_v2.GameObject("BottomLine", new ƒ.Vector3(0, -20, 0), QUAD_MESH, MATERIAL, new ƒ.Vector3(SCREEN_WIDTH, 1, 0)));
        // reference height // y=91, x=0 perfect center of screen
        rootUI.addChild(new L02_Space_Invaders_v2.GameObject("HightReference", new ƒ.Vector3(-110, 91, 0), QUAD_MESH, MATERIAL, new ƒ.Vector3(1, SCREEN_HIGHT, 0)));
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
})(L02_Space_Invaders_v2 || (L02_Space_Invaders_v2 = {}));
//# sourceMappingURL=SpaceInvaderBuilder.js.map