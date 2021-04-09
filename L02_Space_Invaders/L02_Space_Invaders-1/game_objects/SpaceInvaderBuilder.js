"use strict";
var L02_Space_Invaders_v1;
(function (L02_Space_Invaders_v1) {
    var ƒ = FudgeCore;
    const colors = new Array("ALICEBLUE", "ANTIQUEWHITE", "AQUA", "AQUAMARINE", "AZURE", "BEIGE", "BISQUE", /*"BLACK",*/ "BLANCHEDALMOND", "BLUE", "BLUEVIOLET", "BROWN", "BURLYWOOD", "CADETBLUE", "CHARTREUSE", "CHOCOLATE", "CORAL", "CORNFLOWERBLUE", "CORNSILK", "CRIMSON", "CYAN", "DARKBLUE", "DARKCYAN", "DARKGOLDENROD", "DARKGRAY", "DARKGREY", "DARKGREEN", "DARKKHAKI", "DARKMAGENTA", "DARKOLIVEGREEN", "DARKORANGE", "DARKORCHID", "DARKRED", "DARKSALMON", "DARKSEAGREEN", "DARKSLATEBLUE", "DARKSLATEGRAY", "DARKSLATEGREY", "DARKTURQUOISE", "DARKVIOLET", "DEEPPINK", "DEEPSKYBLUE", "DIMGRAY", "DIMGREY", "DODGERBLUE", "FIREBRICK", "FLORALWHITE", "FORESTGREEN", "FUCHSIA", "GAINSBORO", "GHOSTWHITE", "GOLD", "GOLDENROD", "GRAY", "GREY", "GREEN", "GREENYELLOW", "HONEYDEW", "HOTPINK", "INDIANRED", "INDIGO", "IVORY", "KHAKI", "LAVENDER", "LAVENDERBLUSH", "LAWNGREEN", "LEMONCHIFFON", "LIGHTBLUE", "LIGHTCORAL", "LIGHTCYAN", "LIGHTGOLDENRODYELLOW", "LIGHTGRAY", "LIGHTGREY", "LIGHTGREEN", "LIGHTPINK", "LIGHTSALMON", "LIGHTSEAGREEN", "LIGHTSKYBLUE", "LIGHTSLATEGRAY", "LIGHTSLATEGREY", "LIGHTSTEELBLUE", "LIGHTYELLOW", "LIME", "LIMEGREEN", "LINEN", "MAGENTA", "MAROON", "MEDIUMAQUAMARINE", "MEDIUMBLUE", "MEDIUMORCHID", "MEDIUMPURPLE", "MEDIUMSEAGREEN", "MEDIUMSLATEBLUE", "MEDIUMSPRINGGREEN", "MEDIUMTURQUOISE", "MEDIUMVIOLETRED", "MIDNIGHTBLUE", "MINTCREAM", "MISTYROSE", "MOCCASIN", "NAVAJOWHITE", "NAVY", "OLDLACE", "OLIVE", "OLIVEDRAB", "ORANGE", "ORANGERED", "ORCHID", "PALEGOLDENROD", "PALEGREEN", "PALETURQUOISE", "PALEVIOLETRED", "PAPAYAWHIP", "PEACHPUFF", "PERU", "PINK", "PLUM", "POWDERBLUE", "PURPLE", "REBECCAPURPLE", "RED", "ROSYBROWN", "ROYALBLUE", "SADDLEBROWN", "SALMON", "SANDYBROWN", "SEAGREEN", "SEASHELL", "SIENNA", "SILVER", "SKYBLUE", "SLATEBLUE", "SLATEGRAY", "SLATEGREY", "SNOW", "SPRINGGREEN", "STEELBLUE", "TAN", "TEAL", "THISTLE", "TOMATO", "TURQUOISE", "VIOLET", "WHEAT", "WHITE", "WHITESMOKE", "YELLOW", "YELLOWGREEN");
    class Shield extends ƒ.Node {
        constructor(_name, _position) {
            super("Shield");
            this.material = new ƒ.Material("ShieldMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
            // Total width, also number of slices
            this.width = 21;
            // Total height
            this.height = 16;
            this.verticalCentering = -2;
            this.horizontalCentering = -(this.width / 2) + 0.5;
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
            for (let index = 0; index < this.width; index++) {
                const testMat = new ƒ.Material("ShieldTestMaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS(colors[8 +
                    index % 2])));
                const slicePosition = new ƒ.Vector3(index + this.horizontalCentering, this.sliceOffsetY[index] + this.verticalCentering, 0);
                const sliceScale = new ƒ.Vector3(1, this.sliceHeights[index], 0);
                const slice = new L02_Space_Invaders_v1.GameObject("Slice" + index, slicePosition, new ƒ.MeshCube("CubeMesh"), testMat, sliceScale);
                // Conversion from relative translation to absolute
                const absTranslation = new ƒ.Vector3(_position.x * (1 / this.width), _position.y * (1 / this.height), _position.z);
                this.mtxLocal.translate(absTranslation);
                this.addChild(slice);
            }
            this.addChild(new L02_Space_Invaders_v1.GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(this.width, 1, 1)));
            this.addChild(new L02_Space_Invaders_v1.GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(1, this.height, 1)));
        }
    }
    class Projectile extends L02_Space_Invaders_v1.GameObject {
        constructor(_position) {
            super("Projectile", _position, Projectile.mesh, Projectile.material, Projectile.scale);
        }
    }
    Projectile.mesh = new ƒ.MeshQuad("QuadMesh");
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
        _scene.addChild(createInvaders());
        _scene.addChild(createShields());
        for (let index = 0; index < 4; index++) {
            _scene.addChild(new Projectile(new ƒ.Vector3(index, index + 8, 0)));
        }
        _scene.addChild(L02_Space_Invaders_v1.Cannon.getInstance());
    }
    L02_Space_Invaders_v1.buildLevel = buildLevel;
    function createInvaders() {
        const rows = 5;
        const numberOfInvaders = 11;
        const numberOfSpaces = numberOfInvaders - 1;
        // 8 places them edge to edge, good to check alignment
        const spaceY = 16;
        // The actual space between them is 3 (total space from center to center is 3 + 12 (widest invader))
        const spaceX = 15;
        // Put them above the canon and shields 
        const offsetY = 45;
        // Off set to the left to center them
        const offsetX = -((numberOfSpaces / 2) * spaceX);
        const allInvaders = new ƒ.Node("AllInvaders");
        let invader;
        for (let row = 0; row < rows; row++) {
            for (let invaderInRow = 0; invaderInRow < numberOfInvaders; invaderInRow++) {
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
        return allInvaders;
    }
    function createShields() {
        const shields = new ƒ.Node("Shields");
        let shield = new Shield("Shield", ƒ.Vector3.ZERO());
        const numberOfShields = 4;
        const numberOfSpaces = numberOfShields - 1;
        const spaceX = shield.width + 19;
        const offsetX = -((numberOfSpaces / 2) * spaceX);
        const offsetY = 10;
        for (let index = 0; index < numberOfShields; index++) {
            const position = new ƒ.Vector3(index * spaceX + offsetX, offsetY, 0);
            shield = new Shield("Shield_" + index, position);
            shields.addChild(shield);
        }
        console.log(shields);
        return shields;
    }
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=SpaceInvaderBuilder.js.map