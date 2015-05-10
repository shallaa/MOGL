/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn;
    var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, hex_s = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
    Camera = function Camera() {
        this._geometry = new Geometry([],[])
        this._material = new Material()
        this._isCamera = 1
        this._r = 0,
        this._g = 0,
        this._b = 0,
        this._a = 1
    }
    fn = Camera.prototype,
    fn.setBackgroundColor = function setBackgroundColor(){ MoGL.isAlive(this);
        var t0 = arguments[0], t1, ta
        if (arguments.length == 1) {
            if (t0.length > 7) ta = +t0.substr(7), t0 = t0.substr(0, 7)
            if (t0.charAt(0) == '#') {
                if (t1 = hex.exec(t0)) {
                    this._r = parseInt(t1[1], 16) / 255,
                    this._g = parseInt(t1[2], 16) / 255,
                    this._b = parseInt(t1[3], 16) / 255

                } else {
                    t1 = hex_s.exec(t0),
                    this._r = parseInt(t1[1] + t1[1], 16) / 255,
                    this._g = parseInt(t1[2] + t1[2], 16) / 255,
                    this._b = parseInt(t1[3] + t1[3], 16) / 255
                }
                this._a = ta ? ta > 1 ? 1 : ta : 1
            }
        } else {
            this._r = arguments[0],
            this._g = arguments[1],
            this._b = arguments[2],
            this._a = arguments[3] ? arguments[3] : 1
        }
        return this
    }
    fn.render = function render(scene){ MoGL.isAlive(this);
        // 먼가 차일드를 루프돌면 되것군..
        //console.log('카메라렌더',arguments[1],arguments[2], '실제 Scene : ',scene)

        var gl = scene._gl
        var children = scene._children
        gl.clearColor(this._r,this._g,this._b,this._a)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        var tItem, tMaterial,tProgram,tVBO,tIBO
        for(var k in children){
            tItem = children[k]
            if(!tItem._isCamera){
                tVBO = scene._VBOs[tItem._geometry._name]
                tIBO = scene._IBOs[tItem._geometry._name]
                tMaterial = tItem._material
                tProgram = scene._PROGRAMs['base']
                gl.useProgram(tProgram)
                gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0);
                gl.uniform3fv(tProgram.uRotate,[tItem.rotateX,tItem.rotateY,tItem.rotateZ])
                gl.uniform3fv(tProgram.uPosition,[tItem.x,tItem.y,tItem.z])
                gl.uniform3fv(tProgram.uScale,[tItem.scaleX,tItem.scaleY,tItem.scaleZ])
                gl.uniform3fv(tProgram.uColor,[tMaterial._r,tMaterial._g,tMaterial._b])
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO)
                gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0)
            }
        }
    }
    return MoGL.ext(Camera, Mesh);
})();