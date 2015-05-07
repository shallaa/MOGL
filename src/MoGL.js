var MoGL = (function(){
	var isFactory, isSuperChain, uuid, counter, totalCount, MoGL, fn;

	//인스턴스 카운트 시스템
	uuid = 0,//모든 인스턴스는 고유한 uuid를 갖게 됨.
	totalCount = 0, //생성된 인스턴스의 갯수를 관리함
	counter = {}, //클래스별로 관리
	
	//생성자
	MoGL = function MoGL(){
		this.isAlive = true;
		this.uuid = uuid++;
		counter[this.constructor.uuid]++;
		totalCount++;
	},
	fn = MoGL.prototype,
	
	//파괴자
	fn.destroy = function destroy(){
		var key;
		for( key in this ) if( this.hasOwnProperty(key) ) this[key] = null;
		this.isAlive = false;
		counter[this.constructor.uuid]--;
		totalCount--;
	},
	
	//인스턴스의 갯수를 알아냄
	MoGL.count = function count( cls ){
		if( typeof cls == 'function' ){
			return counter[cls.uuid];
		}else{
			return totalCount;
		}
	},
	
	//표준 error처리
	MoGL.error = function error( cls, method, id ){
		throw new Error( cls + '.' + method + ':' + id );
	},
	
	//parent클래스를 상속하는 자식클래스를 만들어냄.
	isFactory = {factory:1},//팩토리 함수용 식별상수
	isSuperChain = {superChain:1},//생성자체인용 상수
	MoGL.ext = function ext( child, parent ){
		var cls, oldProto, newProto, key;
		
		//부모검사
		if( parent !== MoGL && !( 'uuid' in parent ) ) MoGL.error( 'MoGL', 'ext', 0 );
		
		//생성자클래스
		cls = function(){
			var arg;
			if( arguments[0] === isSuperChain ){
				parent.apply( this, arguments[1] );
				child.apply( this, arguments[1] );
			}else if( this instanceof cls ){
				if( arguments[0] === isFactory ){
					arg = arguments[1];
				}else{
					arg = arguments;
				}
				parent.call( this, isSuperChain, arg );
				child.apply( this, arg );
				return this;
			}else{
				return new cls( isFactory, arguments );
			}
		};
		
		//uuid 및 인스턴스카운터 초기화
		cls.uuid = uuid++;
		if( !( cls.uuid in counter ) ) counter[cls.uuid] = 0;
		
		//부모와 자식 클래스의 프로토타입을 복사함.
		newProto = cls.prototype;
		oldProto = parent.prototype;
		for( key in oldProto ) if( oldProto.hasOwnProperty(key) ) newProto[key] = oldProto[key];
		oldProto = child.prototype;
		for( key in oldProto ) if( oldProto.hasOwnProperty(key) ) newProto[key] = oldProto[key];
		return cls;
	},
	
	//isAlive확인
	MoGL.isAlive = function isAlive(instance){
		if( !instance.isAlive ) throw new Error( 'Destroyed Object:' + instance );
	};
	
	return MoGL;
})();