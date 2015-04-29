# Mesh
* [Constructor](#constructor)

**field**
* [rotateX, rotateY, rotateZ](#rotateX)
* [scaleX, scaleY, scaleZ](#scaleX)
* [x, y, z](#x)

**method**

* [getGeometry](#getgeomtry-idstring-)
* [getMaterial](#getmaterial-idstring-)
* [getMatrix](#getmesh-idstring-)
* [getParent](#getmesh-idstring-)
* [getPosition](#getmesh-idstring-)
* [getRotate](#getmesh-idstring-)
* [getScale](#getmesh-idstring-)
* [setMatrix](#getmesh-idstring-)
* [setGeometry](#removegeometry-idstring-)
* [setMaterial](#removematerial-idstring-)
* [setRotate](#getmesh-idstring-)
* [setScale](#getmesh-idstring-)


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

## rotateX, rotateY, rotateZ

**description**

X, Y, Z축 회전각. 기본값은 모두 0.

**sample**
```javascript
scene.getMesh('cube').rotateX += 30;
scene.getMesh('cube').rotateY += 20;
scene.getMesh('cube').rotateZ += 50;
```


## scaleX, scaleY, scaleZ

**description**

X, Y, Z축 확대축소값. 기본값은 모두 1.

**sample**
```javascript
scene.getMesh('cube').scaleX = 1.5;
scene.getMesh('cube').scaleY = 1.5;
scene.getMesh('cube').scaleZ = 1.5;
```


## x, y, z

**description**

X, Y, Z축의 좌표.

**sample**
```javascript
scene.getMesh('cube').x = 130;
scene.getMesh('cube').y = 200;
scene.getMesh('cube').z = 0;
```


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



## setRotate( id:string )

**description**

id에 해당되는 Camera를 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

Camera - id에 해당되는 Camera 인스턴스.

**sample**

```javascript
var lobby = world.getScene('lobby');
lobby.addCamera( 'frontView', new Camera() );
var frontView = lobby.getCamera('frontView');
```


## getGeomtry( id:string )

**description**

id에 해당되는 Geometry를 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

Geometry - id에 해당되는 Geometry 인스턴스.

**sample**

```javascript
var cube = world.getScene('lobby').getGeometry('cube');
```

## getLight( id:string )

**description**

id에 해당되는 Light를 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

Light - id에 해당되는 Light 인스턴스.

**sample**

```javascript
var light = world.getScene('lobby').getLight('centerLight');
```


## getMaterial( id:string )

**description**

id에 해당되는 Material을 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

Material - id에 해당되는 Material 인스턴스.

**sample**

```javascript
var cube = world.getScene('lobby').getMaterial('white');
```

## getMesh( id:string )

**description**

id에 해당되는 Mesh를 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

Mesh - id에 해당되는 Mesh 인스턴스.

**sample**

```javascript
var cube = world.getScene('lobby').getMesh('cube');
```

## getTexture( id:string )

**description**

id에 해당되는 texture 이미지를 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

image엘리먼트 - id에 해당되는 image엘리먼트. src는 dataURL로 되어있음.

**sample**

```javascript
var normal = world.getScene('lobby').getTexture('normal');
console.log( normal.src ); //dataURL 형식으로 보여짐.
```

## removeCamera( id:string )

**description**

등록된 Camera를 제거함.
* 제거시 world의 render에 관련된 정보도 동시에 삭제됨.

**param**

1. id:string - addCamera에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeCamera('frontView');
```


## removeFragmentShader( id:string )

**description**

등록된 fragment shader를 제거함.
* 제거시 scene내에서 해당 shader를 참조하는 Material을 소유한 Mesh가 전부 삭제됨.

**param**

1. id:string - addFragmentShader에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeFragmentShader('base');
```


## removeGeometry( id:string )

**description**

등록된 Geometry를 삭제함.
* 삭제시 Scene을 조사하여 해당 Geometry를 참조하는 Mesh도 전부 삭제됨.

**param**

1. id:string - addGeometry에서 사용할 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
var lobby = world.getScene('lobby');
lobby.addGeometry( 'building', new Geometry( v1, i1 ) );

lobby.removeGeometry('building');
```

## removeLight( id:string )

**description**

등록된 Light를 제거함.

**param**

1. id:string - addLight에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeLight('centerLight');
```


## removeMaterial( id:string )

**description**

등록된 Material을 제거함.
* 해당 Material을 참고하는 scene내의 모든 Mesh도 제거됨.

**param**

1. id:string - addCamera에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeCamera('frontView');
```

## removeMesh( id:string )

**description**

등록된 Mesh를 제거함.
* Group제거시 Group에 등록된 Mesh일체가 제거됨.

**param**

1. id:string - addCamera에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeCamera('frontView');
```


## removeTexture( id:string )

**description**

등록된 Texture를 제거함.
* 제거시 scene내의 참조하고 있는 Material을 전부 삭제하고 삭제된 Material을 참조하는 Mesh도 일괄삭제됨.

**param**

1. id:string - addTexture에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeTexture('white');
```


## removeVertexShader( id:string )

**description**

등록된 vertex shader를 제거함.
* 제거시 scene 내의 참조중인 Mesh도 일괄 삭제됨.

**param**

1. id:string - addVertextShader에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeVertexShader('base');
```


## World.cube

**description**

내장된 Geometry.
각 평면이 두 개의 삼각형으로 구성된 정육면체 구조.

**sample**

```javascript
scene.addMesh( 'cube1', new Mesh( World.cube, new Material() );
```


## World.geodesic

**description**

내장된 Geometry.
극점에서 폴리곤이 몰리지 않도록 Geodesic 형태로 생성되는 구의 구조. 기본값 30. n면체지원(최대 200)


**sample**

```javascript
scene.addMesh( 'geo0', new Mesh( World.geodesic, new Material() );
scene.addMesh( 'geo1', new Mesh( World.geodesic[50], new Material() );
```

## World.line

**description**

내장된 Geometry.
x축에 병행하며 0점을 지나는 직선.

**sample**

```javascript
scene.addMesh( 'l', new Mesh( World.line, new Material() );
```


## World.plane

**description**

내장된 Geometry.
두 개의 삼각형으로 구성된 평면구조.

**sample**

```javascript
scene.addMesh( 'pl', new Mesh( World.plane, new Material() );
```


## World.point

**description**

내장된 Geometry.
하나의 점을 나타내는 구조.

**sample**

```javascript
scene.addMesh( 'p', new Mesh( World.point, new Material() );
```


## World.sphere

**description**

내장된 Geometry.
최소 8면체에서 n면체를 지원하는 구형태의 구조(최대 200)
인덱스를 통해 원하는 삼각형의 수를 지정할 수 있음.

**sample**

```javascript
scene.addMesh( 's0', new Mesh( World.sphere, new Material() );
scene.addMesh( 's1', new Mesh( World.sphere[50], new Material() );
```


## World.skybox

**description**

내장된 Geometry.
큐브형태의 구조로 각 평면이 내부를 바라보도록 되어있음.

**sample**

```javascript
scene.addMesh( 'box', new Mesh( World.skybox, new Material() );
```
