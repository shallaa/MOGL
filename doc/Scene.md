# Scene
* [Constructor](#Constructor)

**method**

* [addCamera](#addcamera-idstring-cameracamera-)
* [addFragmentShader](#addfragmentshader-idstring-programstring-)
* [addGeometry](#addgeometry-idstring-geomertygeometry-)
* [addLight](#addlight-idstring-lightlight--)
* [addMaterial](#addmaterial-idstring-materialmaterial-)
* [addMesh](#addmesh-idstring-meshmesh-)
* [addTexture](#addtexture-idstring-image-resizetypestring-)
* [addVertextShader](#addvertexshader-idstring-programstring-)
* [getCamera](#getcamera-idstring-)
* [getGeometry](#getgeomtry-idstring-)
* [getLight](#getlight-idstring-)
* [getMaterial](#getmaterial-idstring-)
* [getMesh](#getmesh-idstring-)
* [getTexture](#gettexture-idstring-)
* [removeCamera](#removecamera-idstring-)
* [removeFragmentShader](#removefragmentshader-idstring-)
* [removeGeometry](#removegeometry-idstring-)
* [removeLight](#removelight-idstring-)
* [removeMaterial](#removematerial-idstring-)
* [removeMesh](#removemesh-idstring-)
* [removeTexture](#removetexture-idstring-)
* [removeVertextShader](#removevertexshader-idstring-)


## Constructor

```javascript
Scene()
```

**description**

실제 렌더링될 기하구조체는 Scene별도 집결됨.
렌더링 단위인 Camera는 한번에 하나의 Scene만 가리킬 수 있음.

**param**

없음.

**sample**

```javascript
var scene = new Scene();
```

## addCamera( id:string, camera:Camera )

**description**

실제 렌더링될 화면을 가리키는 카메라를 등록함.
Scene 한 개에 다수의 카메라를 등록할 수 있음.
* 일단 Scene에 등록된 카메라를 다른 Scene에 등록하면 기존 Scene과의 연결은 끊어지고, 관련된 World의 render설정도 삭제됨.

**param**

1. id:string - removeCamera, getCamera 등에서 사용할 id.
2. camera:Camera - Camera의 인스턴스.

**return**

Camera - 방금 추가한 Camera의 인스턴스.

**sample**

```javascript
var city1 = new Scene();
city1.addCamera( 'frontView', new Camera() );
```


## addFragmentShader( id:string, program:string )

**description**

실제 사용될 shader를 등록함.

**param**

1. id:string - removeFragmentShader, getFragmentShader 등에서 사용할 id.
2. program:string - 실제 shader 코드의 문자열.

**return**

없음

**sample**

```html
<script id="fshader" type="text/shader">
precision mediump float;
uniform sampler2D uSampler;
varying vec2 vUV;
void main(void) {
     gl_FragColor =  texture2D(uSampler, vec2(vUV.s, vUV.t));
}
</script>
```

```javascript
var lobby = new Scene();
var shader = document.getElementById('fshader').text;
lobby.addFragmentShader( 'base', shader );
```


## addGeometry( id:string, geomerty:Geometry )

**description**

기하구조체인 Geometry를 등록함.

**param**

1. id:string - removeScene, getScene 등에서 사용할 id.
2. geomerty:Geometry - Geometry의 인스턴스.

**return**

Geometry - 방금 추가한 Geometry의 인스턴스.

**sample**

```javascript
// 월드를 정의하고 빌딩용 지오메트리를 등록
var lobby = world.getScene('lobby');
lobby.addGeometry( 'building', new Geometry( v1, i1 ) );

// 장면을 정의하고 텍스쳐를 등록
city1.addTexture( 'red', new Texture( 'color', 'color' ).setColor('#f00') );
city1.addTexture( 'green', new Texture( 'color', 'color' ).setColor('#0f0') );
city1.addTexture( 'blue', new Texture( 'color', 'color' ).setColor('#00f') );

// 실제 빌딩 메쉬 생성
var building = new Mesh( 'building', new Material('red') );

// 장면에 추가
city1.addMesh( 'building', building );

// 하나의 Geometry는 여러 메쉬에서 공유됨.
city1.addMesh( 'building2', new Mesh( 'building', new Material('green') ));
city1.addMesh( 'building3', new Mesh( 'building', new Material('blue') ));
```


## addLight( id:string, light:Light  )

**description**

장면에 빛 객체를 등록함.

**param**

1. id:string - removeLight, getLight 등에서 사용할 id.
2. light:Light - Light 또는 이를 상속한 클래스의 인스턴스.

**return**

Light - 방금 추가한 Light의 인스턴스.

**sample**

```javascript
var lobby = new Scene();
lobby.addLight( 'dir', new DirLight( 0, 5, 3 ) );
lobby.addLight( 'centerLight', new OmniLight( 0, 100, 0, '#fff', 5 ) );
```

## addMaterial( id:string, material:Material )

**description**

재질을 나타내는 Material을 등록함.

**param**

1. id:string - removeMaterial, getMaterial 등에서 사용할 id
2. material:Material - Material의 인스턴스

**return**

Material - 방금 추가한 Material의 인스턴스

**sample**

```javascript
var lobby = new Scene();
lobby.add( id, new Material( World.cube, new Material() );
```
## addMesh( id:string, mesh:Mesh )

**description**

기본 기하구조체인 Mesh 또는 이를 상속한 Group 등을 등록함.

**param**

1. id:string - removeMesh, getMesh 등에서 사용할 id
2. mesh:Mesh - Mesh의 인스턴스

**return**

Mesh - 방금 추가한 Mesh의 인스턴스

**sample**

```javascript
var lobby = new Scene();
var group = new Group();
group.add( id, new Mesh( World.cube, new Material() );
lobby.addMesh( 'group1', group );
lobby.addMesh( 'test', new Mesh( World.sphere, new Material() );
```

## addTexture( id:string, image:*[, resizeType:string] )

**description**

텍스쳐로 사용될 이미지를 등록함.
* 로딩이 완료되지 않은 이미지는 등록되지 않고 무시됨.
* 이미지의 크기가 2의 n승으로 떨어지지 않는 경우 자동으로 리사이즈함.
* 내부적으로는 어떠한 소스가 와도 image엘리먼트를 만들어 base64형식의 dateURL을 src로 지정한 상태의 객체로 보관함.
* 내부처리가 있으므로 field로 제공되지 않음.

**param**

1. id:string - removeTexture, getTexture 등에서 사용할 id.
2. image:* - 실제 소스가 될 이미지. 다음과 같은 값이 올 수 있음.
    * image엘리먼트 - 로딩이 완료된 이미지태그.
    * canvas엘리먼트 - 현재 canvas2D에 그려진 내용을 이미지로 사용.
    * video엘리먼트 - 지정하는 시점의 프레임에 있는 내용을 사용.
    * base64문자열 - urlData형식으로 지정된 base64문자열.
    * Blob객체 - 실제 이미지를 포함하고 있는 Blob객체.
    * rgba배열 - canvas등에서 얻은 rgba형식의 배열.
3. ?resizeType:string - 기본값은 'zoomOut' 이며 다음과 같은 값이 올 수 있음.
    * 'zoomOut' - 이미지를 축소하여 2의 n에 맞춤.
    * 'zoomIn' - 이미지를 확대하여 2의 n에 맞춤.
    * 'crop' - 이미지를 2의 n에 맡게 좌상단을 기준으로 잘라냄.
    * 'addSpace' - 이미지를 2의 n에 맡게 여백을 늘림.

**return**

boolean - 등록에 성공하면 true, 실패하면 false.

**sample**

```html
<img src="texture.jpg" id="img1"/>
```

```javascript
var lobby = new Scene();
var img = document.getElementById('img1');
lobby.addTexture( 'texture', img );
```

## addVertexShader( id:string, program:string )

**description**

실제 사용될 shader를 등록함.

**param**

1. id:string - removeVertexShader, getVertexShader 등에서 사용할 id.
2. program:string - 실제 shader 코드의 문자열.

**return**

없음

**sample**

```html
<script id="vshader" type="text/shader">
attribute vec3 aVertexPosition;
attribute vec2 aUV;
varying vec2 vUV;
uniform vec3 uRotation;
uniform vec3 uPosition;
uniform vec3 uScale;

mat4 positionMTX(vec3 t){
	return mat4( 1,0,0,0, 0,1,0,0, 0,0,1,0, t[0],t[1],t[2],1);
}

mat4 scaleMTX(vec3 t){
	return mat4( t[0],0,0,0, 0,t[1],0,0, 0,0,t[2],0, 0,0,0,1);
}

mat4 rotationMTX(vec3 t){
	float s = sin(t[0]);float c = cos(t[0]);
	mat4 m1=mat4(1,0,0,0,0,c,-s,0,0,s,c,0, 0,0,0,1);
	s=sin(t[1]);c=cos(t[1]);
	mat4 m2=mat4(c,0,s,0,0,1,0,0,-s,0,c,0, 0,0,0,1);
	s=sin(t[2]);c=cos(t[2]);
	mat4 m3=mat4(c,-s,0,0,s,c,0,0,0,0,1,0, 0,0,0,1);
	return m3 * m2 * m1;
}
void main(void){
	gl_Position = positionMTX(uPosition) * 
		rotationMTX(uRotation) * 
		scaleMTX(uScale) * 
		vec4(aVertexPosition, 1.0);
	vUV = aUV;
}
</script>
```

```javascript
var lobby = new Scene();
var shader = document.getElementById('vshader').text;
lobby.addVertexShader( 'base', shader );
```


## getCamera( id:string )

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
