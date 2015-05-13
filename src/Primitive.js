/**
 * Created by redcamel on 2015-05-08.
 */
// TODO 기본으로 버텍스좌표, 노말좌표 정도까지는 알아야되는겐가?
var Primitive = {
    cube: function cube(/*splitX:int, splitY:int, splitZ:int*/) {
        // TODO 내장된 Geometry. 각 정육면체 구조를 생성함.
        // TODO ?splitX:int, splitY:int, splitZ:int - 각 면당 분할할 수. 생략시 1로 지정됨.
        // TODO scene.addChild( 'cube1', new Mesh( Primitive.cube( 2, 3, 1 ), new Material() );
        var result
        return result // TODO  어떤 지오메트리를 넘겨주는군
    },
    geodesic: function geodesic(/*split*/) {
        // TODO 내장된 Geometry. 극점에서 폴리곤이 몰리지 않도록 Geodesic 형태로 생성되는 구의 구조.
        // TODO ?split:int - 쪼개질 다각형의 갯수. 생략하거나 30이하의 값이 오면 30이 됨.
        // TODO scene.addChild( 'geo0', new Mesh( Primitive.geodesic(30), new Material() );
        var result
        return result
    },
    line: function line(x1, y1, z1, x2, y2, z2 /*,width:number*/) {
        // TODO 내장된 Geometry. 두 점을 지나는 직선.
        // TODO x1:number, y1, z1, x2, y2, z2 - 직선이 지나갈 두점(x1, y1, z1 에서 x2, y2, z2)
        // TODO ?width:number - 직선의 두께. 생략하면 1.
        // TODO scene.addChild( 'l', new Mesh( Primitive.line( 0,0,0, 10,10,10, 2 ), new Material() );
        var result
        return result
    },
    plane: function plane(/*splitX:int, splitY:int*/) {
        // TODO 내장된 Geometry. 하나의 평면.
        // TODO ?splitX:int, splitY:int - 각 면당 분할할 수. 생략시 1로 지정됨.
        // TODO scene.addChild( 'pl', new Mesh( Primitive.plane(5,5), new Material() );
        var result
        return result
    },
    point: function point(/*width:number*/) {
        // TODO 내장된 Geometry. 하나의 점을 나타내는 구조.
        // TODO ?width:number - 점의 지름. 생략하면 1.
        // TODO scene.addChild( 'p', new Mesh( Primitive.point(5), new Material() );
        var result
        return result
    },
    sphere: function sphere(/*split:int*/) {
        // TODO 내장된 Geometry. 일반적으로 극점에 삼각형이 몰리되게되는구형태의 구조물.
        // TODO ?split:int - 나뉠 면의 수. 생략하거나 8이하의 값이면 8.
        var result
        return result
    },
    skybox: function skybox(/*splitX:int, splitY:int, splitZ:int*/) {
        // TODO 내장된 Geometry. 큐브형태의 구조로 각 평면이 내부를 바라보도록 되어있음.
        // TODO ?splitX:int, splitY:int, splitZ:int - 각 면당 분할할 수. 생략시 1로 지정됨.
        // TODO scene.addChild( 'box', new Mesh( Primitive.skybox( 5, 5, 5 ), new Material() );
        var result
        return result
    }


}
