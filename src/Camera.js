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