/**
 * Created by redcamel on 2015-04-30.
 * description
 실제 렌더링될 구조체는 Scene별도 집결됨. 렌더링 단위인 Camera는 한 번에 하나의 Scene만 가리킬 수 있음.
 Scene은 렌더링과 관련된 Mesh, Camera, Light 등을 포함하고 이들 객체가 공유하며
 활용하는 기초 자원으로서 vertex shader, fragment shader, texture, Material, Geometry 등을 고유한 id로 등록하여 관리한다.
 */

var Scene;
(function () {
    Scene = function Scene() { }
    Scene.prototype = {
        children: {},
        shaderList: {v: {}, f: {}},
        geometryList: {},
        materialList: {},
        textureList: {},
        ///////////////////////////////////////////////////////////////////////////
        // Add
        addChild: function addChild($id, $mesh) {
            console.log()
            if (this.children[$id]) MoGL.error(this, this.addChild, 0)
            if (!$mesh instanceof Mesh) MoGL.error(this, this.addChild, 1)
            // TODO Mesh안의 Geometry에 지정된 vertex shader의 id가 존재하지 않음.
            // TODO Mesh안의 Material에 지정된 fragment shader의 id가 존재하지 않음.
            this.children[$id] = $mesh
            return this
        },
        addFragmentShader: function addFragmentShader($id, $shaderStr) {
            if (this.shaderList.f[$id]) MoGL.error(this, this.addChild, 0)
            // TODO 'Scene.addFragmentShader:1' - MoGL 표준 인터페이스를 준수하지 않는 fragment shader를 등록하려할 때.
            this.shaderList.f[$id] = $shaderStr
            //TODO 쉐이더 제너레이터
            return this
        },
        addVertexShader: function addVertexShader($id, $shaderStr) {
            if (this.shaderList.v[$id]) MoGL.error(this, this.addChild, 0)
            // TODO 'Scene.addFragmentShader:1' - MoGL 표준 인터페이스를 준수하지 않는 fragment shader를 등록하려할 때.
            this.shaderList.v[$id] = $shaderStr
            //TODO 쉐이더 제너레이터
            return this
        },
        addGeometry: function addGeometry($id, $geometry) {
            if (this.geometryList[$id]) MoGL.error(this, this.addChild, 0)
            if (!($geometry instanceof Geometry)) MoGL.error(this, this.addChild, 1)
            this.geometryList[$id] = $geometry
            //TODO 지오메트리 제너레이터
            return this
        },
        addTexture: function addTexture($id, $texture) {
            if (this.textureList[$id]) MoGL.error(this, this.addChild, 0)
            //TODO Param에 명시된 형식이 아닌 image를 등록하려할 때.
            this.textureList[$id] = $texture
            //TODO 텍스쳐 제너레이터
            return this
        },
        addMaterial: function addMaterial($id, $material) {
            if (this.materialList[$id]) MoGL.error(this, this.addChild, 0)
            if (!($material instanceof Material)) MoGL.error(this, this.addChild, 1)
            //TODO  Material에 선언된 fragment shader의 id가 없을 때.
            this.materialList[$id] = $material
            return this
        },
        ///////////////////////////////////////////////////////////////////////////
        // Get
        getChild: function getChild($id) { return this.children[$id]},
        getGeometry: function getGeometry($id) { return this.geometryList[$id]},
        getMaterial: function getMaterial($id) { return this.materialList[$id]},
        getTexture: function getTexture($id) { return this.textureList[$id]},
        ///////////////////////////////////////////////////////////////////////////
        // Remove
        removeChild: function removeChild($id) { return this.children[$id] ? (delete this.children[$id], 1) : 0},
        removeFragmentShader: function removeFragmentShader($id) { return this.shaderList.f[$id] ? (delete this.shaderList.f[$id], 1) : 0},
        removeVertexShader: function removeVertexShader($id) { return this.shaderList.v[$id] ? (delete this.shaderList.v[$id], 1) : 0},
        removeGeometry: function removeGeometry($id) { return this.geometryList[$id] ? (delete this.geometryList[$id], 1) : 0},
        removeMaterial: function removeMaterial($id) { return this.materialList[$id] ? (delete this.materialList[$id], 1) : 0},
        removeTexture: function removeTexture($id) { return this.textureList[$id] ? (delete this.textureList[$id], 1) : 0}
    }
    Scene = MoGL.ext( Scene, MoGL );
})();