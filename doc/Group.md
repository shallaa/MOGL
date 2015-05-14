# Group
* parent : [Mesh](Mesh.md)
* [Constructor](#constructor)

**method**

* [addChild](#addchild-idstring-meshmesh-)
* [getChild](#getchild-idstring-)
* [removeChild](#removechild-idstring-)

[top](#)
## Constructor

```javascript
Group()
```

**description**

다른 Mesh를 포함할 수 있는 가상의 부모를 생성함.
일단 Mesh가 Group에 포함되면 좌표계는 Group내의 지역좌표계로 작동함.
Group을 또다른 Group을 포함할 수 있음.
* 실제 구현에서 1단계부모는 parentBuffer에서 관리되지만 2단계부터는 cpu연산을 기반으로 병합되므로 주의할 것.

**param**
없음.

**sample**

```javascript
var group1 = new Group();
//팩토리함수로도 사용가능
var group2 = Group();
```

[top](#)
## addChild( id:string, mesh:[Mesh](Mesh.md) )

**description**

[Mesh](Mesh.md) 및 그 서브클래스를 자식으로 등록함.
* 등록되는 Mesh의 구성요소가 적절한지에 대한 평가는 Group이 Scene에 등록된 경우는 즉시하고 이전이라면 [Scene.addChild]()되는 시점에 함.
 
**param**

1. id:string - removeChild 등에서 사용할 id.
2. mesh:[Mesh](Mesh.md) - [Mesh](Mesh.md) 및 그 서브클래스([Camera](Camera.md), [Light](Light.md) 등)

**exception**

* 'Group.addChild:0' - 이미 존재하는 id.
* 'Group.addChild:1' - [Mesh](Mesh.md)가 아닌 객체.
* 'Group.addChild:2' - [Mesh](Mesh.md)안의 [Geometry](Geometry.md)에 지정된 vertex shader의 id가 존재하지 않음.
* 'Group.addChild:3' - [Mesh](Mesh.md)안의 [Material](Material.md)에 지정된 fragment shader의 id가 존재하지 않음.
* 'Group.addChild:4' - [Mesh](Mesh.md)안의 [Material](Material.md)에 지정된 texture의 id가 존재하지 않음.

**return**

this - 메서드체이닝을 위해 자신을 반환함.

**sample**

```javascript
var group = Group();
group.addChild( 'frontView', new Camera() );
group.addChild( 'centerLight', new OmniLight() );
group.addChild( 'building', new Mesh() );

try{
    //중복된 id등록 시도
    group.addChild( 'building', new Mesh() );
}catch(e){
    console.log(e); //Group.addChild:0
}

try{
    //mesh가 아닌 객체 등록 시도
    group.addChild( 'building2', {} );
}catch(e){
    console.log(e); //Group.addChild:1
}
```


[top](#)
## getChild( id:string )

**description**

id에 해당되는 [Mesh](Mesh.md)를 얻음.

**param**

1. id:string - 등록시 사용한 id.

**return**

[Mesh](Mesh.md) - id에 해당되는 [Mesh](Mesh.md) 인스턴스. 없는 경우에는 null이 반환됨.

**sample**

```javascript
var group = world.getScene('lobby').getChild('group1');
group.addChild( 'frontView', new Camera() );
var camera = group.getChild('frontView');
```


[top](#)
## removeChild( id:string )

**description**

등록된 [Mesh](Mesh.md)를 제거함.

**param**

1. id:string - addChild에서 사용한 id.

**return**

boolean - 해당 객체가 존재하고 삭제하는데 성공하면 true, 그 외에는 false.

**sample**

```javascript
world.getScene('lobby').removeChild('base');
```
