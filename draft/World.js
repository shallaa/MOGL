/**
 * Created by redcamel on 2015-04-30.
 * description
 World는 MOGL의 기본객체로 내부에 다수의 Scene을 소유할 수 있으며 실제 렌더링되는 대상임.
 또한 World의 인스턴스는 rendering 함수 그 자체이기도 함.
 */


var World;
(function () {
    World = function () {
    }
    World.prototype = {
        renderList: [],
        sceneList: {},
        addRender: function ($sceneID, $cameraID, $index) {
            var temp = {
                scene: this.sceneList[$sceneID],
                camera: this.sceneList[$sceneID].cameraList[$cameraID]
            }
            $index ? this.renderList[temp] : this.renderList.push(temp)
        },
        addScene: function ($sceneID, $scene) {
            return this.sceneList[$sceneID] = $scene
        },
        getScene: function ($sceneID) {
            return this.sceneList[$sceneID]
        },
        removeRender: function ($sceneID, $cameraID) {
            var t = this.renderList, i = t.length
            while (i--) if (t[i].scene == this.sceneList[$sceneID] && t[i].camera == this.cameraList[$cameraID]) this.renderList.slice(i, 1)
        },
        removeScene: function ($sceneID) {
            delete  this.sceneList[$sceneID]
            var t = this.renderList, i = t.length
            while (i--) if (t[i].scene == this.sceneList[$sceneID]) this.renderList.slice(i, 1)
        }
    }
})();