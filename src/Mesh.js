/**
 * Created by redcamel on 2015-05-04.
 * description
 기하구조와 재질을 포함할 수 있는 하나의 렌더링 단위인 Mesh를 생성함.
 Mesh는 장면 내에 아핀변환에 대응하는 행렬정보를 갖음. 이에 따라 비가시객체인 Camera 등도 Mesh를 상속하게 됨.
 id를 인자로 지정하면 Scene에 addChild하는 순간 id를 바인딩하며 실패하면 등록되지 않음.
 객체를 인자로 지정하면 Scene에 addChild하는 순간 Mesh내부의 Geometry나 Material이 임의의 id로 자동등록되며, shader Id가 존재하지 않으면 예외가 발생함( addChild 참조 )
 */
var Mesh
(function () {
    var MoglMesh = function ($geometry, $material) {
        this.__UUID = this.__type + Mogl.UUID++
        this.__geometry = $geometry
        this.__material = $material
    }
    Mesh = function ($t1, $t2) { return new MoglMesh($t1, $t2) }
    var f3 = new Float32Array(3)
    var f16 = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    MoglMesh.prototype = {
        __type: 'MoglMesh',
        matrix: f16,
        parent: Mogl,
        scene: null,
        children: [],
        rotateX: 0, rotateY: 0, rotateZ: 0,
        scaleX: 0, scaleY: 0, scaleZ: 0,
        x: 0, y: 0, z: 0,
        ///////////////////////////////////////////////////
        // get
        getGeometry: function () {return typeof this.__geometry instanceof Geometry ? this.__geometry : this.parent == Mogl ? null : this.__geometry },//TODO 이렇게 되는게 맞남?
        getMaterial: function () {return typeof this.__material instanceof Material ? this.__material : this.parent == Mogl ? null : this.__material },//TODO 씬을 알고있어야하는가...
        // TODO 씬을 어케 연계시킬것인가 고민해야됨..
        getMatrix: function () {return this.matrix},//TODO
        getParent: function () {return this.parent ? this.parent : null},
        getPosition: function () {return f3[0] = this.x, f3[1] = this.y, f3[2] = this.z, f3},
        getRotate: function () {return f3[0] = this.rotateX, f3[1] = this.rotateY, f3[2] = this.rotateZ, f3},
        getScale: function () {return f3[0] = this.scaleX, f3[1] = this.scaleY, f3[2] = this.scaleZ, f3},
        ///////////////////////////////////////////////////
        // set
        setGeometry: function ($t) {},//TODO
        setMatrix: function ($t) {
            //TODO
            $t ? this.matrix = f16 : [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        },
        setMaterial: function ($t) {},//TODO
        setPosition: function ($t) {},//TODO
        setRotate: function ($t) {},//TODO
        setScale: function ($t) {}//TODO
    }
})();