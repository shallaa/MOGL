/**
 * Created by redcamel on 2015-05-05.
 * description
 * World는 MoGL의 기본 시작객체로 내부에 다수의 Scene을 소유할 수 있으며,
 * 실제 렌더링되는 대상임. 또한 World의 인스턴스는 rendering함수 그 자체이기도 함.
 * 메서드체이닝을 위해 대부분의 함수는 자신을 반환함.
 */
var World = (function () {
    var World, fn;
    World = function World(id) {
        this._cvs = document.getElementById(id);
        var keys = 'webgl,experimental-webgl,webkit-3d,moz-webgl'.split(','), i = keys.length
        while (i--) if (this._gl = this._cvs.getContext(keys[i])) break
        console.log(this._gl ? id + ' : MoGL 초기화 성공!' : console.log(id + ' : MoGL 초기화 실패!!'))
    },
    fn = World.prototype,
    fn._renderList = [],
    fn._sceneList = {},
    fn._render = function _render() { MoGL.isAlive(this);
        var i, k, len, tList = this._renderList
        var scene,camera,gl,children;
        var tItem, tMaterial, tProgram, tVBO, tUVBO, tIBO;
        for (i = 0, len = tList.length; i < len; i++) {
            //console.log(tList[i],'렌더')
            if (tList[i].scene._update) tList[i].scene.update()
            //console.log('카메라렌더',tList[i].sceneID,tList[i].cameraID, '실제 Scene : ',tList[i].scene)
            scene = tList[i].scene,
            camera = scene.getChild(tList[i].cameraID)
            if(camera._visible){
                gl = scene._gl,
                children = scene._children,
                //TODO 뷰포트가 아닌....이게...프레임에 어떻게 그릴껀지로 가야함..
                gl.viewport(camera._renderArea[0],camera._renderArea[1]==0 ? 0 :camera._renderArea[3]-camera._renderArea[1],camera._renderArea[2],camera._renderArea[3])
                gl.clearColor(camera._r, camera._g, camera._b, camera._a)
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                for(k in scene._glPROGRAMs){
                    tProgram = scene._glPROGRAMs[k]
                    gl.useProgram(tProgram)
                    gl.uniformMatrix4fv(tProgram.uPixelMatrix,false,camera.getProjectionMatrix())
                }
                tItem = tMaterial = tProgram = tVBO = tIBO = null
                for (k in children) {
                    tItem = children[k],
                    tVBO = scene._glVBOs[tItem._geometry._name],
                    tUVBO = scene._glUVBOs[tItem._geometry._name],
                    tIBO = scene._glIBOs[tItem._geometry._name],
                    tMaterial = tItem._material,
                    tProgram = tMaterial._textures.__indexList.length>0 ?scene._glPROGRAMs['bitmap'] :scene._glPROGRAMs['base'], // TODO 이놈은 어디서 결정하지?
                    gl.useProgram(tProgram)
                    if(tProgram==scene._glPROGRAMs['base']){
                        gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                        gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0),
                        gl.uniform3fv(tProgram.uRotate, [tItem.rotateX, tItem.rotateY, tItem.rotateZ]),
                        gl.uniform3fv(tProgram.uPosition, [tItem.x, tItem.y, tItem.z]),
                        gl.uniform3fv(tProgram.uScale, [tItem.scaleX, tItem.scaleY, tItem.scaleZ]),
                        gl.uniform3fv(tProgram.uColor, [tMaterial._r, tMaterial._g, tMaterial._b]),
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO),
                        gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0)
                    }else if(tProgram==scene._glPROGRAMs['bitmap']){
                        gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                        gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0),
                        gl.bindBuffer(gl.ARRAY_BUFFER, tUVBO),
                        gl.vertexAttribPointer(tProgram.aUV, tUVBO.stride, gl.FLOAT, false, 0, 0),
                        gl.uniform3fv(tProgram.uRotate, [tItem.rotateX, tItem.rotateY, tItem.rotateZ]),
                        gl.uniform3fv(tProgram.uPosition, [tItem.x, tItem.y, tItem.z]),
                        gl.uniform3fv(tProgram.uScale, [tItem.scaleX, tItem.scaleY, tItem.scaleZ]),
                        gl.activeTexture(gl.TEXTURE0);
                        var texture = scene._glTEXTUREs[tMaterial._textures.__indexList[0].id]
                        if(texture.loaded){
                            gl.bindTexture(gl.TEXTURE_2D, texture);
                            gl.uniform1i(tProgram.uSampler, 0);
                            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO),
                            gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0)
                        }
                    }
                }
            }
        }
    },
    fn.addRender = function addRender(sceneID, cameraID, index) { MoGL.isAlive(this);
        var uuid = sceneID + '_' + cameraID, tScene = fn._sceneList[sceneID], tList = this._renderList;
        for (var i = 0, len = tList.length; i < len; i++) if (tList[i].uuid == uuid) MoGL.error('World', 'addRender', 0)
        if(!tScene) MoGL.error('World','addRender',1)
        if(tScene) if(!tScene.getChild(cameraID)) MoGL.error('World','addRender',2)
        var temp = {
            uuid: uuid,
            sceneID: sceneID,
            cameraID: cameraID,
            scene: tScene,
            camera: tScene.getChild(cameraID)
        }
        if (index) tList[index] = temp
        else tList.push(temp)
        return this
    },
    fn.addScene = function addScene(sceneID, scene) { MoGL.isAlive(this);
        if (this._sceneList[sceneID]) MoGL.error('World', 'addScene', 0)
        if (!(scene instanceof Scene )) MoGL.error('World', 'addScene', 1)
        this._sceneList[sceneID] = scene, scene._gl = this._gl,scene._cvs = this._cvs
        return this
    },
    fn.getScene = function getScene(sceneID) { MoGL.isAlive(this);
        return this._sceneList[sceneID] ? this._sceneList[sceneID] : null
    },
    fn.removeRender = function removeRender(sceneID, cameraID) { MoGL.isAlive(this);
        var tList = this._renderList, i, len
        for (i = 0, len = tList.length; i < len; i++){
            if (tList[i] && tList[i].uuid == sceneID + '_' + cameraID) tList.splice(i, 1)
        }
        return this
    },
    fn.removeScene = function removeScene(sceneID) { MoGL.isAlive(this);
        this._sceneList[sceneID] ? 0 : MoGL.error('World', 'addScene', 0),
            this._sceneList[sceneID]._gl = this._gl,
            delete this._sceneList[sceneID]
        return this
    }
    return MoGL.ext(World, MoGL);
})();