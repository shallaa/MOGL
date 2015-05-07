/**
 * Created by redcamel on 2015-05-05.
 * description
 정점배열과 인덱스 배열을 이용하여 기하구조를 정의함.
 생성자에서 지정된 버퍼 및 정보는 변경불가로 생성 이후는 읽기만 가능함.
 */
var Geometry = (function () {
    var Geometry, fn;
    Geometry = function Geometry($vArray, $iArray/* vertexInfo*/) {
        var t = arguments[2] ? arguments[2].length : 3;
        this._vertexCount = $vArray.length / t,
        this._triCount = $iArray.length / 3,
        this._shaderIDList = {}
        //TODO $vArray 판별 을 어케할지 고민
        // get Volume
        var minX = 0, minY = 0, minZ = 0,maxX = 0, maxY = 0, maxZ = 0
        for (var i = 0, len = $vArray.length; i < len; i++) {
            t = i * 3
            minX = $vArray[t] < minX ? $vArray[t] : minX
            maxX = $vArray[t] > maxX ? $vArray[t] : maxX
            minY = $vArray[t + 1] < minY ? $vArray[t + 1] : minY
            maxY = $vArray[t + 1] > maxY ? $vArray[t + 1] : maxY
            minZ = $vArray[t + 2] < minZ ? $vArray[t + 2] : minZ
            maxZ = $vArray[t + 2] > maxZ ? $vArray[t + 2] : maxZ
        }
        this._volume = [maxX - minX, maxY - minY, maxZ - minZ]
    },
    fn = Geometry.prototype,
    fn.addVertexShader = function addVertexShader($id) {
        this._shaderIDList[$id] = $id
        return this
    },
    fn.getVertexCount = function getVertexCount() {return this._vertexCount},
    fn.getTriangleCount = function getTriangleCount() {return this._triCount},
    fn.getVolume = function getVolume() {return this._volume},
    fn.removeVertexShader = function removeVertexShader($id) {return delete this._shaderIDList[$id], this},

    Geometry = MoGL.ext(Geometry, MoGL),
    Geometry.x = 'x', Geometry.y = 'y', Geometry.z = 'z',
    Geometry.r = 'r', Geometry.g = 'g', Geometry.b = 'b', Geometry.a = 'a',
    Geometry.normalX = 'normalX', Geometry.normalY = 'normalY', Geometry.normalZ = 'normalZ',
    Geometry.u = 'u', Geometry.v = 'v'
    return Geometry
})();