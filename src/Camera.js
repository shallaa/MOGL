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
        this._a = 1
    }
    fn = Camera.prototype
    fn.getBackgroundColor = function getBackgroundColor(){MoGL.isAlive(this);
        return a4[0] = this._r, a4[1] = this._g, a4[2] = this._b, a4[3] = this._a, a4
    },
    fn.getClipPlane = function getClipPlane(){MoGL.isAlive(this);
    },
    fn.getFilters = function getFilters(){MoGL.isAlive(this);
    },
    fn.getFog = function getFog(){MoGL.isAlive(this);
    },
    fn.getFOV = function getFOV(){MoGL.isAlive(this);
    },
    fn.getProjectionMatrix = function getProjectionMatrix(){MoGL.isAlive(this);
    },
    fn.getRenderArea = function getRenderArea(){MoGL.isAlive(this);
    },
    fn.getStereo = function getStereo(){MoGL.isAlive(this);
    },
    fn.getVisible = function getVisible(){MoGL.isAlive(this);
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
    fn.setClipPlane = function setClipPlane(){MoGL.isAlive(this);
        return this
    },
    fn.setFilter = function setFilter(){MoGL.isAlive(this);
        return this
    },
    fn.setFog = function setFog(){MoGL.isAlive(this);
        return this
    },
    fn.setFOV = function setFOV(){MoGL.isAlive(this);
        return this
    },
    fn.setOthogonal = function setOthogonal(){MoGL.isAlive(this);
        return this
    },
    fn.setPerspective = function setPerspective(){MoGL.isAlive(this);
        return this
    },
    fn.setProjectionMatrix = function setProjectionMatrix(){MoGL.isAlive(this);
        return this
    },
    fn.setRenderArea = function setRenderArea(){MoGL.isAlive(this);
        return this
    },
    fn.setStereo = function setStereo(){MoGL.isAlive(this);
        return this
    },
    fn.setVisible = function setVisible(){MoGL.isAlive(this);
        return this
    },
    fn.removeFilter = function removeFilter(){MoGL.isAlive(this);
        return this
    }
    return MoGL.ext(Camera, Mesh);
})();