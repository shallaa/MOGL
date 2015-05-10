/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn;
    Camera = function Camera() {
        this._geometry = new Geometry([],[])
        this._material = new Material()
        this._isCamera = 1
    }
    fn = Camera.prototype,
    fn.render = function render(scene){
        // 먼가 차일드를 루프돌면 되것군..
        //console.log('카메라렌더',arguments[1],arguments[2], '실제 Scene : ',scene)
        var gl = scene._gl
        var children = scene._children
        gl.clearColor(0,0,0,1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        var tItem, tMaterial,tProgram,tVBO,tIBO
        for(var k in children){
            tItem = children[k]
            if(!tItem._isCamera){
                tVBO = scene._VBOs[tItem._geometry]
                tIBO = scene._IBOs[tItem._geometry]
                tMaterial = tItem._material
                tProgram = scene._PROGRAMs['base']
                gl.useProgram(tProgram)
                gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                    gl.enableVertexAttribArray(tProgram.aVertexPosition);
                gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0);
                gl.uniform3fv(tProgram.uRotate,[tItem.rotateX,tItem.rotateY,tItem.rotateZ])
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO)
                gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0)
            }
        }
    }
    return MoGL.ext(Camera, Mesh);
})();