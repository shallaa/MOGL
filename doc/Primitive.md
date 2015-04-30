## Primitive

**static**

* [Primitive.cube](#Primitivecube)
* [Primitive.geodesic](#Primitivegeodesic)
* [Primitive.line](#Primitiveline)
* [Primitive.plane](#Primitiveplane)
* [Primitive.point](#Primitivepoint)
* [Primitive.sphere](#Primitivesphere)
* [Primitive.skybox](#Primitiveskybox)


## Primitive.cube( [splitX:int, splitY:int, splitZ:int] )

**description**

내장된 Geometry.
각 평면이 두 개의 삼각형으로 구성된 정육면체 구조.

**sample**

```javascript
scene.addMesh( 'cube1', new Mesh( Primitive.cube, new Material() );
```


## Primitive.geodesic

**description**

내장된 Geometry.
극점에서 폴리곤이 몰리지 않도록 Geodesic 형태로 생성되는 구의 구조. 기본값 30. n면체지원(최대 200)


**sample**

```javascript
scene.addMesh( 'geo0', new Mesh( Primitive.geodesic, new Material() );
scene.addMesh( 'geo1', new Mesh( Primitive.geodesic[50], new Material() );
```

## Primitive.line

**description**

내장된 Geometry.
x축에 병행하며 0점을 지나는 직선.

**sample**

```javascript
scene.addMesh( 'l', new Mesh( Primitive.line, new Material() );
```


## Primitive.plane

**description**

내장된 Geometry.
두 개의 삼각형으로 구성된 평면구조.

**sample**

```javascript
scene.addMesh( 'pl', new Mesh( Primitive.plane, new Material() );
```


## Primitive.point

**description**

내장된 Geometry.
하나의 점을 나타내는 구조.

**sample**

```javascript
scene.addMesh( 'p', new Mesh( Primitive.point, new Material() );
```


## Primitive.sphere

**description**

내장된 Geometry.
최소 8면체에서 n면체를 지원하는 구형태의 구조(최대 200)
인덱스를 통해 원하는 삼각형의 수를 지정할 수 있음.

**sample**

```javascript
scene.addMesh( 's0', new Mesh( Primitive.sphere, new Material() );
scene.addMesh( 's1', new Mesh( Primitive.sphere[50], new Material() );
```


## Primitive.skybox

**description**

내장된 Geometry.
큐브형태의 구조로 각 평면이 내부를 바라보도록 되어있음.

**sample**

```javascript
scene.addMesh( 'box', new Mesh( Primitive.skybox, new Material() );
```
