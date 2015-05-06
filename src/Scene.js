/**
 * Created by redcamel on 2015-05-05.
 */
'use strict'
var Scene = (function () {
    var Scene, fn;
    Scene = function Scene() {
        this.children = {},
            this.shaderList = {v: {}, f: {}},
            this.textureList = {}, this.materialList = {},
            this.geometryList = {}, this.shaderList = {v: {}, f: {}}
    },
        fn = Scene.prototype,
        fn.addChild = function addChild($id, $target) {
            var t = 1;
            this.children[$id] ? (MoGL.error('Scene', 'addChild', 0), t = 0) : 0,
                ($target instanceof Mesh || $target instanceof Camera) ? 0 : (MoGL.error('Scene', 'addChild', 1), t = 0),
                //TODO 'Scene.addChild:2' - Mesh안의 Geometry에 지정된 vertex shader의 id가 존재하지 않음.
                //TODO 'Scene.addChild:3' - Mesh안의 Material에 지정된 fragment shader의 id가 존재하지 않음.
                t ? (
                    this.children[$id] = $target, $target._parent = this, $target._scene = this,
                        $target.setGeometry($target.__geometry),
                        $target.setMaterial($target.__material)
                ) : 0
            return this
        },
        fn.addGeometry = function ($id, $target) {
            var t = 1
            this.geometryList[$id] ? (MoGL.error('Scene', 'addGeometry', 0), t = 0) : 0, //이미 존재하는 id를 등록하려할 때.
                $target instanceof Geometry ? 0 : (MoGL.error('Scene', 'addGeometry', 1), t = 0), //Geometry 아닌 객체를 등록하려할 때.
                //TODO 'Scene.addGeometry:2' - Geometry에 선언된 vertex shader의 id가 없을 때.
                t ? this.geometryList[$id] = $target : 0
            return this
        },
        fn.addMaterial = function ($id, $target) {
            var t = 1
            this.materialList[$id] ? (MoGL.error('Scene', 'addMaterial', 0), t = 0) : 0,
                $target instanceof Material ? 0 : (MoGL.error('Scene', 'addMaterial', 1), t = 0),
                //TODO 'Scene.addMaterial:2' - Material에 선언된 fragment shader의 id가 없을 때.
                t ? this.materialList[$id] = $target : 0
            //TODO 텍스쳐 제너레이터
            return this
        },
        fn.addTexture = function addTexture($id, $target/*,resizeType*/) {
            var t = 1
            this.textureList[$id] ? (MoGL.error('Scene', 'addTexture', 0), t = 0) : 0,
                //TODO Param에 명시된 형식이 아닌 image를 등록하려할 때.
                t ? this.textureList[$id] = $target : 0
            //TODO 텍스쳐 제너레이터
            return this
        },
        fn.addFragmentShader = function () {},//TODO
        fn.addVertexShader = function ($id, $shaderStr) {
            this.shaderList.v[$id] = $shaderStr
            return this
        },//TODO
        ///////////////////////////////////////////////////////////////////////////
        // Get
        fn.getChild = function getChild($id) {
            var t = this.children[$id];
            return t ? t : null
        },
        fn.getGeometry = function getGeometry($id) {
            var t = this.geometryList[$id];
            return t ? t : null
        },
        fn.getMaterial = function getMaterial($id) {return this.materialList[$id]},
        fn.getTexture = function getTexture($id) {return this.textureList[$id]},
        fn.getFragmentShader = function () {},//TODO
        fn.getVertexShader = function ($id) {return this.shaderList.v[$id]},
        ///////////////////////////////////////////////////////////////////////////
        // Remove
        fn.removeChild = function removeChild($id) { return this.children[$id] ? (delete this.children[$id], this._parent = null, true) : false},
        fn.removeGeometry = function removeGeometry($id) { return this.geometryList[$id] ? (delete this.geometryList[$id], true) : false},
        fn.removeMaterial = function removeMaterial($id) { return this.materialList[$id] ? (delete this.materialList[$id], true) : false},
        fn.removeTexture = function removeTexture($id) { return this.textureList[$id] ? (delete this.textureList[$id], true) : false},
        fn.removeFragmentShader = function removeFragmentShader() {},//TODO
        fn.removeVertexShader = function VertexShader() {}//TODO
    return MoGL.ext(Scene, MoGL);
})();