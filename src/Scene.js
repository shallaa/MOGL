/**
 * Created by redcamel on 2015-04-30.
 * description
 실제 렌더링될 구조체는 Scene별도 집결됨. 렌더링 단위인 Camera는 한 번에 하나의 Scene만 가리킬 수 있음.
 Scene은 렌더링과 관련된 Mesh, Camera, Light 등을 포함하고 이들 객체가 공유하며
 활용하는 기초 자원으로서 vertex shader, fragment shader, texture, Material, Geometry 등을 고유한 id로 등록하여 관리한다.
 */

var Scene;
(function () {
    var MoglScene = function () {}
    Scene = function () { return new MoglScene() }
    MoglScene.prototype = {
        __type: 'MoglScene',
        children: {},
        shaderList: {v: {}, f: {}},
        geometryList: {},
        materialList: {},
        textureList: {},
        ///////////////////////////////////////////////////////////////////////////
        // Add
        addChild: function ($id, $mesh) {
            try {
                if (this.children[$id]) throw 0
                if ($mesh.__type != 'MoglMesh') throw 1
                // TODO Mesh안의 Geometry에 지정된 vertex shader의 id가 존재하지 않음.
                // TODO Mesh안의 Material에 지정된 fragment shader의 id가 존재하지 않음.
            } catch ($e) {
                throw Error('Scene.addChild:' + $e + ' : ' + Mogl.errorMessage.Scene.addChild[$e])
            }
            this.children[$id] = $mesh
            return this
        },
        addFragmentShader: function ($id, $shaderStr) {
            try {
                if (this.shaderList.f[$id]) throw 0
                // TODO 'Scene.addFragmentShader:1' - MoGL 표준 인터페이스를 준수하지 않는 fragment shader를 등록하려할 때.
            } catch ($e) {
                throw Error('Scene.addFragmentShader:' + $e + ' : ' + Mogl.errorMessage.Scene.addFragmentShader[$e])
            }
            this.shaderList.f[$id] = $shaderStr
            //TODO 쉐이더 제너레이터
            return this
        },
        addVertexShader: function ($id, $shaderStr) {
            try {
                if (this.shaderList.v[$id]) throw 0
                // TODO 'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 fragment shader를 등록하려할 때.
            } catch ($e) {
                throw Error('Scene.addVertexShader:' + $e + ' : ' + Mogl.errorMessage.Scene.addVertexShader[$e])
            }
            this.shaderList.v[$id] = $shaderStr
            //TODO 쉐이더 제너레이터
            return this
        },
        addGeometry: function ($id, $geometry) {
            try {
                if (this.geometryList[$id]) throw 0
                if (!($geometry instanceof Geometry)) throw 1
                //TODO  Geometry에 선언된 vertex shader의 id가 없을 때.
            } catch ($e) {
                throw Error('Scene.addGeometry:' + $e + ' : ' + Mogl.errorMessage.Scene.addGeometry[$e])
            }
            this.geometryList[$id] = $geometry
            //TODO 지오메트리 제너레이터
            return this
        },
        addTexture: function ($id, $texture) {
            try {
                if (this.textureList[$id]) throw 0
                //TODO Param에 명시된 형식이 아닌 image를 등록하려할 때.
            } catch ($e) {
                throw Error('Scene.addTexture:' + $e + ' : ' + Mogl.errorMessage.Scene.addTexture[$e])
            }
            this.textureList[$id] = $texture
            //TODO 텍스쳐 제너레이터
            return this
        },
        addMaterial: function ($id, $material) {
            try {
                if (this.materialList[$id]) throw 0
                if (!($material instanceof Material)) throw 1
                //TODO  Material에 선언된 fragment shader의 id가 없을 때.
            } catch ($e) {
                throw Error('Scene.addMaterial:' + $e + ' : ' + Mogl.errorMessage.Scene.addMaterial[$e])
            }
            this.materialList[$id] = $material
            return this
        },
        ///////////////////////////////////////////////////////////////////////////
        // Get
        getChild: function ($id) { return this.children[$id]},
        getGeometry: function ($id) { return this.geometryList[$id]},
        getMaterial: function ($id) { return this.materialList[$id]},
        getTexture: function ($id) { return this.textureList[$id]},
        ///////////////////////////////////////////////////////////////////////////
        // Remove
        removeChild: function ($id) { return this.children[$id] ? (delete this.children[$id], 1) : 0},
        removeFragmentShader: function ($id) { return this.shaderList.f[$id] ? (delete this.shaderList.f[$id], 1) : 0},
        removeVertexShader: function ($id) { return this.shaderList.v[$id] ? (delete this.shaderList.v[$id], 1) : 0},
        removeGeometry: function ($id) { return this.geometryList[$id] ? (delete this.geometryList[$id], 1) : 0},
        removeMaterial: function ($id) { return this.materialList[$id] ? (delete this.materialList[$id], 1) : 0},
        removeTexture: function ($id) { return this.textureList[$id] ? (delete this.textureList[$id], 1) : 0}
    }

})();