/**
 * Created by redcamel on 2015-05-05.
 */
var Material = (function () {
    var Material, fn;
    Material = function Material() {
        this._textures = {}
    }
    fn = Material.prototype
    return MoGL.ext(Material, MoGL);
})();