# Camera
* parent : [Mesh](Mesh.md)
* [Constructor](#constructor)

**field**

**method**
* [setBackgroundColor] (#setBackgroundColor)

### setBackgroundColor( color:String )
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
