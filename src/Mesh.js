/**
 * Created by redcamel on 2015-05-04.
 * description
 기하구조와 재질을 포함할 수 있는 하나의 렌더링 단위인 Mesh를 생성함.
 Mesh는 장면 내에 아핀변환에 대응하는 행렬정보를 갖음. 이에 따라 비가시객체인 Camera 등도 Mesh를 상속하게 됨.
 id를 인자로 지정하면 Scene에 addChild하는 순간 id를 바인딩하며 실패하면 등록되지 않음.
 객체를 인자로 지정하면 Scene에 addChild하는 순간 Mesh내부의 Geometry나 Material이 임의의 id로 자동등록되며, shader Id가 존재하지 않으면 예외가 발생함( addChild 참조 )
 */
var Mesh = (function () {
    var Mesh, fn, f3 = new Float32Array(3);
    var SQRT = Math.sqrt, ATAN2 = Math.atan2, ASIN = Math.asin, COS = Math.cos, PIH = Math.PI * 0.5,PERPI=180 / Math.PI
    Mesh = function Mesh(geometry, material) {
        // TODO 어디까지 허용할건가..
        //console.log(geometry,material)
        if( geometry && !(typeof geometry =='string' || geometry instanceof Geometry  ) ) MoGL.error('Mesh','contructor',0)
        if( material && !(typeof material =='string' || material instanceof Material  ) ) MoGL.error('Mesh','contructor',1)
        this._geometry = geometry,
        this._material = material,
        this._scene = null,
        this._parent = null,
        this._matrix = new Matrix()
        this.rotateX = 0, this.rotateY = 0, this.rotateZ = 0,
        this.scaleX = 1, this.scaleY = 1, this.scaleZ = 1,
        this.x = 0, this.y = 0, this.z = 0
    },
    fn = Mesh.prototype,
    fn.getGeometry = function getGeometry() { MoGL.isAlive(this);
        return this._scene ? this._geometry : null
    },
    fn.getMaterial = function getMaterial() { MoGL.isAlive(this);
        return this._scene ? this._material : null
    },
    fn.getMatrix = function getMatrix() { MoGL.isAlive(this);
        //TODO
        this._matrix = new Matrix()
        var scale = this._matrix.scale(this.scaleX,this.scaleY,this.scaleZ)
        var rotate = this._matrix.rotate(this.rotateX,this.rotateY,this.rotateZ)
        var position = this._matrix.translate(this.x,this.y,this.z)
        return this._matrix =position.multiply(rotate).multiply(scale)
    },
    fn.getParent = function getParent() { MoGL.isAlive(this);
        return this._scene ? this._scene : null
    },
    fn.getPosition = function getPosition() { MoGL.isAlive(this);
        return f3[0] = this.x, f3[1] = this.y, f3[2] = this.z, f3
    },
    fn.getRotate = function getRotate() { MoGL.isAlive(this);
        return f3[0] = this.rotateX, f3[1] = this.rotateY, f3[2] = this.rotateZ, f3
    },
    fn.getScale = function getScale() { MoGL.isAlive(this);
        return f3[0] = this.scaleX, f3[1] = this.scaleY, f3[2] = this.scaleZ, f3
    },
    ///////////////////////////////////////////////////
    // set
    fn.setGeometry = function setGeometry(geometry) { MoGL.isAlive(this);
        if (!(geometry instanceof Geometry || typeof geometry == 'string')) MoGL.error('Mesh', 'setGeometry', 0)
        if (this._scene) {
            if (this._geometry = typeof geometry == 'string') this._geometry=this._scene._geometrys[geometry]
            else this._geometry = geometry
            this._geometry._name = geometry
        }
        else this._geometry = geometry
        return this
    },
    fn.setMaterial = function setMaterial(material) { MoGL.isAlive(this);
        if (!(material instanceof Material || typeof material == 'string')) MoGL.error('Mesh', 'setMaterial', 0)
        if (this._scene) {
            if (this._material = typeof material == 'string') this._material= this._scene._materials[material]
            else this._material = material
            this._material._name = material
        }
        else this._material = material
        return this
    },
    fn.setMatrix = function setMatrix(matrix) { MoGL.isAlive(this);
        var m = matrix, radianX, radianY, radianZ, scaleX, scaleY, scaleZ;
        if(m){
            if (m instanceof Matrix) {
                m = [
                    matrix.m11,matrix.m12,matrix.m13,matrix.m14,
                    matrix.m21,matrix.m22,matrix.m23,matrix.m24,
                    matrix.m31,matrix.m32,matrix.m33,matrix.m34,
                    matrix.m41,matrix.m42,matrix.m43,matrix.m44
                ]
            }
            this.x = m[12], this.y = m[13], this.z = m[14]
            //* [0],  [4],  [8],  [12]
            //* [1],  [5],  [9],  [13]
            //* [2],  [6],  [10], [14]
            //* [3],  [7],  [11], [15]
            //this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            var m11 = m[0], m12 = m[4], m13 = m[8], m21 = m[1], m22 = m[5], m23 = m[9], m31 = m[2], m32 = m[6], m33 = m[10];
            scaleX = SQRT(m11 * m11 + m21 * m21 + m31 * m31),
            scaleY = SQRT(m12 * m12 + m22 * m22 + m32 * m32),
            scaleZ = SQRT(m13 * m13 + m23 * m23 + m33 * m33),
            this.scaleX = scaleX, this.scaleY = scaleY, this.scaleZ = scaleZ
            if (0 < scaleX) m11 /= scaleX, m21 /= scaleX, m31 /= scaleX;
            var md31 = -m31;
            if (md31 <= -1) radianY = -PIH;
            else if (1 <= md31) radianY = PIH;
            else radianY = ASIN(md31);
            var cosY = COS(radianY);
            if (cosY <= 0.001) radianZ = 0, radianX = ATAN2(-m23, m22);
            else radianZ = ATAN2(m21, m11), radianX = ATAN2(m32, m33)
            this.rotateX = radianX * PERPI, this.rotateY = radianY * PERPI, this.rotateZ = radianZ * PERPI
        }else{
            this.x = 0,this.y = 0,this.z = 0
            this.rotateX = 0,this.rotateY = 0,this.rotateZ = 0
            this.scaleX = 1,this.scaleY = 1,this.scaleZ = 1
        }
        return this
    },
    fn.setPosition = function setPosition() { MoGL.isAlive(this);
        return this.x = arguments[0], this.y = arguments[1], this.z = arguments[2], this
    },
    fn.setRotate = function setRotate() { MoGL.isAlive(this);
        return this.rotateX = arguments[0], this.rotateY = arguments[1], this.rotateZ = arguments[2], this
    },
    fn.setScale = function setScale() { MoGL.isAlive(this);
        return this.scaleX = arguments[0], this.scaleY = arguments[1], this.scaleZ = arguments[2], this
    }
    return MoGL.ext(Mesh, MoGL);
})();