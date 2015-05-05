/**
 * Created by redcamel on 2015-05-05.
 * description
 정점배열과 인덱스 배열을 이용하여 기하구조를 정의함.
 생성자에서 지정된 버퍼 및 정보는 변경불가로 생성 이후는 읽기만 가능함.
 */
var Geometry = (function () {
    var Geometry, fn;
    Geometry = function Geometry($vArray, $iArray/* vertexInfo*/) {
        var t = arguments[2] ? arguments[2].length : 3
        this._vertexCount = $vArray.length / t
        this._triCount = $iArray.length / 3
        this._shaderID = null

        //TODO $vArray 판별 을 어케할지 고민

        // get Volume
        var minX = 0, minY = 0, minZ = 0
        var maxX = 0, maxY = 0, maxZ = 0
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
        fn.X = 'x',
        fn.Y = 'y',
        fn.Z = 'z',
        fn.R = 'r',
        fn.G = 'g',
        fn.B = 'b',
        fn.A = 'a',
        fn.NORMAL_X = 'normalX',
        fn.NORMAL_Y = 'normalY',
        fn.NORMAL_Z = 'normalZ',
        fn.U = 'u',
        fn.V = 'v',
        fn.addVertxShader = function addVertxShader($id) {
            // TODO addVertxShader 구현
            //Mesh를 통해 최종적으로 포함될 Scene에 등록된 shader를 사용함.
            //Scene에 직접 등록되는 경우는 id를 addGeometry 시점에 평가함.
            //Mesh에서 직접 생성하여 삽입하는 경우는 addChild시점에 평가함.
            //이미 직간접적으로 Scene에 포함된 경우는 메서드호출시점에 평가함.

            return this._shaderID = $id, this
        },
        fn.getVertexCount = function getVertexCount() {return this._vertexCount},
        fn.getTriangleCount = function getTriangleCount() {return this._triCount},
        fn.getVolume = function getVolume() {return this._volume},
        fn.removeVertexShader = function removeVertexShader() {return this._shaderID = null, this}
    return MoGL.ext(Geometry, MoGL);
})();