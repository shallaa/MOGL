var MoGL = (function(){
    var isProtoChain, isFactory, isSuperChain, uuid, counter, totalCount, MoGL, fn;

    //내부용 상수
    isFactory = {factory:1},//팩토리 함수용 식별상수
        isSuperChain = {superChain:1},//생성자체인용 상수
        isProtoChain = {isProtoChain:1},//프로토타입상속체인을 위한 상수

        //인스턴스 카운트 시스템
        uuid = 0,//모든 인스턴스는 고유한 uuid를 갖게 됨.
        totalCount = 0, //생성된 인스턴스의 갯수를 관리함
        counter = {}, //클래스별로 관리

        MoGL = function MoGL(){
            if( arguments[0] === isProtoChain ) return;
            Object.defineProperty( this, 'uuid', {value:uuid++} );
            Object.defineProperty( this, 'isAlive', {value:true, writable:true} );
            counter[this.constructor.uuid]++;
            totalCount++;
        },
        fn = MoGL.prototype,

        //파괴자
        fn.destroy = function destroy(){
            var key;
            for( key in this ) if( this.hasOwnProperty(key) ) this[key] = null;
            this.isAlive = false;
            counter[this.constructor.uuid]--;
            totalCount--;
        },
        Object.seal(fn);
    //인스턴스의 갯수를 알아냄
    MoGL.count = function count( cls ){
        if( typeof cls == 'function' ){
            return counter[cls.uuid];
        }else{
            return totalCount;
        }
    },
        //표준 error처리
        MoGL.error = function error( cls, method, id ){
            throw new Error( cls + '.' + method + ':' + id );
        },
        //isAlive확인
        MoGL.isAlive = function isAlive(instance){
            if( !instance.isAlive ) throw new Error( 'Destroyed Object:' + instance );
        };
    //parent클래스를 상속하는 자식클래스를 만들어냄.
    MoGL.ext = function ext( child, parent ){
        var cls, oldProto, newProto, key;

        //부모검사
        if( parent !== MoGL && !( 'uuid' in parent ) ) MoGL.error( 'MoGL', 'ext', 0 );

        //생성자클래스
        cls = function(){
            var arg, arg0 = arguments[0];
            if( arg0 === isProtoChain ) return;
            if( arg0 === isSuperChain ){
                parent.apply( this, arguments[1] );
                child.apply( this, arguments[1] );
            }else if( this instanceof cls ){
                if( arg0 === isFactory ){
                    arg = arguments[1];
                }else{
                    arg = arguments;
                }
                parent.call( this, isSuperChain, arg );
                child.apply( this, arg );
                Object.seal(this);
                return this;
            }else{
                return cls.call( Object.create( cls.prototype), isFactory, arguments );
            }
        };

        //uuid 및 인스턴스카운터 초기화
        Object.defineProperty( cls, 'uuid', {value:uuid++} );
        if( !( cls.uuid in counter ) ) counter[cls.uuid] = 0;

        //parent와 프로토타입체인생성
        newProto = new parent(isProtoChain);
        //기존 child의 프로토타입속성을 복사
        oldProto = child.prototype;
        for( key in oldProto ) if( oldProto.hasOwnProperty(key) ) newProto[key] = oldProto[key];

        //새롭게 프로토타입을 정의함
        newProto.constructor = cls;
        cls.prototype = newProto;
        Object.freeze(cls),
            Object.seal(newProto);
        return cls;
    },
        Object.seal(MoGL);
    return MoGL;
})();

/**
 * Created by redcamel on 2015-05-07.
 */
var Vertex = {
    x: 'x', y: 'y', z: 'z',
    r: 'r', g: 'g', b: 'b', a: 'a',
    normalX: 'nx', normalY: 'ny', normalZ: 'nz',
    u: 'u', v: 'v'
}

var Matrix = (function(){
	if( window['WebkitCSSMatrix'] ) return window['WebkitCSSMatrix'];
	if( window['MSCSSMatrix'] ) return window['MSCSSMatrix'];
	var CSSMatrix=function(h){if(!h||h==="none"){for(var g=0;g<16;g++){this["m"+((g/4|0)+1)+(g%4+1)]=g%4==(g/4|0)?1:0}return this}return this.setMatrixValue(h)};CSSMatrix.prototype={constructor:CSSMatrix,PID180:Math.PI/180,get a(){return this.m11},get b(){return this.m21},get c(){return this.m12},get d(){return this.m22},get e(){return this.m13},get f(){return this.m23},set a(g){this.m11=g},set b(g){this.m21=g},set c(g){this.m12=g},set d(g){this.m22=g},set e(g){this.m13=g},set f(g){this.m23=g},inverse:function(){var g=this.__clone__();g.m11=g.m23*g.m34*g.m42-g.m24*g.m33*g.m42+g.m24*g.m32*g.m43-g.m22*g.m34*g.m43-g.m23*g.m32*g.m44+g.m22*g.m33*g.m44;g.m12=g.m14*g.m33*g.m42-g.m13*g.m34*g.m42-g.m14*g.m32*g.m43+g.m12*g.m34*g.m43+g.m13*g.m32*g.m44-g.m12*g.m33*g.m44;g.m13=g.m13*g.m24*g.m42-g.m14*g.m23*g.m42+g.m14*g.m22*g.m43-g.m12*g.m24*g.m43-g.m13*g.m22*g.m44+g.m12*g.m23*g.m44;g.m14=g.m14*g.m23*g.m32-g.m13*g.m24*g.m32-g.m14*g.m22*g.m33+g.m12*g.m24*g.m33+g.m13*g.m22*g.m34-g.m12*g.m23*g.m34;g.m21=g.m24*g.m33*g.m41-g.m23*g.m34*g.m41-g.m24*g.m31*g.m43+g.m21*g.m34*g.m43+g.m23*g.m31*g.m44-g.m21*g.m33*g.m44;g.m22=g.m13*g.m34*g.m41-g.m14*g.m33*g.m41+g.m14*g.m31*g.m43-g.m11*g.m34*g.m43-g.m13*g.m31*g.m44+g.m11*g.m33*g.m44;g.m23=g.m14*g.m23*g.m41-g.m13*g.m24*g.m41-g.m14*g.m21*g.m43+g.m11*g.m24*g.m43+g.m13*g.m21*g.m44-g.m11*g.m23*g.m44;g.m24=g.m13*g.m24*g.m31-g.m14*g.m23*g.m31+g.m14*g.m21*g.m33-g.m11*g.m24*g.m33-g.m13*g.m21*g.m34+g.m11*g.m23*g.m34;g.m31=g.m22*g.m34*g.m41-g.m24*g.m32*g.m41+g.m24*g.m31*g.m42-g.m21*g.m34*g.m42-g.m22*g.m31*g.m44+g.m21*g.m32*g.m44;g.m32=g.m14*g.m32*g.m41-g.m12*g.m34*g.m41-g.m14*g.m31*g.m42+g.m11*g.m34*g.m42+g.m12*g.m31*g.m44-g.m11*g.m32*g.m44;g.m33=g.m12*g.m24*g.m41-g.m14*g.m22*g.m41+g.m14*g.m21*g.m42-g.m11*g.m24*g.m42-g.m12*g.m21*g.m44+g.m11*g.m22*g.m44;g.m34=g.m14*g.m22*g.m31-g.m12*g.m24*g.m31-g.m14*g.m21*g.m32+g.m11*g.m24*g.m32+g.m12*g.m21*g.m34-g.m11*g.m22*g.m34;g.m41=g.m23*g.m32*g.m41-g.m22*g.m33*g.m41-g.m23*g.m31*g.m42+g.m21*g.m33*g.m42+g.m22*g.m31*g.m43-g.m21*g.m32*g.m43;g.m42=g.m12*g.m33*g.m41-g.m13*g.m32*g.m41+g.m13*g.m31*g.m42-g.m11*g.m33*g.m42-g.m12*g.m31*g.m43+g.m11*g.m32*g.m43;g.m43=g.m13*g.m22*g.m41-g.m12*g.m23*g.m41-g.m13*g.m21*g.m42+g.m11*g.m23*g.m42+g.m12*g.m21*g.m43-g.m11*g.m22*g.m43;g.m44=g.m12*g.m23*g.m31-g.m13*g.m22*g.m31+g.m13*g.m21*g.m32-g.m11*g.m23*g.m32-g.m12*g.m21*g.m33+g.m11*g.m22*g.m33;return g.scale(1/g.__determinant__())},multiply:function(g){return this.__multiplyMatrices__(this.__clone__(),g)},__multiplyMatrices__:function(g,h){h.m11=h.m11*g.m11+h.m12*g.m21+h.m13*g.m31+h.m14*g.m41;h.m12=h.m11*g.m12+h.m12*g.m22+h.m13*g.m32+h.m14*g.m42;h.m13=h.m11*g.m13+h.m12*g.m23+h.m13*g.m33+h.m14*g.m43;h.m14=h.m11*g.m14+h.m12*g.m24+h.m13*g.m34+h.m14*g.m44;h.m21=h.m21*g.m11+h.m22*g.m21+h.m23*g.m31+h.m24*g.m41;h.m22=h.m21*g.m12+h.m22*g.m22+h.m23*g.m32+h.m24*g.m42;h.m23=h.m21*g.m13+h.m22*g.m23+h.m23*g.m33+h.m24*g.m43;h.m24=h.m21*g.m14+h.m22*g.m24+h.m23*g.m34+h.m24*g.m44;h.m31=h.m31*g.m11+h.m32*g.m21+h.m33*g.m31+h.m34*g.m41;h.m32=h.m31*g.m12+h.m32*g.m22+h.m33*g.m32+h.m34*g.m42;h.m33=h.m31*g.m13+h.m32*g.m23+h.m33*g.m33+h.m34*g.m43;h.m34=h.m31*g.m14+h.m32*g.m24+h.m33*g.m34+h.m34*g.m44;h.m41=h.m41*g.m11+h.m42*g.m21+h.m43*g.m31+h.m44*g.m41;h.m42=h.m41*g.m12+h.m42*g.m22+h.m43*g.m32+h.m44*g.m42;h.m43=h.m41*g.m13+h.m42*g.m23+h.m43*g.m33+h.m44*g.m43;h.m44=h.m41*g.m14+h.m42*g.m24+h.m43*g.m34+h.m44*g.m44;return h},multiplyLeft:function(g){return this.__multiplyMatrices__(g,this.__clone__())},rotate:function(i,h,g){if(i&&!(h&&g)){return this.__rotateX__(i)}else{if(h&&!(i&&g)){return this.__rotateY__(h)}else{if(g&&!(i&&h)){return this.__rotateZ__(g)}}}h=h||i;g=g||g;return this.__rotateX__(i).__rotateY__(h).__rotateZ__(g)},__rotateX__:function(i){var j=Math.cos(-i*Math.PI/180),h=Math.sin(-i*Math.PI/180),g=this.__clone__();g.m12=j*this.m12+h*this.m13;g.m22=j*this.m22+h*this.m23;g.m32=j*this.m32+h*this.m33;g.m42=j*this.m42+h*this.m43;g.m13=j*this.m13-h*this.m12;g.m23=j*this.m23-h*this.m22;g.m33=j*this.m33-h*this.m32;g.m43=j*this.m43-h*this.m42;return g},__rotateY__:function(i){var j=Math.cos(-i*this.PID180),h=Math.sin(-i*this.PID180),g=this.__clone__();g.m11=j*this.m11-h*this.m13;g.m21=j*this.m21-h*this.m23;g.m31=j*this.m31-h*this.m33;g.m41=j*this.m41-h*this.m43;g.m13=j*this.m13+h*this.m11;g.m23=j*this.m23+h*this.m21;g.m33=j*this.m33+h*this.m31;g.m43=j*this.m43+h*this.m41;return g},__rotateZ__:function(i){var j=Math.cos(-i*this.PID180),h=Math.sin(-i*this.PID180),g=this.__clone__();g.m11=j*this.m11+h*this.m12;g.m21=j*this.m21+h*this.m22;g.m31=j*this.m31+h*this.m32;g.m41=j*this.m41+h*this.m42;g.m12=j*this.m12-h*this.m11;g.m22=j*this.m22-h*this.m21;g.m32=j*this.m32-h*this.m31;g.m42=j*this.m42-h*this.m41;return g},rotateAxisAngle:function(g,m,k,j){m=m||g;k=k||m;if(g===1&&m===0&&k===0){return this.__rotateX__(j)}else{if(g===0&&m===1&&k===0){return this.__rotateY__(j)}else{if(g===0&&m===0&&k===1){return this.__rotateZ__(j)}}}var i=new CSSMatrix(),l=Math.cos(j)*this.PID180,h=Math.sin(j)*this.PID180;i.m11=l+g*g*(1-l);i.m12=g*m*(1-l)-k*h;i.m13=g*k*(1-l)+m*h;i.m21=m*g*(1-l)+k*h;i.m22=l+m*m*(1-l);i.m23=m*k*(1-l)-g*h;i.m31=k*g*(1-l)-m*h;i.m32=k*m*(1-l)+g*h;i.m33=l+k*k*(1-l);return this.__clone__().multiply(i)},scale:function(j,i,g){i=i||j;g=g||1;var h=this.__clone__();h.m11*=j;h.m21*=i;h.m31*=g;h.m12*=j;h.m22*=i;h.m32*=g;h.m13*=j;h.m23*=i;h.m33*=g;h.m13*=j;h.m24*=i;h.m34*=g;return h},setMatrixValue:function(j){var g=j.match(/[+-]?\d*[.]?\d+(?=,|\))/g);for(var h=0;h<16;h++){this["m"+((h/4|0)+1)+(h%4+1)]=Number(g[h])}return this},skewX:function(h){h*=this.PID180;var g=this.__clone__();g.m21=Math.tan(h);return g},skewY:function(h){h*=this.PID180;var g=this.__clone__();g.m12=Math.tan(h);return g},toString:function(){var h=this.m11.toFixed(6);for(var g=1;g<16;g++){h+=","+(this["m"+((g/4|0)+1)+(g%4+1)]).toFixed(6)}return"matrix3d("+h+")"},translate:function(h,j,i){var g=this.__clone__(),i=i||0;g.m41=g.m11*h+g.m21*j+g.m31*i+g.m41;g.m42=g.m12*h+g.m22*j+g.m32*i+g.m42;g.m43=g.m13*h+g.m14*j+g.m33*i+g.m43;g.m44=g.m14*h+g.m24*j+g.m34*i+g.m44;return g},__determinant__:function(){return(this.m41*(+this.m14*this.m23*this.m32-this.m13*this.m24*this.m32-this.m14*this.m22*this.m33+this.m12*this.m24*this.m33+this.m13*this.m22*this.m34-this.m12*this.m23*this.m34)+this.m42*(+this.m11*this.m23*this.m34-this.m11*this.m24*this.m33+this.m14*this.m21*this.m33-this.m13*this.m21*this.m34+this.m13*this.m24*this.m31-this.m14*this.m23*this.m31)+this.m43*(+this.m11*this.m24*this.m32-this.m11*this.m22*this.m34-this.m14*this.m21*this.m32+this.m12*this.m21*this.m34+this.m14*this.m22*this.m31-this.m12*this.m24*this.m31)+this.m44*(-this.m13*this.m22*this.m31-this.m11*this.m23*this.m32+this.m11*this.m22*this.m33+this.m13*this.m21*this.m32-this.m12*this.m21*this.m33+this.m12*this.m23*this.m31))},__clone__:function(){var h=new CSSMatrix();for(var g=0;g<16;g++){h["m"+((g/4|0)+1)+(g%4+1)]=this["m"+((g/4|0)+1)+(g%4+1)]}return h}};
    return CSSMatrix;
})();
/**
 * Created by redcamel on 2015-05-05.
 * description
 정점배열과 인덱스 배열을 이용하여 기하구조를 정의함.
 생성자에서 지정된 버퍼 및 정보는 변경불가로 생성 이후는 읽기만 가능함.
 */
var Geometry = (function () {
    //그중에 자신의 4좌표랑 7uv랑 8rgba랑 9노말은 지오메트리거고
    var Geometry, fn;
    Geometry = function Geometry(vertex, index, info) {
        var i, len, t, t2,
            isFloat32 = vertex instanceof Float32Array,
            isUint16 = index instanceof Uint16Array
        //isUint32 = Object.prototype.toString.call(index) == '[object Uint32Array]'
        if (!(Array.isArray(vertex) || isFloat32 )) MoGL.error('Geometry', 'constructor', 0)
        if (!(Array.isArray(index) || isUint16 || isUint32 )) MoGL.error('Geometry', 'constructor', 1)
        if (info) {
            i = info.length
            if(vertex.length % i) MoGL.error('Geometry', 'constructor', 2)
            while(i--) info[info[i]] = i
            console.log(info)
        }
        /////////////////////////////////////
        t = arguments[2] ? arguments[2].length : 3
        this._vertexCount = vertex.length / t,
        this._triangleCount = index.length / 3,
        this._vertexShaders = {},
        this._position = [],
        this._normal = [],
        this._uv = [],
        this._name = null
        this._color = []
        ///////////////////////////////
        //TODO 노말,UV,컬러없을떄 판별
        if (arguments[2]) {
            for (i = 0, len = vertex.length / t; i < len; i++) {
                t2 = t * i,
                this._position.push(vertex[t2 + info.x], vertex[t2 + info.y], vertex[t2 + info.z]),
                info.nx ? this._normal.push(vertex[t2 + info.nx], vertex[t2 + info.ny], vertex[t2 + info.nz]) : 0,
                info.u ? this._uv.push(vertex[t2 + info.u], vertex[t2 + info.v]) : 0,
                info.r ? this._color.push(vertex[t2 + info.r], vertex[t2 + info.g], vertex[t2 + info.b], vertex[t2 + info.a]) : 0
            }
            this._position = new Float32Array(this._position),
            this._normal = new Float32Array(this._normal),
            this._uv = new Float32Array(this._uv),
            this._color = new Float32Array(this._color)
        } else this._position = isFloat32 ? vertex : new Float32Array(vertex)
        //TODO Uint32Array을 받아줄것인가! 고민해야됨..
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
        if (!('_volume' in this)) {
            var minX = 0, minY = 0, minZ = 0, maxX = 0, maxY = 0, maxZ = 0
            var t0, t1, t2, t = this._position,i= t.length
            while(i--){
                t0 = i * 3, t1 = t0 + 1, t2 = t0 + 2
                minX = t[t0] < minX ? t[t0] : minX,
                maxX = t[t0] > maxX ? t[t0] : maxX,
                minY = t[t1] < minY ? t[t1] : minY,
                maxY = t[t1] > maxY ? t[t1] : maxY,
                minZ = t[t2] < minZ ? t[t2] : minZ,
                maxZ = t[t2] > maxZ ? t[t2] : maxZ
            }
            this._volume = [maxX - minX, maxY - minY, maxZ - minZ]
        }
        return this._volume
    },
    fn.removeVertexShader = function removeVertexShader(id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return delete this._vertexShaders[id], this
    };

    return MoGL.ext(Geometry, MoGL);
})();
/**
 * Created by redcamel on 2015-05-05.
 */
var Material = (function () {
    var Material, fn;
    var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, hex_s = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
    Material = function Material() {
        var t0 = arguments[0], t1, ta
        this._textures = {
            __indexList :[]
        },
        this._r = 1,
        this._g = 1,
        this._b = 1,
        this._a = 1,
        this._count = 0,
        this._scene = null
        if (arguments.length == 1) {
            if (t0.length > 7) ta = +t0.substr(7), t0 = t0.substr(0, 7)
            if (t0.charAt(0) == '#') {
                if (t1 = hex.exec(t0)) {
                    this._r = parseInt(t1[1], 16) / 255,
                    this._g = parseInt(t1[2], 16) / 255,
                    this._b = parseInt(t1[3], 16) / 255
                } else {
                    t1 = hex_s.exec(t0),
                    this._r = parseInt(t1[1] + t1[1], 16) / 255,
                    this._g = parseInt(t1[2] + t1[2], 16) / 255,
                    this._b = parseInt(t1[3] + t1[3], 16) / 255
                }
                this._a = ta ? ta > 1 ? 1 : ta : 1
            }
        } else {
            this._r = arguments[0],
            this._g = arguments[1],
            this._b = arguments[2],
            this._a = arguments[3] ? arguments[3] : 1
        }
    },
    fn = Material.prototype,
    fn.addTexture = function addTexture(textureID/*,index,blendMode*/) {
        //TODO 와 이거어렵네..
        //TODO index 구현
        //TODO blnedMode 구현 구현
        var t = this._scene
        if (t && !t._textures[textureID]) MoGL.error('Material', 'addTexture', 0)
        if (this._textures[textureID]) MoGL.error('Material', 'addTexture', 1)
        this._textures[textureID] = textureID
        var result
        if (arguments[1]) result=this._textures.__indexList.splice(arguments[1], 0,{id: textureID,blendMode : arguments[2]})
        else result=this._textures.__indexList.push({id: textureID,blendMode : arguments[2]})
        return this
    },
    fn.getRefCount = function getRefCount(){
        return this._count
    },
    fn.removeTexture = function removeTexture(textureID){
        var i = this._textures.__indexList.length
        while(i--){
            if(this._textures.__indexList[i].id == textureID){
                this._textures.__indexList.splice(i, 1)
                break
            }
        }
        delete this._textures[textureID]
        return this
    }
    return MoGL.ext(Material, MoGL);
})();
/**
 * Created by redcamel on 2015-05-05.
 */
var Texture = {
    zoomOut: 'zoomOut', //'zoomOut' - 이미지를 축소하여 2의 n에 맞춤.
    zoomIn: 'zoomIn', //'zoomIn' - 이미지를 확대하여 2의 n에 맞춤.
    crop: 'crop', //'crop' - 이미지를 2의 n에 맡게 좌상단을 기준으로 잘라냄.
    addSpace: 'addSpace' //'addSpace' - 이미지를 2의 n에 맡게 여백을 늘림.
}

//var Texture = (function () {
//    var Texture, fn;
//    Texture = function Texture(vertex, index, info) {
//    }
//    Texture = MoGL.ext(Texture, MoGL),
//    Texture.zoomOut = 'zoomOut', //'zoomOut' - 이미지를 축소하여 2의 n에 맞춤.
//    Texture.zoomIn = 'zoomIn', //'zoomIn' - 이미지를 확대하여 2의 n에 맞춤.
//    Texture.crop = 'crop', //'crop' - 이미지를 2의 n에 맡게 좌상단을 기준으로 잘라냄.
//    Texture.addSpace = 'addSpace' //'addSpace' - 이미지를 2의 n에 맡게 여백을 늘림.
//    return Texture
//})();

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
        this._children = {},
        this._scene = null
    },
    fn = Group.prototype,
    fn.addChild = function addChild(id, mesh) {
        var k,checks
        if(this._children[id]) MoGL.error('Group','addChild',0)
        if(!(mesh instanceof Mesh )) MoGL.error('Group','addChild',1)
        mesh._scene = this,
        mesh.setGeometry(mesh._geometry),
        mesh.setMaterial(mesh._material),
        checks = mesh._geometry._vertexShaders;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._scene._vertexShaders[checks[k]]) MoGL.error('Group', 'addChild', 2)
        checks = mesh._material._fragmentShaders;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._scene._fragmentShaders[checks[k]]) MoGL.error('Group', 'addChild', 3)
        checks = mesh._material._textures;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._scene._textures[checks[k]]) MoGL.error('Group', 'addChild', 4)
        this._children[id] = mesh
        return this
    },
    fn.getChild = function getChild(id) {
        var t = this._children[id];
        return t ? t : null
    },
    fn.removeChild = function removeChild(id) {
        return this._children[id] ? (delete this._children[id], true) : false
    }
    return MoGL.ext(Group, Mesh);
})();
/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn,a4=[];
    var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, hex_s = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
    Camera = function Camera() {
        this._cvs=null
        this._geometry = new Geometry([], [])
        this._material = new Material()
        this._r = 0,
        this._g = 0,
        this._b = 0,
        this._a = 1,
        this._fov = 55,
        this._near = 0.1,
        this._far = 100000,
        this._renderArea = null,
        this._visible=1,
        this._filters ={},
        this._fog = null,
        this._antialias = false
        this._pixelMatrix = Matrix()
    }
    fn = Camera.prototype
    fn.getBackgroundColor = function getBackgroundColor(){MoGL.isAlive(this);
        return a4[0] = this._r, a4[1] = this._g, a4[2] = this._b, a4[3] = this._a, a4
    },
    fn.getClipPlane = function getClipPlane(){MoGL.isAlive(this);
        return [this._near,this._far]
    },
    fn.getFilters = function getFilters(){MoGL.isAlive(this);
        var result = [],t = this._filters
        for(var k in t) result.push(k)
        return result
    },
    fn.getFog = function getFog(){MoGL.isAlive(this);
        return this._fog ? true : false
    },
    fn.getFOV = function getFOV(){MoGL.isAlive(this);
        return this._fov
    },
    fn.getProjectionMatrix = function getProjectionMatrix(){MoGL.isAlive(this);
        //TODO 크기를 반영해야함..
        //TODO 이렇다는건...카메라 렌더시에 _renderArea를 알고있다는 가정인가?
        var aspectRatio = this._renderArea[2]/this._renderArea[3],yScale = 1.0 / Math.tan(this._fov * Math.PI / 180 / 2.0),xScale = yScale / aspectRatio;
        this._pixelMatrix = [
            xScale, 0, 0, 0,
            0, -yScale, 0, 0,
            0, 0, this._far / (this._far - this._near), 1,
            0, 0, (this._near * this._far) / (this._near - this._far), 1
        ]
        return this._pixelMatrix
    },
    fn.getRenderArea = function getRenderArea(){MoGL.isAlive(this);
        return this._renderArea
    },
    fn.getAntialias = function getAntialias(){MoGL.isAlive(this);
        return this._antialias ? true : false
    },
    fn.getVisible = function getVisible(){MoGL.isAlive(this);
        return this._visible ? true : false
    },
    fn.setBackgroundColor = function setBackgroundColor() {MoGL.isAlive(this);
        var t0 = arguments[0], t1, ta
        if (arguments.length == 1) {
            if (t0.length > 7) ta = +t0.substr(7), t0 = t0.substr(0, 7)
            if (t0.charAt(0) == '#') {
                if (t1 = hex.exec(t0)) {
                    this._r = parseInt(t1[1], 16) / 255,
                    this._g = parseInt(t1[2], 16) / 255,
                    this._b = parseInt(t1[3], 16) / 255

                } else {
                    t1 = hex_s.exec(t0),
                    this._r = parseInt(t1[1] + t1[1], 16) / 255,
                    this._g = parseInt(t1[2] + t1[2], 16) / 255,
                    this._b = parseInt(t1[3] + t1[3], 16) / 255
                }
                this._a = ta ? ta > 1 ? 1 : ta : 1
            }
        } else {
            this._r = arguments[0],
            this._g = arguments[1],
            this._b = arguments[2],
            this._a = arguments[3] ? arguments[3] : 1
        }
        return this
    },
    fn.setClipPlane = function setClipPlane(near,far){MoGL.isAlive(this);
        this._near = near,this._far = far
        return this
    },
    fn.setFilter = function setFilter(filter/*,needIe*/){MoGL.isAlive(this);
        var result
        if(arguments[1]){
            result = arguments[1]
        }else{
            switch (filter) {
                case Filter.anaglyph :
                    result = {
                        offsetL: 0.008,
                        offsetR: 0.008,
                        gIntensity: 0.7,
                        bIntensity: 0.7
                    }
                    break
                case Filter.bevel :
                    result = {
                        distance: 4.0,
                        angle: 45,
                        highlightColor: '#FFF',
                        highlightAlpha: 1.0,
                        shadowColor: '#000',
                        shadowAlpha: 1.0,
                        blurX: 4.0,
                        blurY: 4.0,
                        strength: 1,
                        quality: 1,
                        type: "inner",
                        knockout: false
                    }
                    break
                case Filter.bloom :
                    result = {
                        threshold: 0.3,
                        sourceSaturation: 1.0,
                        bloomSaturation: 1.3,
                        sourceIntensity: 1.0,
                        bloomIntensity: 1.0
                    }
                    break
                case Filter.blur :
                    result = {
                        blurX: 4.0,
                        blurY: 4.0,
                        quality : 1
                    }
                    break
                case Filter.colorMatrix :
                    result =  {}
                    break
                case Filter.convolution :
                    result = {
                        matrixX: 0,
                        matrixY: 0,
                        matrix: null,
                        divisor: 1.0,
                        bias: 0.0,
                        preserveAlpha: true,
                        clamp: true,
                        color: 0,
                        alpha: 0.0
                    }
                    break
                case Filter.displacementMap :
                    result =  {
                        mapTextureID: null,
                        mapPoint: null,
                        componentX: 0,
                        componentY: 0,
                        scaleX: 0.0,
                        scaleY: 0.0,
                        mode: "wrap",
                        color: 0,
                        alpha: 0.0
                    }
                    break
                case Filter.fxaa :
                    result =  {}
                    break
                case Filter.glow :
                    result = {
                        color: '#F00',
                        alpha: 1.0,
                        blurX: 6.0,
                        blurY: 6.0,
                        strength: 2,
                        quality: 1,
                        inner: false,
                        knockout: false
                    }
                    break
                case Filter.invert :
                    result =  {}
                    break
                case Filter.mono :
                    result =  {}
                    break
                case Filter.sepia :
                    result =  {}
                    break
                case Filter.shadow :
                    result = {
                        distance: 4.0,
                        angle: 45,
                        color: 0,
                        alpha: 1.0,
                        blurX: 4.0,
                        blurY: 4.0,
                        strength: 1.0,
                        quality: 1,
                        inner: false,
                        knockout: false,
                        hideObject: false
                    }
                    break
            }
        }
        this._filters[filter] = result
        return this
    },
    fn.setFog = function setFog(color,near,far){MoGL.isAlive(this);
        var t0 = color,t1,result
        if (t0.charAt(0) == '#') {
            result= {}
            if (t1 = hex.exec(t0)) {
                result.r = parseInt(t1[1], 16) / 255,
                result.g = parseInt(t1[2], 16) / 255,
                result.b = parseInt(t1[3], 16) / 255

            } else {
                t1 = hex_s.exec(t0),
                result.r = parseInt(t1[1] + t1[1], 16) / 255,
                result.g = parseInt(t1[2] + t1[2], 16) / 255,
                result.b = parseInt(t1[3] + t1[3], 16) / 255
            }
            result.a =1
            result.near = near
            result.far = far
            this._fog = result
        }else if(!color){
            this._fog = null
        }
        return this
    },
    fn.setFOV = function setFOV(){MoGL.isAlive(this);
        if (arguments.length == 1)this._fov = arguments[0]
        else this._fov = Math.ceil(2 * Math.atan(Math.tan(arguments[2] * (Math.PI / 180) / 2) * (arguments[1] / arguments[0])) * (180 / Math.PI))
        return this
    },
    fn.setOthogonal = function setOthogonal(){MoGL.isAlive(this);
        //TODO
        return this
    },
    fn.setPerspective = function setPerspective(){MoGL.isAlive(this);
        //TODO
        return this
    },
    fn.setProjectionMatrix = function setProjectionMatrix(){MoGL.isAlive(this);
        //TODO
        return this
    },
    fn.setRenderArea = function setRenderArea(x,y,w,h){MoGL.isAlive(this);
        var tw = this._cvs.clientWidth
        var th = this._cvs.clientHeight
        console.log(typeof x =='string' ? tw * x.replace('%', '') : x)
        this._renderArea = [
            typeof x =='string' ? tw * x.replace('%', '')*0.01 : x,
            typeof y =='string' ? th * y.replace('%', '')*0.01 : y,
            typeof w =='string' ? tw * w.replace('%', '')*0.01 : w,
            typeof h =='string' ? th * h.replace('%', '')*0.01 : h,
        ]
        return this
    },
    fn.setAntialias = function setAntialias(isAntialias){MoGL.isAlive(this);
        this._antialias = isAntialias
        return this
    },
    fn.setVisible = function setVisible(value){MoGL.isAlive(this);
        this._visible=value
        return this
    },
    fn.removeFilter = function removeFilter(filter){MoGL.isAlive(this);
        delete this._filters[filter]
        return this
    }
    return MoGL.ext(Camera, Mesh);
})();
/**
 * Created by redcamel on 2015-05-05.
 */
'use strict'
var Scene = (function () {
    var Scene, fn;
    Scene = function Scene() {
        this._update=0
        this._cvs = null,
        // for JS
        this._children = {},
        this._cameras={},
        this._textures = {},
        this._materials = {},
        this._geometrys = {},
        this._vertexShaders = {},
        this._fragmentShaders = {}
        // for GPU
        this._gl = null,
        this._glVBOs = {},
        this._glUVBOs = {},
        this._glIBOs = {},
        this._glPROGRAMs = {},
        this._glTEXTUREs ={}
    }
    /////////////////////////////////////////////////////////////////
    var makeVBO = function makeVBO(self, name, data, stride) {
        var gl = self._gl,buffer = self._glVBOs[name]
        if (buffer) return buffer
        buffer = gl.createBuffer(),
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer),
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW),
        buffer.name = name,
        buffer.type = 'VBO',
        buffer.data = data,
        buffer.stride = stride,
        buffer.numItem = data.length / stride,
        self._glVBOs[name] = buffer,
        console.log('VBO생성', self._glVBOs[name])
        return self._glVBOs[name]
    }

    var makeIBO = function makeIBO(self, name, data, stride) {
        var gl = self._gl, buffer = self._glIBOs[name]
        if (buffer) return buffer
        buffer = gl.createBuffer(),
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer),
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW),
        buffer.name = name,
        buffer.type = 'IBO',
        buffer.data = data,
        buffer.stride = stride,
        buffer.numItem = data.length / stride,
        self._glIBOs[name] = buffer,
        console.log('IBO생성', self._glIBOs[name])
        return self._glIBOs[name]
    }

    var makeUVBO = function makeUVBO(self, name, data, stride) {
        var gl = self._gl,buffer = self._glUVBOs[name]
        if (buffer) return buffer
        buffer = gl.createBuffer(),
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer),
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW),
            buffer.name = name,
            buffer.type = 'UVBO',
            buffer.data = data,
            buffer.stride = stride,
            buffer.numItem = data.length / stride,
            self._glUVBOs[name] = buffer,
            console.log('UVBO생성', self._glUVBOs[name])
        return self._glUVBOs[name]
    }

    var makeProgram = function makeProgram(self, name) {
        var gl = self._gl, vShader, fShader, program,i
        vShader = vertexShaderParser( self,self._vertexShaders[name]),
        fShader = fragmentShaderParser(self,self._fragmentShaders[name]),
        program = gl.createProgram(),
        gl.attachShader(program, vShader),
        gl.attachShader(program, fShader),
        gl.linkProgram(program),
        vShader.name = name + '_vertex', fShader.name = name + '_fragment', program.name = name
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) MoGL.error(name, ' 프로그램 쉐이더 초기화 실패!', 0)
        gl.useProgram(program)
        for (i = 0; i < vShader.attributes.length; i++) {
            gl.bindBuffer(gl.ARRAY_BUFFER, self._glVBOs['null']),
            gl.enableVertexAttribArray(program[vShader.attributes[i]] = gl.getAttribLocation(program, vShader.attributes[i])),
            gl.vertexAttribPointer(program[vShader.attributes[i]], self._glVBOs['null'].stride, gl.FLOAT, false, 0, 0)
        }
        for (i = 0; i < vShader.uniforms.length; i++) {
            program[vShader.uniforms[i]] = gl.getUniformLocation(program, vShader.uniforms[i])
        }
        self._glPROGRAMs[name] = program
        console.log(vShader)
        console.log(fShader)
        console.log(program)
        return program
    }

    var vertexShaderParser = function vertexShaderParser(self, source) {
        var gl=self._gl,t0, len, i, resultStr,shader = gl.createShader(gl.VERTEX_SHADER)
        shader.uniforms = [],
        shader.attributes = [],
        resultStr = "", t0 = source.attributes, len = t0.length;
        for (i = 0; i < len; i++) {
            resultStr += 'attribute ' + t0[i] + ';\n',
            shader.attributes.push(t0[i].split(' ')[1])
        }
        t0 = source.uniforms, len = t0.length
        for (i = 0; i < len; i++) {
            resultStr += 'uniform ' + t0[i] + ';\n',
            shader.uniforms.push(t0[i].split(' ')[1])
        }
        t0 = source.varyings, len = t0.length
        for (i = 0; i < len; i++) {
            resultStr += 'varying ' + t0[i] + ';\n'
        }
        resultStr += VertexShader.baseFunction,
        resultStr += 'void main(void){\n',
        resultStr += source.main + ';\n',
        resultStr += '}\n',
        console.log(resultStr),
        gl.shaderSource(shader, resultStr),
        gl.compileShader(shader)
        return shader
    }
    var fragmentShaderParser = function fragmentShaderParser(self,source){
        var gl=self._gl,resultStr = "", i,t0,len,shader = gl.createShader(gl.FRAGMENT_SHADER);
        shader.uniforms = []
        if(source.precision) resultStr+='precision '+source.precision+';\n'
        else resultStr+='precision mediump float;\n'
        t0 = source.uniforms, len = t0.length
        for(i=0; i<len; i++) {
            resultStr += 'uniform '+t0[i]+';\n',
            shader.uniforms.push(t0[i].split(' ')[1])
        }
        t0=source.varyings,len = t0.length
        for(i=0; i<len; i++) {
            resultStr += 'varying '+t0[i]+';\n'
        }
        resultStr+='void main(void){\n',
        resultStr+=source.main+';\n',
        resultStr+='}\n',
        gl.shaderSource(shader, resultStr), gl.compileShader(shader),
        shader.uniforms = source.uniforms
        return shader
    }
    var makeTexture = function makeTexture(self, id,image) {
        var gl = self._gl, texture = self._glTEXTUREs[id];
        if (texture) return texture
        texture = gl.createTexture(),
        //TODO 일단 이미지만
        texture.img = new Image()
        if (typeof image == 'string') texture.img.src = image
        else if (image instanceof HTMLImageElement) texture.img.src = image.src
        texture.img.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture),
            //TODO 다변화 대응해야됨
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.generateMipmap(gl.TEXTURE_2D)
            gl.bindTexture(gl.TEXTURE_2D, null)
            texture.loaded=1
        }
        self._glTEXTUREs[id] = texture
        return texture
    }
/////////////////////////////////////////////////////////////////
    fn = Scene.prototype,
    fn.update = function update() { MoGL.isAlive(this);
        this._glVBOs['null'] = makeVBO(this, 'null', new Float32Array([0.0,0.0,0.0]), 3)
        //for GPU
        for (var k in this._children) {
            var mesh = this._children[k]
            if (!this._glVBOs[mesh._geometry] && mesh._geometry) {
                this._glVBOs[mesh._geometry._name] = makeVBO(this, mesh._geometry._name, mesh._geometry._position, 3),
                this._glUVBOs[mesh._geometry._name] = makeUVBO(this, mesh._geometry._name, mesh._geometry._uv, 2),
                this._glIBOs[mesh._geometry._name] = makeIBO(this, mesh._geometry._name, mesh._geometry._index, 1)
            }
        }
        for (k in this._cameras){
            var camera = this._cameras[k]
            camera._cvs = this._cvs
            if(!camera._renderArea) camera.setRenderArea(0,0,this._cvs.width,this._cvs.height)
        }
        var checks = this._vertexShaders;
        for (k in checks) makeProgram(this, k)
        console.log('////////////////////////////////////////////'),
        console.log('Scene 업데이트'),
        console.log('this._glVBOs :',this._glVBOs),
        console.log('this._glIBOs :',this._glIBOs),
        console.log('this._glPROGRAMs :',this._glPROGRAMs),
        console.log('this._geometrys :',this._geometrys),
        console.log('this._materials :',this._materials),
        console.log('this._textures :',this._textures),
        console.log('this._vertexShaders :',this._vertexShaders),
        console.log('this._fragmentShaders :',this._fragmentShaders),
        console.log('////////////////////////////////////////////'),
        this._update = 0
    },
    fn.addChild = function addChild(id, mesh) { MoGL.isAlive(this); // isAlive는 함수선언 줄에 바로 같이 씁니다.
        var k, checks;
        if (this._children[id]) MoGL.error('Scene', 'addChild', 0)
        if (!(mesh instanceof Mesh)) MoGL.error('Scene', 'addChild', 1)
        mesh._scene = this,mesh._parent = this,
        mesh.setGeometry(mesh._geometry),
        mesh.setMaterial(mesh._material),
        mesh._material._count++,
        checks = mesh._geometry._vertexShaders;
        for (k in checks) if (typeof checks[k] == 'string') if (!this._vertexShaders[checks[k]]) MoGL.error('Scene', 'addChild', 2)
        checks = mesh._material._fragmentShaders;
        for (k in checks) if (typeof checks[k] == 'string') if (!this._fragmentShaders[checks[k]]) MoGL.error('Scene', 'addChild', 3)
        checks = mesh._material._textures;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._textures[checks[k]]) MoGL.error('Scene', 'addChild', 4)
                else {
                    console.log(mesh._material._textures),
                    console.log(checks[k]),
                    mesh._material._textures[checks[k]] = this._textures[checks[k]]
                }
        if(mesh instanceof Camera) this._cameras[id] = mesh,mesh._cvs = this._cvs
        else this._children[id] = mesh
        this._update=1
        return this
    },
    fn.addGeometry = function (id, geometry) { MoGL.isAlive(this);
        if (this._geometrys[id]) MoGL.error('Scene', 'addGeometry', 0)
        if (!(geometry instanceof Geometry)) MoGL.error('Scene', 'addGeometry', 1)
        var checks = geometry._vertexShaders, k;
        for (k in checks) if (typeof checks[k] == 'string') if (!this._vertexShaders[checks[k]]) MoGL.error('Scene', 'addGeometry', 2)
        this._geometrys[id] = geometry
        return this
    },
    fn.addMaterial = function (id, material) { MoGL.isAlive(this);
        if (this._materials[id]) MoGL.error('Scene', 'addMaterial', 0)
        if (!(material instanceof Material)) MoGL.error('Scene', 'addMaterial', 1)
        var checks = material._fragmentShaders, k;
        for (k in checks) if (typeof checks[k] == 'string') if (!this._fragmentShaders[checks[k]]) MoGL.error('Scene', 'addMaterial', 2)
        checks = material._textures;
        for (k in checks) if (typeof checks[k] == 'string') if (!this._textures[checks[k]]) {
            MoGL.error('Scene', 'addMaterial', 3)
        }
        this._materials[id] = material
        this._materials[id]._scene = this
        return this
    },
    fn.addTexture = function addTexture(id, image/*,resizeType*/) { MoGL.isAlive(this);
        if (this._textures[id]) MoGL.error('Scene', 'addTexture', 0)
        if (checkDraft(image)) MoGL.error('Scene', 'addTexture', 1)
        function checkDraft(target) {
            if (target instanceof HTMLImageElement) return 0
            if (target instanceof HTMLCanvasElement) return 0
            if (target instanceof HTMLVideoElement) return 0
            if (target instanceof ImageData) return 0
            if (target['substring'] && target.substring(0, 10) == 'data:image' && target.indexOf('base64') > -1) return 0// base64문자열 - urlData형식으로 지정된 base64문자열
            if (typeof target == 'string') return 0
            // TODO 블랍은 어카지 -__;;;;;;;;;;;;;;;;;;;;;;;;실제 이미지를 포함하고 있는 Blob객체.
            return 1
        }
        if(this._textures[id]) this._textures[id].img=makeTexture(this,id,image)
        else{
            this._textures[id] = {
                count: 0, last: 0, img: makeTexture(this,id, image), resizeType: arguments[2] || null
            }
        }
        return this
    },
    fn.addFragmentShader = function addFragmentShader(id, shaderStr) { MoGL.isAlive(this);
        if (this._fragmentShaders[id]) MoGL.error('Scene', 'addFragmentShader', 0)
        // TODO'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 vertex shader를 등록하려할 때.
        // TODO 마일스톤0.2
        this._fragmentShaders[id] = shaderStr
        return this
    },
    fn.addVertexShader = function addVertexShader(id, shaderStr) { MoGL.isAlive(this);
        if (this._vertexShaders[id]) MoGL.error('Scene', 'addVertexShader', 0)
        // TODO'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 vertex shader를 등록하려할 때.
        // TODO 마일스톤0.2
        this._vertexShaders[id] = shaderStr
        return this
    },
    ///////////////////////////////////////////////////////////////////////////
    // Get
    fn.getChild = function getChild(id) { MoGL.isAlive(this);
        var t = this._children[id];
        t = t ? t : this._cameras[id]
        return t ? t : null
    },
    fn.getGeometry = function getGeometry(id) { MoGL.isAlive(this);
        var t = this._geometrys[id];
        return t ? t : null
    },
    fn.getMaterial = function getMaterial(id) { MoGL.isAlive(this);
        var t = this._materials[id]
        return t ? t : null
    },
    fn.getTexture = function getTexture(id) { MoGL.isAlive(this);
        //TODO image엘리먼트 - id에 해당되는 image엘리먼트. src는 dataURL로 되어있음.
        var t = this._textures[id]
        return t ? t : null
    },
    fn.getFragmentShader = function (id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this._fragmentShaders[id]
    },
    fn.getVertexShader = function (id) { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this._vertexShaders[id]
    },
    ///////////////////////////////////////////////////////////////////////////
    // Remove
    fn.removeChild = function removeChild(id) { MoGL.isAlive(this);
        return this._children[id] ? (this._children[id]._material._count--, this._children[id]._scene = null,this._children[id]._parent = null, delete this._children[id], true) : false
    },
    fn.removeGeometry = function removeGeometry(id) { MoGL.isAlive(this);
        return this._geometrys[id] ? (delete this._geometrys[id], true) : false
    },
    fn.removeMaterial = function removeMaterial(id) { MoGL.isAlive(this);
        return this._materials[id] ? (delete this._materials[id], true) : false
    },
    fn.removeTexture = function removeTexture(id) { MoGL.isAlive(this);
        return this._textures[id] ? (delete this._textures[id], true) : false
    },
    fn.removeFragmentShader = function removeFragmentShader() { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this
    },
    fn.removeVertexShader = function VertexShader() { MoGL.isAlive(this);
        // TODO 마일스톤0.2
        return this
    }
    return MoGL.ext(Scene, MoGL);
})();
/**
 * Created by redcamel on 2015-05-05.
 * description
 * World는 MoGL의 기본 시작객체로 내부에 다수의 Scene을 소유할 수 있으며,
 * 실제 렌더링되는 대상임. 또한 World의 인스턴스는 rendering함수 그 자체이기도 함.
 * 메서드체이닝을 위해 대부분의 함수는 자신을 반환함.
 */
var World = (function () {
    var World, fn;
    World = function World(id) {
        this._cvs = document.getElementById(id);
        var keys = 'webgl,experimental-webgl,webkit-3d,moz-webgl'.split(','), i = keys.length
        while (i--) if (this._gl = this._cvs.getContext(keys[i])) break
        console.log(this._gl ? id + ' : MoGL 초기화 성공!' : console.log(id + ' : MoGL 초기화 실패!!'))
    },
    fn = World.prototype,
    fn._renderList = [],
    fn._sceneList = {},
    fn._render = function _render() { MoGL.isAlive(this);
        var i, k, len, tList = this._renderList
        var scene,camera,gl,children;
        var tItem, tMaterial, tProgram, tVBO, tUVBO, tIBO;
        for (i = 0, len = tList.length; i < len; i++) {
            //console.log(tList[i],'렌더')
            if (tList[i].scene._update) tList[i].scene.update()
            //console.log('카메라렌더',tList[i].sceneID,tList[i].cameraID, '실제 Scene : ',tList[i].scene)
            scene = tList[i].scene,
            camera = scene.getChild(tList[i].cameraID)
            if(camera._visible){
                gl = scene._gl,
                children = scene._children,
                //TODO 뷰포트가 아닌....이게...프레임에 어떻게 그릴껀지로 가야함..
                gl.viewport(camera._renderArea[0],camera._renderArea[1]==0 ? 0 :camera._renderArea[3]-camera._renderArea[1],camera._renderArea[2],camera._renderArea[3])
                gl.clearColor(camera._r, camera._g, camera._b, camera._a)
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                for(k in scene._glPROGRAMs){
                    tProgram = scene._glPROGRAMs[k]
                    gl.useProgram(tProgram)
                    gl.uniformMatrix4fv(tProgram.uPixelMatrix,false,camera.getProjectionMatrix())
                }
                tItem = tMaterial = tProgram = tVBO = tIBO = null
                for (k in children) {
                    tItem = children[k],
                    tVBO = scene._glVBOs[tItem._geometry._name],
                    tUVBO = scene._glUVBOs[tItem._geometry._name],
                    tIBO = scene._glIBOs[tItem._geometry._name],
                    tMaterial = tItem._material,
                    tProgram = tMaterial._textures.__indexList.length>0 ?scene._glPROGRAMs['bitmap'] :scene._glPROGRAMs['base'], // TODO 이놈은 어디서 결정하지?
                    gl.useProgram(tProgram)
                    if(tProgram==scene._glPROGRAMs['base']){
                        gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                        gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0),
                        gl.uniform3fv(tProgram.uRotate, [tItem.rotateX, tItem.rotateY, tItem.rotateZ]),
                        gl.uniform3fv(tProgram.uPosition, [tItem.x, tItem.y, tItem.z]),
                        gl.uniform3fv(tProgram.uScale, [tItem.scaleX, tItem.scaleY, tItem.scaleZ]),
                        gl.uniform3fv(tProgram.uColor, [tMaterial._r, tMaterial._g, tMaterial._b]),
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO),
                        gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0)
                    }else if(tProgram==scene._glPROGRAMs['bitmap']){
                        gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                        gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0),
                        gl.bindBuffer(gl.ARRAY_BUFFER, tUVBO),
                        gl.vertexAttribPointer(tProgram.aUV, tUVBO.stride, gl.FLOAT, false, 0, 0),
                        gl.uniform3fv(tProgram.uRotate, [tItem.rotateX, tItem.rotateY, tItem.rotateZ]),
                        gl.uniform3fv(tProgram.uPosition, [tItem.x, tItem.y, tItem.z]),
                        gl.uniform3fv(tProgram.uScale, [tItem.scaleX, tItem.scaleY, tItem.scaleZ]),
                        gl.activeTexture(gl.TEXTURE0);
                        var textureObj = scene._glTEXTUREs[tMaterial._textures.__indexList[0].id]
                        if(textureObj.loaded){
                            gl.bindTexture(gl.TEXTURE_2D, textureObj);
                            gl.uniform1i(tProgram.uSampler, 0);
                            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO),
                            gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0)
                        }
                    }
                }
            }
        }
    },
    fn.addRender = function addRender(sceneID, cameraID, index) { MoGL.isAlive(this);
        var uuid = sceneID + '_' + cameraID, tScene = fn._sceneList[sceneID], tList = this._renderList;
        for (var i = 0, len = tList.length; i < len; i++) if (tList[i].uuid == uuid) MoGL.error('World', 'addRender', 0)
        if(!tScene) MoGL.error('World','addRender',1)
        if(tScene) if(!tScene.getChild(cameraID)) MoGL.error('World','addRender',2)
        var temp = {
            uuid: uuid,
            sceneID: sceneID,
            cameraID: cameraID,
            scene: tScene,
            camera: tScene.getChild(cameraID)
        }
        if (index) tList[index] = temp
        else tList.push(temp)
        return this
    },
    fn.addScene = function addScene(sceneID, scene) { MoGL.isAlive(this);
        if (this._sceneList[sceneID]) MoGL.error('World', 'addScene', 0)
        if (!(scene instanceof Scene )) MoGL.error('World', 'addScene', 1)
        this._sceneList[sceneID] = scene, scene._gl = this._gl,scene._cvs = this._cvs
        return this
    },
    fn.getScene = function getScene(sceneID) { MoGL.isAlive(this);
        return this._sceneList[sceneID] ? this._sceneList[sceneID] : null
    },
    fn.removeRender = function removeRender(sceneID, cameraID) { MoGL.isAlive(this);
        var tList = this._renderList, i, len
        for (i = 0, len = tList.length; i < len; i++){
            if (tList[i] && tList[i].uuid == sceneID + '_' + cameraID) tList.splice(i, 1)
        }
        return this
    },
    fn.removeScene = function removeScene(sceneID) { MoGL.isAlive(this);
        this._sceneList[sceneID] ? 0 : MoGL.error('World', 'addScene', 0),
            this._sceneList[sceneID]._gl = this._gl,
            delete this._sceneList[sceneID]
        return this
    }
    return MoGL.ext(World, MoGL);
})();
/**
 * Created by redcamel on 2015-05-07.
 */
var BlendMode = {
    add: 'add', //'add' - 전면색을 배경색에 더하고 올림값 0xFF를 적용.
    alpha: 'alpha',//'alpha' - 전면색의 알파값에 따라 배경색을 덮어가는 가장 일반적인 중첩.
    darken: 'darken',//'darken' - 전면색과 배경색 중 보다 어두운 색상(값이 작은 색상)을 선택.
    difference: 'difference', //'difference' - 전면색과 배경색을 비교하여 둘 중 밝은 색상 값에서 어두운 색상 값을 뺌.
    erase: 'erase', //'erase' - 전면색의 알파만 적용하여 배경색을 지움.
    hardlight: 'hardlight', //'hardlight' - 전면색의 어두운 정도를 기준으로 배경색을 조정.
    invert: 'invert', //'invert' - 전면색을 이용하여 배경색을 반전시킴.
    lighten: 'lighten', //'lighten' - 전면색과 배경색 중 보다 밝은 색(값이 큰 색상)으로 선택.
    multiply: 'multiply', //'multiply' - 전면색에 배경색을 곱하고 0xFF로 나누어 정규화하여 보다 어두운 색을 만듬.
    screen: 'screen', //'screen' - 전면색의 보수(역수)에 배경색 보수를 곱하여 표백 효과를 냄.
    subtract: 'subtract' //'subtract' - 전면색의 값을 배경색에서 빼고 내림값 0을 적용
}

/**
 * Created by redcamel on 2015-05-13.
 */
var Filter = {
    anaglyph : 'anaglyph',
    bevel : 'bevel',
    bloom : 'bloom',
    blur : 'blur',
    colorMatrix : 'colorMatrix',
    convolution : 'convolution',
    displacementMap : 'displacementMap',
    fxaa : 'fxaa',
    glow : 'glow',
    invert : 'invert',
    mono : 'mono',
    sepia : 'sepia',
    shadow : 'shadow'
}
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
/**
 * Created by redcamel on 2015-05-08.
 */
// TODO 기본으로 버텍스좌표, 노말좌표 정도까지는 알아야되는겐가?
var Primitive = {
    cube: function cube(/*splitX:int, splitY:int, splitZ:int*/) {
        // TODO 내장된 Geometry. 각 정육면체 구조를 생성함.
        // TODO ?splitX:int, splitY:int, splitZ:int - 각 면당 분할할 수. 생략시 1로 지정됨.
        // TODO scene.addChild( 'cube1', new Mesh( Primitive.cube( 2, 3, 1 ), new Material() );
        var result
        return result // TODO  어떤 지오메트리를 넘겨주는군
    },
    geodesic: function geodesic(/*split*/) {
        // TODO 내장된 Geometry. 극점에서 폴리곤이 몰리지 않도록 Geodesic 형태로 생성되는 구의 구조.
        // TODO ?split:int - 쪼개질 다각형의 갯수. 생략하거나 30이하의 값이 오면 30이 됨.
        // TODO scene.addChild( 'geo0', new Mesh( Primitive.geodesic(30), new Material() );
        var result
        return result
    },
    line: function line(x1, y1, z1, x2, y2, z2 /*,width:number*/) {
        // TODO 내장된 Geometry. 두 점을 지나는 직선.
        // TODO x1:number, y1, z1, x2, y2, z2 - 직선이 지나갈 두점(x1, y1, z1 에서 x2, y2, z2)
        // TODO ?width:number - 직선의 두께. 생략하면 1.
        // TODO scene.addChild( 'l', new Mesh( Primitive.line( 0,0,0, 10,10,10, 2 ), new Material() );
        var result
        return result
    },
    plane: function plane(/*splitX:int, splitY:int*/) {
        // TODO 내장된 Geometry. 하나의 평면.
        // TODO ?splitX:int, splitY:int - 각 면당 분할할 수. 생략시 1로 지정됨.
        // TODO scene.addChild( 'pl', new Mesh( Primitive.plane(5,5), new Material() );
        var result
        return result
    },
    point: function point(/*width:number*/) {
        // TODO 내장된 Geometry. 하나의 점을 나타내는 구조.
        // TODO ?width:number - 점의 지름. 생략하면 1.
        // TODO scene.addChild( 'p', new Mesh( Primitive.point(5), new Material() );
        var result
        return result
    },
    sphere: function sphere(/*split:int*/) {
        // TODO 내장된 Geometry. 일반적으로 극점에 삼각형이 몰리되게되는구형태의 구조물.
        // TODO ?split:int - 나뉠 면의 수. 생략하거나 8이하의 값이면 8.
        var result
        return result
    },
    skybox: function skybox(/*splitX:int, splitY:int, splitZ:int*/) {
        // TODO 내장된 Geometry. 큐브형태의 구조로 각 평면이 내부를 바라보도록 되어있음.
        // TODO ?splitX:int, splitY:int, splitZ:int - 각 면당 분할할 수. 생략시 1로 지정됨.
        // TODO scene.addChild( 'box', new Mesh( Primitive.skybox( 5, 5, 5 ), new Material() );
        var result
        return result
    }


}

/**
 * Created by redcamel on 2015-05-10.
 */

var VertexShader = {
    baseFunction: "mat4 positionMTX(vec3 t)" +
    "{\n" +
    "   return mat4( 1,0,0,0, 0,1,0,0, 0,0,1,0, t[0],t[1],t[2],1);\n" +
    "}\n" +
    'mat4 scaleMTX(vec3 t)' +
    '{\n' +
    '   return mat4( t[0],0,0,0, 0,t[1],0,0, 0,0,t[2],0, 0,0,0,1);\n' +
    '}\n' +
    'mat4 rotationMTX(vec3 t)' +
    '{\n' +
    '   float s = sin(t[0]);float c = cos(t[0]);\n' +
    '   mat4 m1 = mat4( 1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1);s = sin(t[1]);c = cos(t[1]);\n' +
    '   mat4 m2 = mat4(c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1);s = sin(t[2]);c = cos(t[2]);\n' +
    '   mat4 m3 = mat4(c,-s,0,0, s,c,0,0, 0,0,1,0, 0,0,0,1);\n' +
    '   return m3*m2*m1;\n' +
    '}\n'
}