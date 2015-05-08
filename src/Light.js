/**
 * Created by redcamel on 2015-05-08.
 */
var Light = (function () {
    var Light, fn;
    Light = function Light() {
    }
    fn = Light.prototype
    return MoGL.ext(Light, Mesh);
})();