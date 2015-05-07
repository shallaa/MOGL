/**
 * Created by redcamel on 2015-05-05.
 * description
 정점배열과 인덱스 배열을 이용하여 기하구조를 정의함.
 생성자에서 지정된 버퍼 및 정보는 변경불가로 생성 이후는 읽기만 가능함.
 */
var Geometry = (function () {
    //그중에 자신의 4좌표랑 7uv랑 8rgba랑 9노말은 지오메트리거고
    var Geometry, fn, indexTable = {};
    Geometry = function Geometry(vertex, index,info) {
        var i, len, t,t2, isFloat32 = Object.prototype.toString.call(vertex) == '[object Float32Array]',
            isUint16 = Object.prototype.toString.call(index) == '[object Uint16Array]',
            isUint32 = Object.prototype.toString.call(index) == '[object Uint32Array]'
        if (!(Array.isArray(vertex) || isFloat32 )) MoGL.error('Geometry', 'constructor', 0)
        if (!(Array.isArray(index) || isUint16 || isUint32 )) MoGL.error('Geometry', 'constructor', 1)
        if (info) {
            ( vertex.length % info.length) ? MoGL.error('Geometry', 'constructor', 2) : 0;
            // 예를들어 ['y','z','u','x','r', 'v','a','b','g'] 로 info가 온경우로 상정하고 처리해보면 됨
            for (i = 0, len = info.length; i < len; i++) indexTable[info[i]] = i
            console.log(indexTable)
        }
        /////////////////////////////////////
        t = arguments[2] ? arguments[2].length : 3
        this._vertexCount = vertex.length / t,
        this._triangleCount = index.length / 3,
        this._vertexShaders = {}
        ///////////////////////////////
        //TODO vertex 판별 을 어케할지 고민
        if(arguments[2]){
            this._position = []
            this._normal = []
            this._uv = []
            this._color = []
            for (i = 0, len = vertex.length / t; i < len; i++) {
                t2 = t * i
                this._position.push(vertex[t2 + indexTable.x], vertex[t2 + indexTable.y], vertex[t2 + indexTable.z])
                this._normal.push(vertex[t2 + indexTable.normalX], vertex[t2 + indexTable.normalY], vertex[t2 + indexTable.normalZ])
                this._uv.push(vertex[t2 + indexTable.u], vertex[t2 + indexTable.v])
                this._color.push(vertex[t2 + indexTable.r], vertex[t2 + indexTable.g], vertex[t2 + indexTable.b], vertex[t2 + indexTable.a])
            }
            this._position = new Float32Array(this._position)
            this._normal = new Float32Array(this._normal)
            this._uv = new Float32Array(this._uv)
            this._color = new Float32Array(this._color)
        } else {
            this._position = isFloat32 ? vertex : new Float32Array(vertex)
        }

        this._index = isUint16 ? index : new Uint16Array(index)
        ///////////////////////////////
    },
    fn = Geometry.prototype,
    fn.addVertexShader = function addVertexShader(id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        this._vertexShaders[id] = id
        return this
    },
    fn.getVertexCount = function getVertexCount() { MoGL.isAlive(this);
        return this._vertexCount
    },
    fn.getTriangleCount = function getTriangleCount() { MoGL.isAlive(this);
        return this._triangleCount
    },
    fn.getVolume = function getVolume() { MoGL.isAlive(this);
        if(!('_volume' in this)){
            var minX = 0, minY = 0, minZ = 0,maxX = 0, maxY = 0, maxZ = 0
            var t0,t1,t2,t = this._position
            for (var i = 0, len = t.length; i < len; i++) {
                t0 = i * 3, t1 = t0 + 1, t2 = t0 + 2
                minX = t[t0] < minX ? t[t0] : minX,
                maxX = t[t0] > maxX ? t[t0] : maxX
                minY = t[t1] < minY ? t[t1] : minY
                maxY = t[t1] > maxY ? t[t1] : maxY
                minZ = t[t2] < minZ ? t[t2] : minZ
                maxZ = t[t2] > maxZ ? t[t2] : maxZ
            }
            this._volume = [maxX - minX, maxY - minY, maxZ - minZ]
        }
        return this._volume
    },
    fn.removeVertexShader = function removeVertexShader(id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return delete this._vertexShaders[id], this
    },

    Geometry = MoGL.ext(Geometry, MoGL),
    Geometry.x = 'x',Geometry.y = 'y',Geometry.z = 'z',
    Geometry.r = 'r',Geometry.g = 'g',Geometry.b = 'b',Geometry.a = 'a',
    Geometry.normalX = 'normalX',Geometry.normalY = 'normalY',Geometry.normalZ = 'normalZ',
    Geometry.u = 'u',Geometry.v = 'v'
    return Geometry
})();