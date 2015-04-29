# Mesh
* [Constructor](#constructor)

**field**
* [rotateX, rotateY, rotateZ](#rotatex-rotatey-rotatez)
* [scaleX, scaleY, scaleZ](#scalex-scaley-scalez)
* [x, y, z](#x-y-z)

**method**

* [getGeometry](#getgeometry)
* [getMaterial](#getmaterial)
* [getMatrix](#getmatrix)
* [getParent](#getparent)
* [getPosition](#getposition)
* [getRotate](#getrotate)
* [getScale](#getscale)
* [setGeometry](#setgeometry-geometry-)
* [setMaterial](#setmaterial-material-)
* [setMatrix](#setmatrix-matrix-)
* [setPosition](#setposition-positionarray-)
* [setRotate](#setrotate-rotatearray-)
* [setScale](#setscale-scalearray-)

[top](#)
## Constructor

```javascript
Mesh( geometry:*, material:* )
```

**description**

기하구조와 재질을 포함하는 하나의 렌더링 단위인 Mesh를 생성함.
* id를 인자로 지정하면 Scene에 addMesh하는 순간 id를 바인딩하며 실패하면 등록되지 않음.
* 객체를 인자로 지정하면 Scene에 addMesh하는 Geometry나 Material이 임의의 id로 자동등록되며, shaderId가 존재하지 않으면 실패함.

**param**

1. geometry:* - 기하구조체를 받으며 다음과 같은 형식이 올 수 있음.
    * string - Mesh가 등록될 Scene에 이미 등록되어있는 Geometry의 id를 지정함.
    * Geometry - 직접 Geometry 객체를 지정함.
    * null - null로 지정되면 scene의 렌더링 대상에서 제외됨(그룹, 카메라등에서 사용)
2. material:* - 해당 기하구조에 적용할 재질을 받으며 다음과 같은 형식이 올 수 있음.
    * string - Mesh가 등록될 Scene에 이미 등록되어있는 Material의 id를 지정함.
    * Geometry - 직접 Material 객체를 지정함.
    * null - null로 지정되면 scene의 렌더링 대상에서 제외됨(그룹, 카메라등에서 사용)

**sample**

```javascript
var mesh1 = new Mesh( 'cube', 'mat1' );
var mesh2 = new Mesh(
    new Geometry( vertex, index, 'baseShader' ),
    new Material('#f00')
);
```

[top](#)
## rotateX, rotateY, rotateZ

**description**

X, Y, Z축 회전각. 기본값은 모두 0.

**sample**
```javascript
scene.getMesh('cube').rotateX += 30;
scene.getMesh('cube').rotateY += 20;
scene.getMesh('cube').rotateZ += 50;
```

[top](#)
## scaleX, scaleY, scaleZ

**description**

X, Y, Z축 확대축소값. 기본값은 모두 1.

**sample**
```javascript
scene.getMesh('cube').scaleX = 1.5;
scene.getMesh('cube').scaleY = 1.5;
scene.getMesh('cube').scaleZ = 1.5;
```

[top](#)
## x, y, z

**description**

X, Y, Z축의 좌표.

**sample**
```javascript
scene.getMesh('cube').x = 130;
scene.getMesh('cube').y = 200;
scene.getMesh('cube').z = 0;
```

[top](#)
## getGeometry()

**description**

Mesh에 지정된 Geometry를 반환함.
만약 id로 지정되고 아직 addMesh 전이라면 null이 반환됨.

**param**

없음.

**return**

Geometry - Mesh에 지정된 Geometry 또는 null.

**sample**

```javascript
var geo = world.getScene('lobby').getMesh('cube').getGeometry();
```

[top](#)
## getMaterial()

**description**

Mesh에 지정된 Material을 반환함.
만약 id로 지정되고 아직 addMesh 전이라면 null이 반환됨.

**param**

없음.

**return**

Material - Mesh에 지정된 Material 또는 null.

**sample**

```javascript
var mat = world.getScene('lobby').getMesh('cube').getMaterial();
```

[top](#)
## getMatrix()

**description**

현재의 좌표, 회전, 확대 정보를 포함하는 Matrix객체를 반환함.

**param**

없음

**return**

Matrix - 현재 상태를 나타내는 행렬객체.

**sample**

```javascript
var matrix = world.getScene('lobby').getMesh('cube').getMatrix();
```

[top](#)
## getParent()

**description**

자신의 부모를 반환함. 부모는 Scene 또는 Group이 될 수 있음.

**param**

없음

**return**

Scene or Group - 부모로 지정된 객체. 없는 경우는 null을 반환함.

**sample**

```javascript
var parent = world.getScene('lobby').getMesh('cube').getParent();
parent === world.getScene('lobby')
```

[top](#)
## getPosition()

**description**

현재의 위치를 나타내는 [x, y, z] 배열.
* 매번 새로운 객체를 반환하는 것이 아니라 동일한 배열을 반환함.
* 배열을 값을 수정해도 실제 x, y, z가 수정되는 것은 아니므로 읽기 전용임.

**param**

없음.

**return**

Float32Array - 타입드어레이 형식으로 [x,y,z]를 반환함.

**sample**

```javascript
var x = world.getScene('lobby').getMesh('cube').getPosition()[0];
```

[top](#)
## getRotate()

**description**

현재의 회전을 나타내는 [rx, ry, rz] 배열.
* 매번 새로운 객체를 반환하는 것이 아니라 동일한 배열을 반환함.
* 배열을 값을 수정해도 실제 rx, ry, rz가 수정되는 것은 아니므로 읽기 전용임.

**param**

없음.

**return**

Float32Array - 타입드어레이 형식으로 [rx,ry,rz]를 반환함.

**sample**

```javascript
var rotateX = world.getScene('lobby').getMesh('cube').getRotate()[0];
```

[top](#)
## getScale()

**description**

현재의 확대를 나타내는 [sx, sy, sz] 배열.
* 매번 새로운 객체를 반환하는 것이 아니라 동일한 배열을 반환함.
* 배열을 값을 수정해도 실제 sx, sy, sz가 수정되는 것은 아니므로 읽기 전용임.

**param**

없음.

**return**

Float32Array - 타입드어레이 형식으로 [sx,sy,sz]를 반환함.

**sample**

```javascript
var scaleX = world.getScene('lobby').getMesh('cube').getScale()[0];
```

[top](#)
## setGeometry( geometry:* )

**description**

이 Mesh의 기하구조체를 교체함.
* addMesh 이전이라면 id계열의 객체가 scene에 존재하는지 검사하지 않고, 이후라면 즉시 검사함.

**param**

1. geometry:* - 기하구조체를 받으며 다음과 같은 형식이 올 수 있음.
    * string - Mesh가 등록될 Scene에 이미 등록되어있는 Geometry의 id를 지정함.
    * Geometry - 직접 Geometry 객체를 지정함.
    * null - null로 지정되면 scene의 렌더링 대상에서 제외됨(그룹, 카메라등에서 사용)

**return**

Geometry - 방금 등록한 Geometry. id로 지정되고 addMesh이전이면 null.

**sample**

```javascript
var mesh = world.getScene('lobby').getMesh('cube');
mesh.setGeometry( 'sphere' );
mesh.setGeometry( new Geometry( vertex, index, 'baseShader' ) );
```

[top](#)
## setMatrix( [matrix:*] )

**description**

좌표, 회전, 확대를 일시에 적용하는 행렬정보를 전달함.
* 인자를 보내지 않으면 초기화됨(좌표 0점, 회전 0, 확대 1)

**param**

1. ?matrix:* - 지정될 행렬 정보로 다음과 같은 값이 올 수 있음.
    * Array or TypedArray - 16개의 원소로 이루어진 배열로 4x4행렬의 각 요소에 대응함.
    * Matrix - Matrix 객체가 오면 그 정보를 바탕으로 처리됨.

**return**

Matrix - 설정이 완료된 Matrix객체. 매번 동일한 객체가 반환되고 읽기전용으로, 이 객체를 수정해도 Mesh에 영향이 없음.

**sample**

```javascript
var mesh = world.getScene('lobby').getMesh('cube');
mesh.setMatrix( new Matrix() );
mesh.setMatrix( [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1] );
```

[top](#)
## setMaterial( material:* )

**description**

이 Mesh의 재질을 반환함.
* addMesh 이전이라면 id계열의 객체가 scene에 존재하는지 검사하지 않고, 이후라면 즉시 검사함.

**param**

1. material:* - 해당 기하구조에 적용할 재질을 받으며 다음과 같은 형식이 올 수 있음.
    * string - Mesh가 등록될 Scene에 이미 등록되어있는 Material의 id를 지정함.
    * Geometry - 직접 Material 객체를 지정함.
    * null - null로 지정되면 scene의 렌더링 대상에서 제외됨(그룹, 카메라등에서 사용)

**return**

Material - 방금 등록한 Material. id로 지정되고 addMesh이전이면 null.

**sample**

```javascript
var mesh = world.getScene('lobby').getMesh('cube');
mesh.setMaterial( 'white' );
mesh.setMaterial( new Material('#f00') );
```

[top](#)
### setPosition( [position:Array] )
   └ setPosition( x:number, y:number, z:number )

**description**

현재 Mesh의 좌표를 재설정함. 인자를 생략하면 0점으로 초기화됨.

**param**

1. ?position:Array or TypedArray - [x, y, z] 형태의 배열.
2. x:number, y:number, z:number - 각각의 x, y, z 좌표값.

**return**

Float32Array - [x,y,z]형태의 좌표배열.

**sample**

```javascript
var mesh = world.getScene('lobby').getMesh('cube');
mesh.setPosition( 20, 5, 6 );
mesh.setPosition( [20,5, 6] );
```

[top](#)
### setRotate( [rotate:Array] )
   └ setRotate( rx:number, ry:number, rz:number )

**description**

현재 Mesh의 회전을 재설정함. 인자를 생략하면 0으로 초기화됨.

**param**

1. ?rotate:Array or TypedArray - [rx, ry, rz] 형태의 배열.
2. rx:number, ry:number, rz:number - 각각의 x, y, z 회전값.

**return**

Float32Array - [rx,ry,rz]형태의 좌표배열.

**sample**

```javascript
var mesh = world.getScene('lobby').getMesh('cube');
mesh.setRotate( 20, 180, 0 );
mesh.setRotate( [20, 180, 6] );
```

[top](#)
### setScale( [scale:Array] )
   └ setScale( sx:number, sy:number, sz:number )

**description**

현재 Mesh의 확대를 재설정함. 인자를 생략하면 1로 초기화됨.

**param**

1. ?scale:Array or TypedArray - [sx, sy, sz] 형태의 배열.
2. sx:number, sy:number, sz:number - 각각의 x, y, z 확대값.

**return**

Float32Array - [sx,sy,sz]형태의 좌표배열.

**sample**

```javascript
var mesh = world.getScene('lobby').getMesh('cube');
mesh.setScale( 1, 2.5, 0.8 );
mesh.setScale( [1, 2.5, 0.8] );
```
