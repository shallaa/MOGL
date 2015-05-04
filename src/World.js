/**
 * Created by redcamel on 2015-04-30.
 * description
 World는 MoGL의 기본 시작객체로 내부에 다수의 Scene을 소유할 수 있으며,
 실제 렌더링되는 대상임. 또한 World의 인스턴스는 rendering함수 그 자체이기도 함.
 */


var World;
(function () {
    World = function World() {
    }
    World = MoGL.ext(World, MoGL);
})();
(function () {
    //var MoGLWorld = function(){this.__UUID = 'MoGLWorld'+ MoGL.UUID++}
    //World = function () { return new MoGLWorld() }
    //MoGLWorld.prototype = {
    //    renderList: [],sceneList: {},
    //    addRender: function ($sceneID, $cameraID, $index) {
    //        var temp = {
    //            scene: this.sceneList[$sceneID],
    //            camera: this.sceneList[$sceneID].cameraList[$cameraID]
    //        }
    //        $index ? this.renderList[temp] : this.renderList.push(temp)
    //        return this
    //    },
    //    addScene: function ($sceneID, $scene) {
    //        try { if(this.sceneList[$sceneID]) throw $sceneID+"값으로 이미 등록된 id가 존재합니다."}
    //        catch(err) { throw Error(err)}
    //        return $scene.id = $sceneID,this.sceneList[$sceneID] = $scene
    //    },
    //    getScene: function ($sceneID) {
    //        return this.sceneList[$sceneID]
    //    },
    //    removeRender: function ($sceneID, $cameraID) {
    //        var t = this.renderList, i = t.length
    //        while (i--) if (t[i].scene == this.sceneList[$sceneID] && t[i].camera == this.cameraList[$cameraID]) this.renderList.slice(i, 1)
    //    },
    //    removeScene: function ($sceneID) {
    //        delete  this.sceneList[$sceneID]
    //        var t = this.renderList, i = t.length
    //        while (i--) if (t[i].scene == this.sceneList[$sceneID]) this.renderList.slice(i, 1)
    //    }
    //}
})();