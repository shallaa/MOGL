/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn;
    Camera = function Camera() {
        this._geometry = new Geometry([],[])
        this._material = new Material()
    }
    fn = Camera.prototype,
    fn.render = function render(scene){
        // 먼가 차일드를 루프돌면 되것군..
        console.log('카메라렌더',arguments[1],arguments[2], '실제 Scene : ',scene)
    }
    return MoGL.ext(Camera, Mesh);
})();