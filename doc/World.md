# World
* [Constructor](#constructor)

**method**

* [addRender](#addrender-sceneidstring-cameraidstring-indexint--)
* [addScene](#addscene-idstring-scenescene-)
* [getScene](#getscene-idstring-)
* [removeRender](#removerender-sceneidstring-cameraidstring--)
* [removeScene](#removescene-idstring-)

**const**

* [World.cube](#worldcube)
* [World.geodesic](#worldgeodesic)
* [World.line](#worldline)
* [World.plane](#worldplane)
* [World.point](#worldpoint)
* [World.sphere](#worldsphere)
* [World.skybox](#worldskybox)


## Constructor

```javascript
World()
```

**description**

World는 MOGL의 기본객체로 내부에 다수의 Scene을 소유할 수 있으며 실제 렌더링되는 대상임.
또한 World의 인스턴스는 rendering 함수 그 자체이기도 함.

**param**

없음.

**sample**

```javascript
var world = new World();

//애니메이션 루프에 인스턴스를 넣는다.
requestAnimationFrame( world );
```

## addRender( sceneId:string, cameraId:string[, index:int]  )

**description**

실제 그려질 대상을 추가함. 다수 등록 가능.

**param**

1. sceneId:string - 그려질 대상 Scene의 등록시 id.
2. cameraId:string - 해당 Scene 내의 카메라 등록시 id.
3. ?index:int - 그려질 순서. 생략하면 마지막 index + 1로 설정됨.

**return**

없음.

**sample**

```javascript
// Scene과 Camara생성 및 등록
var lobby = new Scene();
lobby.addCamera( 'cam1', new Camera() );

// Scene 등록 및 렌더대상 등록
var world = new World();
world.addScene( 'lobby', lobby );
world.addRender( 'lobby', 'cam1' );
```

## addScene( id:string, scene:Scene )

**description**

Scene객체를 world에 추가함.

**param**

1. id:string - removeScene, getScene 등에서 사용할 id
2. scene:Scene - Scene의 인스턴스

**return**

Scene - 방금 추가한 Scene의 인스턴스

**sample**

```javascript
var world = new World();
world.addScene( 'lobby', new Scene() );
world.addScene( 'room', new Scene() );
```


## getScene( id:string )

**description**

id에 해당되는 Scene을 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

Scene - id에 해당되는 Scene 인스턴스.

**sample**

```javascript
var world = new World();
world.addScene( 'lobby', new Scene() );
var lobby = world.getScene( 'lobby' );
```


## removeRender( sceneId:string, cameraId:string  )

**description**

해당 대상을 렌더링 대상에서 제외함.

**param**

1. sceneId:string - 그려질 대상 Scene의 등록시 id.
2. cameraId:string - 해당 Scene 내의 카메라 등록시 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
// Scene과 Camara생성 및 등록
var lobby = new Scene();
lobby.addCamera( 'cam1', new Camera() );

// Scene 등록 및 렌더대상 등록
var world = new World();
world.addScene( 'lobby', lobby );
world.addRender( 'lobby', 'cam1' );

// 렌더대상에서 제외
world.removeRender( 'lobby', 'cam1' );
```

## removeScene( id:string )

**description**

Scene객체를 world에서 제거함.
Scene을 제거하면 관련된 카메라가 지정된 render도 자동으로 제거됨.

**param**

1. id:string - removeScene, getScene 등에서 사용할 id

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
// Scene과 Camara생성 및 등록
var lobby = new Scene();
lobby.addCamera( 'cam1', new Camera() );

// Scene 등록 및 렌더대상 등록
var world = new World();
world.addScene( 'lobby', lobby );
world.addRender( 'lobby', 'cam1' );

// Scene 제거
world.removeScene( 'lobby' );
// 해당 렌더가 이미 제거되어있음
world.removeRender( 'lobby', 'cam1' ) === false
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
