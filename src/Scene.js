/**
 * Created by redcamel on 2015-05-05.
 */
'use strict'
var Scene = (function () {
    var Scene, fn;
    Scene = function Scene() {
        this._update=0
        // for JS
        this._children = {},
            this._textures = {},
            this._materials = {},
            this._geometrys = {},
            this._vertexShaders = {},
            this._fragmentShaders = {}
        // for GPU
        this._gl = null
        this._VBOs = {}
        this._IBOs = {}
        this._PROGRAMs = {}
        this._TEXTUREs ={}
    }
    /////////////////////////////////////////////////////////////////
    function makeVBO(_this, name, data, stride) {
        var gl = _this._gl
        var buffer = _this._VBOs[name]
        if (buffer) return buffer
        buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
        buffer.name = name
        buffer.type = 'VBO'
        buffer.data = data
        buffer.stride = stride
        buffer.numItem = data.length / stride
        _this._VBOs[name] = buffer
        console.log('VBO생성', _this._VBOs[name])
        return _this._VBOs[name]
    }

    function makeIBO(_this, name, data, stride) {
        var gl = _this._gl
        var buffer = _this._IBOs[name]
        if (buffer) return buffer
        buffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW)
        buffer.name = name
        buffer.type = 'IBO'
        buffer.data = data
        buffer.stride = stride
        buffer.numItem = data.length / stride
        _this._IBOs[name] = buffer
        console.log('IBO생성', _this._IBOs[name])
        return _this._IBOs[name]
    }

    function makeProgram(_this, name) {
        var gl = _this._gl, vShader, fShader, program
        vShader = vertexShaderParser(gl, _this._vertexShaders[name]),
        fShader = fragmentShaderParser(gl,_this._fragmentShaders[name]),
        program = gl.createProgram(),
        gl.attachShader(program, vShader),
        gl.attachShader(program, fShader),
        gl.linkProgram(program),
        vShader.name = name + '_vertex', fShader.name = name + '_fragment', program.name = name
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) MoGL.error(name, ' 프로그램 쉐이더 초기화 실패!', 0)
        gl.useProgram(program)
        for (var i = 0; i < vShader.attributes.length; i++) {
            gl.enableVertexAttribArray(program[vShader.attributes[i]] = gl.getAttribLocation(program, vShader.attributes[i]))
        }
        for (var i = 0; i < vShader.uniforms.length; i++) {
            program[vShader.uniforms[i]] = gl.getUniformLocation(program, vShader.uniforms[i])
        }
        _this._PROGRAMs[name] = program
        console.log(vShader)
        console.log(fShader)
        console.log(program)
        return program
    }

    function vertexShaderParser(gl,source){
        var t0, len, i, resultStr
        var shader = gl.createShader(gl.VERTEX_SHADER)
        shader.uniforms = []
        shader.attributes = []
        resultStr = "", t0 = source.attributes, len = t0.length;
        for (i = 0; i < len; i++) {
            resultStr += 'attribute ' + t0[i] + ';\n'
            shader.attributes.push(t0[i].split(' ')[1])
        }
        t0 = source.uniforms, len = t0.length
        for (i = 0; i < len; i++) {
            resultStr += 'uniform ' + t0[i] + ';\n'
            shader.uniforms.push(t0[i].split(' ')[1])
        }
        t0 = source.varyings, len = t0.length
        for (i = 0; i < len; i++) {
            resultStr += 'varying ' + t0[i] + ';\n'
        }
        resultStr += VertexShader.baseFunction
        resultStr += 'void main(void){\n'
        resultStr += source.main + ';\n'
        resultStr += '}\n'
        console.log(resultStr)
        gl.shaderSource(shader, resultStr), gl.compileShader(shader)
        return shader

    }
    function fragmentShaderParser(gl,source){
        var resultStr = "", i,t0,len;
        var shader = gl.createShader(gl.FRAGMENT_SHADER)
        shader.uniforms = []
        if(source.precision) resultStr+='precision '+source.precision+';\n'
        else resultStr+='precision mediump float;\n'
        t0 = source.uniforms, len = t0.length
        for(i=0; i<len; i++) {
            resultStr += 'uniform '+t0[i]+';\n'
            shader.uniforms.push(t0[i].split(' ')[1])
        }
        t0=source.varyings,len = t0.length
        for(i=0; i<len; i++) {
            resultStr += 'varying '+t0[i]+';\n'
        }
        resultStr+='void main(void){\n'
        resultStr+=source.main+';\n'
        resultStr+='}\n'
        gl.shaderSource(shader, resultStr), gl.compileShader(shader)
        shader.uniforms = source.uniforms
        return shader
    }
/////////////////////////////////////////////////////////////////
    fn = Scene.prototype,
    fn.update = function update() { MoGL.isAlive(this);
        //for GPU
        for (var k in this._children) {
            var mesh = this._children[k]
            if (!this._VBOs[mesh._geometry] && mesh._geometry) {
                this._VBOs[mesh._geometry._name] = makeVBO(this, mesh._geometry._name, mesh._geometry._position, 3)
                this._IBOs[mesh._geometry._name] = makeIBO(this, mesh._geometry._name, mesh._geometry._index, 1)
            }
        }
        var checks = this._vertexShaders;
        for (k in checks) makeProgram(this, k)
        this._update = 0
    },
    fn.addChild = function addChild(id, mesh) { MoGL.isAlive(this); // isAlive는 함수선언 줄에 바로 같이 씁니다.
        var k, checks;
        if (this._children[id]) MoGL.error('Scene', 'addChild', 0)
        if (!(mesh instanceof Mesh)) MoGL.error('Scene', 'addChild', 1)
        mesh._scene = this,
        mesh.setGeometry(mesh._geometry),
        mesh.setMaterial(mesh._material), mesh._material._count++
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
        this._update=1
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
        this._materials[id]._scene = this
        return this
    },
    fn.addTexture = function addTexture(id, image/*,resizeType*/) { MoGL.isAlive(this);
        if (this._textures[id]) MoGL.error('Scene', 'addTexture', 0)
        if (checkDraft(image)) MoGL.error('Scene', 'addTexture', 1)
        function checkDraft(target) {
            if(target instanceof HTMLImageElement) return 0
            if(target instanceof HTMLCanvasElement) return 0
            if(target instanceof HTMLVideoElement) return 0
            if(target instanceof ImageData) return 0
            if(target['substring'] && target.substring(0,10)=='data:image' && target.indexOf('base64')>-1) return 0// base64문자열 - urlData형식으로 지정된 base64문자열
            // TODO 블랍은 어카지 -__;;;;;;;;;;;;;;;;;;;;;;;;실제 이미지를 포함하고 있는 Blob객체.

            return 1
        }
        this._textures[id] = image
        return this
    },
    fn.addFragmentShader = function addFragmentShader(id, shaderStr) { MoGL.isAlive(this);
        if (this._fragmentShaders[id]) MoGL.error('Scene', 'addFragmentShader', 0)
        // TODO'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 vertex shader를 등록하려할 때.
        // TODO 마일스톤0.2
        this._fragmentShaders[id] = shaderStr
        return this
    },
    fn.addVertexShader = function addVertexShader(id, shaderStr) { MoGL.isAlive(this);
        if (this._vertexShaders[id]) MoGL.error('Scene', 'addVertexShader', 0)
        // TODO'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 vertex shader를 등록하려할 때.
        // TODO 마일스톤0.2
        this._vertexShaders[id] = shaderStr
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
        return this._children[id] ? (this._children[id]._material._count--, this._children[id]._scene = null, delete this._children[id], true) : false
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