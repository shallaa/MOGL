/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn,a4=[];
    var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, hex_s = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
    Camera = function Camera() {
        this._geometry = new Geometry([], [])
        this._material = new Material()
        this._r = 0,
        this._g = 0,
        this._b = 0,
        this._a = 1,
        this._fov = 55 * Math.PI / 180,
        this._near = 0.1,
        this._far = 100000,
        this._renderArea = null,
        this._visible=1,
        this._filters ={},
        this._fog = null,
        this._stereo = null
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
        //TODO
    },
    fn.getFog = function getFog(){MoGL.isAlive(this);
        return this._fog
    },
    fn.getFOV = function getFOV(){MoGL.isAlive(this);
        return this._fov
    },
    fn.getProjectionMatrix = function getProjectionMatrix(){MoGL.isAlive(this);
        //TODO 크기를 반영해야함..
        //TODO 이렇다는건...카메라 렌더시에 _renderArea를 알고있다는 가정인가?
        var aspectRatio = this._renderArea[2]/this._renderArea[3],yScale = 1.0 / Math.tan(this._fov / 2.0),xScale = yScale / aspectRatio;
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
    fn.getStereo = function getStereo(){MoGL.isAlive(this);
        //TODO
    },
    fn.getVisible = function getVisible(){MoGL.isAlive(this);
        return this._visible
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
    fn.setFilter = function setFilter(){MoGL.isAlive(this);
        //TODO
        return this
    },
    fn.setFog = function setFog(){MoGL.isAlive(this);
        //TODO
        return this
    },
    fn.setFOV = function setFOV(value){MoGL.isAlive(this);
        this._fov = value
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
        //TODO
        this._renderArea = [x,y,w,h]
        return this
    },
    fn.setStereo = function setStereo(){MoGL.isAlive(this);
        //TODO
        return this
    },
    fn.setVisible = function setVisible(value){MoGL.isAlive(this);
        this._visible=value
        return this
    },
    fn.removeFilter = function removeFilter(){MoGL.isAlive(this);
        //TODO
        return this
    }
    return MoGL.ext(Camera, Mesh);
})();