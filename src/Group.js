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
    }
    fn = Group.prototype
    return MoGL.ext(Group, Mesh);
})();