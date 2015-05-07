/**
 * Created by redcamel on 2015-05-07.
 * description
 다른 Mesh를 포함할 수 있는 가상의 부모를 생성함.
 일단 Mesh가 Group에 포함되면 좌표계는 Group내의 지역좌표계로 작동함.
 Group을 또다른 Group을 포함할 수 있음.
 실제 구현에서 1단계부모는 parentBuffer에서 관리되지만
 2단계부터는 cpu연산을 기반으로 병합되므로 주의할 것.
 param 없음
 */
var Group = (function () {
    var Group, fn;
    Group = function Group() {
        this._children = {}
    },
    fn = Group.prototype,
    fn.addChild = function addChild(id, mesh) {
        if(this._children[id]) MoGL.error('Group','addChild',0)
        if(!(mesh instanceof Mesh)) MoGL.error('Group','addChild',1)
        //TODO 음 이건 아래에 해야되지않나...
        //TODO 'Group.addChild:2' - Mesh안의 Geometry에 지정된 vertex shader의 id가 존재하지 않음.
        //TODO 'Group.addChild:3' - Mesh안의 Material에 지정된 fragment shader의 id가 존재하지 않음.
        //TODO 'Group.addChild:4' - Mesh안의 Material에 지정된 texture의 id가 존재하지 않음.
        this._children[id] = mesh
        return this
    },
    fn.getChild = function getChild(id) {
        var t = this._children[id];
        return t ? t : null
    },
    fn.removeChild = function removeChild(id) {
        return this._children[id] ? (delete this._children[id], true) : false
    }
    return MoGL.ext(Group, MoGL);
})();