/**
 * Created by redcamel on 2015-05-05.
 */
'use strict'
var Scene = (function () {
    var Scene, fn;
    Scene = function Scene() {
        // for JS
        this._children = {},
        this._textures = {},
        this._materials = {},
        this._geometrys = {},
        this._vertexShaders = {},
        this._fragmentShaders = {}
        // for GPU
    },
    fn = Scene.prototype,
    fn.addChild = function addChild(id, mesh) { MoGL.isAlive(this); // isAlive는 함수선언 줄에 바로 같이 씁니다.
        var k, checks;
        if (this._children[id]) MoGL.error('Scene', 'addChild', 0)
        if (!(mesh instanceof Mesh)) MoGL.error('Scene', 'addChild', 1)
        mesh._scene = this,
        mesh.setGeometry(mesh._geometry),
        mesh.setMaterial(mesh._material),
        checks = mesh._geometry._vertexShaders;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._vertexShaders[checks[k]]) MoGL.error('Scene', 'addChild', 2)
        checks = mesh._material._fragmentShaders;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._fragmentShaders[checks[k]]) MoGL.error('Scene', 'addChild', 3)
        checks = mesh._material._textures;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._textures[checks[k]]) MoGL.error('Scene', 'addChild', 4)

        this._children[id] = mesh
        return this
    },
    fn.addGeometry = function (id, geometry) { MoGL.isAlive(this);
        if (this._geometrys[id]) MoGL.error('Scene', 'addGeometry', 0)
        if (!(geometry instanceof Geometry)) MoGL.error('Scene', 'addGeometry', 1)
        var checks = geometry._vertexShaders, k;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._vertexShaders[checks[k]]) MoGL.error('Scene', 'addGeometry', 2)
        this._geometrys[id] = geometry
        return this
    },
    fn.addMaterial = function (id, material) { MoGL.isAlive(this);
        if (this._materials[id]) MoGL.error('Scene', 'addMaterial', 0)
        if (!(material instanceof Material)) MoGL.error('Scene', 'addMaterial', 1)
        var checks = material._fragmentShaders, k;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._fragmentShaders[checks[k]]) MoGL.error('Scene', 'addMaterial', 2)
        checks = material._textures;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._textures[checks[k]]) MoGL.error('Scene', 'addMaterial', 3)
        this._materials[id] = material
        return this
    },
    fn.addTexture = function addTexture(id, image/*,resizeType*/) { MoGL.isAlive(this);
        if (this._textures[id]) MoGL.error('Scene', 'addTexture', 0)
        if (checkDraft(image)) MoGL.error('Scene', 'addTexture', 1)
        function checkDraft(target) {
            console.log(target,target instanceof HTMLVideoElement)
            if(target instanceof HTMLImageElement) return 0
            if(target instanceof HTMLCanvasElement) return 0
            if(target instanceof HTMLVideoElement) return 0
            if(target instanceof ImageData) return 0
            if(target['substring'] && target.substring(0,10)=='data:image') return 0// base64문자열 - urlData형식으로 지정된 base64문자열
            // TODO 블랍은 어카지 -__;;;;;;;;;;;;;;;;;;;;;;;;실제 이미지를 포함하고 있는 Blob객체.

            return 1
        }
        this._textures[id] = image
        return this
    },
    fn.addFragmentShader = function (id, shaderStr) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this
    },
    fn.addVertexShader = function (id, shaderStr) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this
    },
    ///////////////////////////////////////////////////////////////////////////
    // Get
    fn.getChild = function getChild(id) { MoGL.isAlive(this);
        var t = this._children[id];
        return t ? t : null
    },
    fn.getGeometry = function getGeometry(id) { MoGL.isAlive(this);
        var t = this._geometrys[id];
        return t ? t : null
    },
    fn.getMaterial = function getMaterial(id) { MoGL.isAlive(this);
        var t = this._materials[id]
        return t ? t : null
    },
    fn.getTexture = function getTexture(id) { MoGL.isAlive(this);
        var t = this._textures[id]
        return t ? t : null
    },
    fn.getFragmentShader = function (id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this._fragmentShaders[id]
    },
    fn.getVertexShader = function (id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this._vertexShaders[id]
    },
    ///////////////////////////////////////////////////////////////////////////
    // Remove
    fn.removeChild = function removeChild(id) { MoGL.isAlive(this);
        return this._children[id] ? (this._children[id]._scene = null,delete this._children[id], true) : false
    },
    fn.removeGeometry = function removeGeometry(id) { MoGL.isAlive(this);
        return this._geometrys[id] ? (delete this._geometrys[id], true) : false
    },
    fn.removeMaterial = function removeMaterial(id) { MoGL.isAlive(this);
        return this._materials[id] ? (delete this._materials[id], true) : false
    },
    fn.removeTexture = function removeTexture(id) { MoGL.isAlive(this);
        return this._textures[id] ? (delete this._textures[id], true) : false
    },
    fn.removeFragmentShader = function removeFragmentShader() { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this
    },
    fn.removeVertexShader = function VertexShader() { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this
    }
    return MoGL.ext(Scene, MoGL);
})();