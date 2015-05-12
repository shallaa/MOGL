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
        var i, len, tList = this._renderList
        for (i = 0, len = tList.length; i < len; i++) {
            //console.log(tList[i],'렌더')
            // 여기서 할일은 렌더리스트의 아이템에있는 카메라에 씬을 던져서 실제 렝더링을 시켜야함..
            if (tList[i].scene._update) tList[i].scene.update()
            tList[i].camera.render(tList[i].scene, tList[i].sceneID, tList[i].cameraID)
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
        this._sceneList[sceneID] = scene, scene._gl = this._gl
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