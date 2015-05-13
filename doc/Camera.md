# Camera
* parent : [Mesh](Mesh.md)
* [Constructor](#constructor)

**field**

**method**

* [getAntialias](#)
* [getBackgroundColor](#setBackgroundColor)
* [getClipPlane](#)
* [getFilters](#)
* [getFog](#)
* [getFOV](#)
* [getProjectionMatrix](#)
* [getRenderArea](#setBackgroundColor)
* [getVisible](#)
* [setAntiAlias](#)
* [setBackgroundColor](#setBackgroundColor)
* [setClipPlane](#)
* [setFilter](#)
* [setFog](#)
* [setFOV](#)
* [setOthogonal](#)
* [setPerspective](#)
* [setProjectionMatrix](#)
* [setRenderArea](#setBackgroundColor)
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
## getAntialias()

**description**

쉐이더 레벨의 안티알리아스 적용 여부를 반환함.

**param**
없음.

**return**

boolean - 안티알리아스 적용여부

**sample**

```javascript
console.log( Camera().getAntialias() );
```

[top](#)
## getBackgroundColor()

**description**

기본으로 지정된 배경색을 반환함.

**param**
없음.

**return**

Array - [r,g,b,a] 형식으로 정의된 배열을 반환. 이 배열은 읽기 전용으로 갱신해도 객체에 반영되지 않음.

**sample**

```javascript
console.log( Camera().getBackgroundColor() ); //[0,0,0,1]
```

[top](#)
## getClipPlane()

**description**

절두체 정보를 반환함. 가까운 z축의 절단 위치와 먼쪽의 z축 절단 위치를 담아 배열로 반환함.

**param**
없음.

**return**

Array - [near, far] 형식으로 정의된 배열을 반환. 이 배열은 읽기 전용으로 갱신해도 객체에 반영되지 않음.

**sample**

```javascript
console.log( Camera().getClipPlane() ); //[10, 100]
```

[top](#)
## getFilters()

**description**

현재 적용되어있는 후처리필터의 목록을 반환함.

**param**
없음.

**return**

Array - [filterName, filterName..] 형식으로 정의된 배열을 반환. 이 배열은 읽기 전용으로 갱신해도 객체에 반영되지 않음.

**sample**

```javascript
console.log( Camera().getFilters() ); //['blur', 'glow']
```

[top](#)
## getFog()

**description**

절두체 뒤쪽의 객체에 대해서 안개처리를 하고 있는지 여부를 반환함.

**param**
없음.

**return**

boolean - 안개처리 여부.

**sample**

```javascript
console.log( Camera().getFog() );
```

[top](#)
## getFOV()

**description**

어안효과를 위한 왜곡값을 반환함.

**param**
없음.

**return**

number - 어안효과의 정도 값.

**sample**

```javascript
console.log( Camera().getFOV() );
```

[top](#)
## getProjectionMatrix()

**description**

실제 투영에 사용되고 있는 현재의 행렬을 반환함.

**param**
없음.

**return**

[Matrix](Matrix.md) - 현재 투영을 나타내는 행렬.

**sample**

```javascript
var mat = Camera().getProjectionMatrix();
```

[top](#)
## getRenderArea()

**description**

실제 화면에 그려질 영역을 나타냄.

**param**
없음.

**return**

Array - [left, top, width, heigth] 형태로 반환함.

**sample**

```javascript
var area = Camera().getRenderArea();
```


[top](#)
## getVisible()

**description**

카메라가 렌더링이 포함될 것인지를 반환함.

**param**
없음.

**return**

boolean - 렌더링 대상 여부.

**sample**

```javascript
var isRenderTarget = Camera().getVisible();
```

[top](#)
## setAntialias( isAntialias:boolean )

**description**

쉐이더레벨의 안티알리아스 적용여부를 설정함.

**param**
1. isAntialias:boolean - 안티알리아스 적용여부.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setAntialias( true );
```

[top](#)
## setBackgroundColor( color:String )
└ setBackgroundColor( r:number, b:number, b:number, a:number )

**description**

실제 렌더링 시의 기본 배경색을 지정함. 기본값은 [0,0,0,1] 상태임.

**param**

1. color:string - '#RGB', '#RRGGBB', '#RGBA', '#RRGGBBA' 형식의 문자열.
2. r:number, b:number, b:number, a:number - r, g, b, a값으로 배경색 지정. r, g, b, a는 모두 0~1사이의 소수.

**return**

this - 메서드체이닝을 위해 자신을 반환함.

**sample**
```javascript
scene.getChild('camera').setBackgroundColor('#fff')
scene.getChild('camera').setBackgroundColor(1,0.4,0.3,1)
```

[top](#)
## setClipPlane( near:number, far:number )

**description**

절두체의 z범위를 지정함.

**param**
1. near:number - 절두체의 가까운 쪽 기준 z값.
2. far:number - 절두체의 먼 쪽 기준 z값.

**return**

this - 메서드체이닝을 위해 자신을 반환.

**sample**

```javascript
var cam = Camera().setClipPlane( 10, 200 );
```

[top](#)
## setFilter( filter:string[, needle:*...] )

**description**

프레임버퍼레벨에서 수행될 후처리 필터를 등록함. 다수의 필터 등록 가능.

**param**
1. filter:string - 등록될 필터의 이름 다음과 같은 값이 올 수 있음.
    * [Filter.bevel](Filter.md#bevel) or 'bevel' - 경사효과를 줄 수 있는 필터.
    * [Filter.blur](Filter.md#blur) or 'blur' - 흐름효과를 줄 수 있는 필터.
    * [Filter.colorMatrix](Filter.md#colormatrix) or 'colorMatrix' - 행렬변환을 이용해 색상을 변화시키는 필터.
    * [Filter.convolution](Filter.md#convolution) or 'convolution' - 행렬회선을 이용한 필터 효과.
    * [Filter.displacementMap](Filter.md#displacementmap) or 'displacementMap' - 지정된 텍스쳐를 이용한 왜곡효과를 주는 필터.
    * [Filter.shadow](Filter.md#shadow) or 'shadow' - 그림자효과를 줄 수 있는 필터.
    * [Filter.glow](Filter.md#glow) or 'glow' - 광선효과를 줄 수 있는 필터.
    * [Filter.mono](Filter.md#mono) or 'mono' - 흑백효과를 줄 수 있는 필터.
    * [Filter.sepia](Filter.md#sepia) or 'sepia' - 세피아효과를 줄 수 있는 필터.
    * [Filter.invert](Filter.md#invert) or 'invert' - 반전효과를 줄 수 있는 필터.
    * [Filter.bloom](Filter.md#bloom) or 'bloom' - 일명 뽀샤시효과를 줄 수 있는 필터.
    * [Filter.fxaa](Filter.md#fxaa) or 'fxaa' - 후처리 안티알리아스 필터를 적용함.
    * [Filter.anaglyph](Filter.md#anaglyph) or 'anaglyph' - 입체영상을 위한 스테레오를 적용함.

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
