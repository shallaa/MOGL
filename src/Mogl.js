var MoGL = (function(){
	var isFactory, MoGL, fn;
	isFactory = {},
	MoGL = function(){},
	fn = MoGL.prototype,

	//static function

	//parent클래스를 상속하는 자식클래스를 만들어냄.
	MoGL.ext = function ext( child, parent, isSuperCall ){
		var cls, oldProto, newProto, key;
		//생성자클래스
		cls = function(){
			var arg;
			if( this instanceof cls ){
				if( arguments[0] === isFactory ){
					arg = arguments[1];
				}else{
					arg = arguments;
				}
				if( isSuperCall ){
					parent.apply( this, arg );
				}
				child.apply( this, arg );
				return this;
			}else{
				return new cls( isFactory, arguments );
			}
		};

		//자식 클래스의 프로토타입을 옮기고 부모와 체이닝함.
		newProto = new parent;
		oldProto = child.prototype;
		for( key in oldProto ) if( oldProto.hasOwnProperty(key) ) newProto[key] = oldProto[key];
		cls.prototype = newProto;
		return cls;
	};

	//표준 error처리
	MoGL.error = function( cls, method, id ){
		throw new Error( cls + '.' + method + ':' + id );
	};

	return MoGL;
})();