/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn;
    Camera = function Camera() {
    }
    fn = Camera.prototype
    return MoGL.ext(Camera, Mesh);
})();