# Camera
* parent : [Mesh](Mesh.md)
* [Constructor](#constructor)

**field**

**method**

* [getBackgroundColor](#setBackgroundColor)
* [getClipPlane](#)
* [getFilters](#)
* [getFog](#)
* [getFOV](#)
* [getProjectionMatrix](#)
* [getRenderArea](#setBackgroundColor)
* [getStereo](#)
* [getVisible](#)
* [setBackgroundColor](#setBackgroundColor)
* [setClipPlane](#)
* [setFilter](#)
* [setFog](#)
* [setFOV](#)
* [setOthogonal](#)
* [setPerspective](#)
* [setProjectionMatrix](#)
* [setRenderArea](#setBackgroundColor)
* [setStereo](#)
* [setVisible](#)
* [removeFilter](#)

[top](#)
## Constructor

```javascript
Camera()
```

**description**

1. 실제 화면에 표시될 영역과 내용을 결정하는 것은 카메라에 의존함.
2. 카메라는 Scene에 소속되어 특정 장면을 포착하며 이를 프레임버퍼에 그리는 정보로 제공함.
3. [World](World.md)는 이러한 카메라를 렌더링 대상으로 다수 등록하여 하나의 장면을 그려냄.

**param**
없음,

**sample**

```javascript
var cam = new Camera();

//팩토리함수로도 사용가능
var cam2 = Camera();
```
[top](#)
## getBackgroundColor()

**description**

**param**
없음.

**return**

Array - [r,g,b,a] 형식으로 정의된 배열을 반환. 이 배열은 읽기 전용으로 갱신해도 객체에 반영되지 않음.

**sample**

```javascript
var cam = Camera().getRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getClipPlane()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getFilters()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getFog()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getFOV()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getProjectionMatrix()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getRenderArea()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getStereo()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## getVisible()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setBackgroundColor( color:String )
   └ setBackgroundColor( r:number, b:number, b:number,a:number )

**description**

렌더 배경색상을 지정함

**param**

1. color - #fff or #ffffff
2. r:number, b:number, b:number,a:number - r,g,b,a 값으로 배경색 지정

**return**

this - 메서드체이닝을 위해 자신을 반환함.

**sample**
```javascript
scene.getChild('camera').setBackgroundColor('#fff')
scene.getChild('camera').setBackgroundColor(1,0.4,0.3,1)
```

[top](#)
## setClipPlane()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setFilter()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setFog()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setFOV()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setOthogonal()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setPerspective()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setProjectionMatrix()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setRenderArea( left:*, top:*, width:*, height:* )

**description**

프레임버퍼에 그려질 영역을 설정함.

**param**

1. left:* - 실제 화면에 그려질 좌측좌표. 숫자 또는 '10%' 와 같은 퍼센트 문자열이 올 수 있음.
2. top:* - 실제 화면에 그려질 상단좌표. 숫자 또는 '10%' 와 같은 퍼센트 문자열이 올 수 있음.
3. width:* - 실제 화면에 그려질 가로크기. 숫자 또는 '10%' 와 같은 퍼센트 문자열이 올 수 있음.
4. height:* - 실제 화면에 그려질 세로크기. 숫자 또는 '10%' 와 같은 퍼센트 문자열이 올 수 있음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setStereo()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## setVisible()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
## removeFilter()

**description**

**param**
없음.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setRenderArea( 10, 20, '50%', '50%' );
```

[top](#)
