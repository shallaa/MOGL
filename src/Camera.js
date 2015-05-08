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
    fn = Camera.prototype
    return MoGL.ext(Camera, Mesh);
})();