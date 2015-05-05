/**
 * Created by redcamel on 2015-05-04.
 * description
 기하구조와 재질을 포함할 수 있는 하나의 렌더링 단위인 Mesh를 생성함.
 Mesh는 장면 내에 아핀변환에 대응하는 행렬정보를 갖음. 이에 따라 비가시객체인 Camera 등도 Mesh를 상속하게 됨.
 id를 인자로 지정하면 Scene에 addChild하는 순간 id를 바인딩하며 실패하면 등록되지 않음.
 객체를 인자로 지정하면 Scene에 addChild하는 순간 Mesh내부의 Geometry나 Material이 임의의 id로 자동등록되며, shader Id가 존재하지 않으면 예외가 발생함( addChild 참조 )
 */
var Mesh = (function () {
    var Mesh, fn, f3 = new Float32Array(3);
    Mesh = function Mesh($geometry, $material) {
        this.__geometry = $geometry
        this.__material = $material

    },
        Mesh.prototype = {
            matrix: Matrix(),
            parent: null,
            children: [],
            rotateX: 0, rotateY: 0, rotateZ: 0,
            scaleX: 1, scaleY: 1, scaleZ: 1,
            x: 0, y: 0, z: 0
        },
        fn = Mesh.prototype,
        fn.getGeometry = function getGeometry() {return typeof this.__geometry instanceof Geometry ? this.__geometry : this.parent ? this.__geometry : null},//TODO 이렇게 되는게 맞남?
        fn.getMaterial = function getMaterial() {return typeof this.__material instanceof Material ? this.__material : this.parent ? this.__material : null },//TODO 씬을 알고있어야하는가...
        // TODO 씬을 어케 연계시킬것인가 고민해야됨..
        fn.getMatrix = function getMatrix() {return this.matrix},//TODO
        fn.getParent = function getParent() {return this.parent ? this.parent : null},
        fn.getPosition = function getPosition() {return f3[0] = this.x, f3[1] = this.y, f3[2] = this.z, f3},
        fn.getRotate = function getRotate() {return f3[0] = this.rotateX, f3[1] = this.rotateY, f3[2] = this.rotateZ, f3},
        fn.getScale = function getScale() {return f3[0] = this.scaleX, f3[1] = this.scaleY, f3[2] = this.scaleZ, f3},
        ///////////////////////////////////////////////////
        // set
        fn.setGeometry = function setGeometry($t) { return this},//TODO
        fn.setMatrix = function setMatrix($t) {
            var t = this.matrix.data
            if ($t) t[0] = $t[0], t[1] = $t[1], t[2] = $t[2], t[3] = $t[3], t[4] = $t[4], t[5] = $t[5], t[6] = $t[6], t[7] = $t[7], t[8] = $t[8], t[9] = $t[9], t[10] = $t[10], t[11] = $t[11], t[12] = $t[12], t[13] = $t[13], t[14] = $t[14], t[15] = $t[15]
            else if ($t instanceof Matrix) t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
            else this.matrix.identity()
            return this
        },
        fn.setMaterial = function setMaterial($t) {},//TODO
        fn.setPosition = function setPosition() {return this.x = arguments[0], this.y = arguments[1], this.z = arguments[2], this},
        fn.setRotate = function setRotate() {return this.rotateX = arguments[0], this.rotateY = arguments[1], this.rotateZ = arguments[2], this},
        fn.setScale = function setScale() {return this.scaleX = arguments[0], this.scaleY = arguments[1], this.scaleZ = arguments[2], this}
    return MoGL.ext(Mesh, MoGL);
    ;
})();