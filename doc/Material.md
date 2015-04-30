# Material
* [Constructor](#constructor)

**method**

* [getRefCount](#getvolume)

**const**

* [Material.image](#materialphong]
* [Material.flat](#materialphong]
* [Material.gouraud](#materialphong]
* [Material.phong](#materialphong]
[top](#)
## Constructor

```javascript
Material( [color:string]  )
```
└ Material( r:number, g:bumber, b:number, a:number )

**description**

실제 렌더링 될 대상의 재질을 정의함.
* Material의 메서드는 대부분 메서드체이닝을 지원함.

**param**

1. ?color:string - 재질의 기본적인 색상. 생략하면 색상 없음. 다음과 같은 형태가 올 수 있음.
    * '#FFF' - 3자리 16진수의 경우 자동으로 RRGGBB로 해석되고 알파는 1이 됨.
    * '#FFFFFF' - 6자리 16진수의 경우 알파는 1이 됨.
    * '#FFFFFF0.7' - 6자리 16진수 이후 오는 숫자는 알파로 해석되며 0~1사이의 소수가 올 수 있음.
2. r, g, b, a : 각각 0~1 사이의 소수를 받으며 각각 대응함.

**sample**

```javascript
var mat1 = new Material('#f00');
var mat2 = new Material('#ff0000');
var mat3 = new Material('#ff00000.8');
var mat4 = new Material( 0xff/0xff, 0xaf/0xff, 0x45/0xff, 0.5 );
```

[top](#)
## addTex( id:string )

**description**

Mesh를 통해 최종적으로 포함될 Scene에 등록된 shader를 사용함.
* Scene에 직접 등록되는 경우는 id를 addGeometry 시점에 평가함.
* Mesh에서 직접 생성하여 삽입하는 경우는 addMesh시점에 평가함.
* 이미 직간접적으로 Scene에 포함된 경우는 메서드호출시점에 평가함.

**param**

1. id:string - 최종 포함될 Scene에 등록된 vertex shader의 id.

**return**

Geometry - 메서드체이닝을 위해 자신을 반환함.

**sample**

```javascript
var lobby = world.getScene('lobby');

// waffle shader등록
lobby.addVertexShader( 'waffle', vshader );

// Geometry 생성 및 Scene 등록
var cube = lobby.addGeometry( 'cube', new Geometry( v1, i1 ) );

//이미 Scene에 등록된 Geometry므로 메서드 호출시점에 평가
cube.addVertexShader( 'waffle' )  //waffle shader가 존재하지 않으면 에러

//미등록된 Geometry
var sample = new Geometry( v2, i2, info2 );
sample.addVertexShader('aaa')  //미등록객체는 무조건 통과됨
```

[top](#)
## getVertexCount()

**description**

Geometry에 정의된 정점의 갯수.

**param**

없음.

**return**

number - Geometry에 정의된 정점의 갯수.

**sample**

```javascript
var cube = world.getScene('lobby').getGeometry('cube');
var vcount = cube.getVertexCount();
```

[top](#)
## getTriangleCount()

**description**

Geometry에 정의된 삼각면의 갯수.

**param**

없음

**return**

number - Geometry에 정의된 삼각면의 갯수.

**sample**

```javascript
var cube = world.getScene('lobby').getGeometry('cube');
var tcount = cube.getTriangleCount();
```

[top](#)
## getVolume()

**description**

x,y,z축 기준의 크기를 배열로 반환함.

**param**

없음

**return**

TypedArray - [x크기, y크기, z크기] 형태의 배열. 매번 같은 객체를 반환하고 수정해도 반영되지 않는 읽기 전용.

**sample**

```javascript
var cube = world.getScene('lobby').getGeometry('cube');
var sizeX = cube.getVolume()[0];
```

[top](#)
## removeVertexShader( id:string )

**description**

addVertexShader를 통해 등록한 shader를 제거함.

**param**

1. id:string - addVertexShader에서 지정한 id.

**return**

Geometry - 메서드 체이닝을 위해 자신을 반환함.

**sample**

```javascript
var cube = lobby.addGeometry( 'cube', new Geometry( v1, i1 ) );
cube.addVertexShader('waffle').removeVertexShader('waffle');
```

[top](#)
## Geometry.x

**description**

개별 정점요소의 정보. x좌표. 'x'

[top](#)
## Geometry.y

**description**

개별 정점요소의 정보. y좌표. 'y'

[top](#)
## Geometry.z

**description**

개별 정점요소의 정보. z좌표. 'z'

[top](#)
## Geometry.r

**description**

개별 정점요소의 정보. 색상 Red값. 'r'

[top](#)
## Geometry.g

**description**

개별 정점요소의 정보. 색상 Green값. 'g'

[top](#)
## Geometry.b

**description**

개별 정점요소의 정보. 색상 Blue값. 'b'

[top](#)
## Geometry.a

**description**

개별 정점요소의 정보. 색상 Alpha값. 'a'

[top](#)
## Geometry.normalX

**description**

개별 정점요소의 정보. 법선 벡터의 x값. 'nx'

[top](#)
## Geometry.normalY

**description**

개별 정점요소의 정보. 법선 벡터의 y값. 'ny'

[top](#)
## Geometry.normalZ

**description**

개별 정점요소의 정보. 법선 벡터의 z값. 'nz'

[top](#)
