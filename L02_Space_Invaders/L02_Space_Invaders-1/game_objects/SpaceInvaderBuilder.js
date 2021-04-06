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
                this.mtxLocal.translate(_position);
                this.addChild(slice);
            }
            this.addChild(new L02_Space_Invaders_v1.GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(this.width, 1, 1)));
            this.addChild(new L02_Space_Invaders_v1.GameObject("", new ƒ.Vector3(0, 0, 0), new ƒ.MeshCube("CubeMesh"), this.material, new ƒ.Vector3(1, this.height, 1)));
        }
    }
    function buildLevel(_scene, _cmpCamera, _defender) {
        let some = new L02_Space_Invaders_v1.Squid(new ƒ.Vector3(-12, 0, 0));
        let gO = new L02_Space_Invaders_v1.GameObject("SomeGameObject", new ƒ.Vector3(0, -8, 0));
        _scene.addChild(some);
        some = new L02_Space_Invaders_v1.Crab(new ƒ.Vector3(-3, 0, 0));
        _scene.addChild(some);
        some = new L02_Space_Invaders_v1.Octopus(new ƒ.Vector3(9, 0, 0));
        _scene.addChild(some);
        const sh = new Shield("Shield", new ƒ.Vector3(0, 20, 0));
        _scene.addChild(sh);
        console.log(some);
    }
    L02_Space_Invaders_v1.buildLevel = buildLevel;
})(L02_Space_Invaders_v1 || (L02_Space_Invaders_v1 = {}));
//# sourceMappingURL=SpaceInvaderBuilder.js.map