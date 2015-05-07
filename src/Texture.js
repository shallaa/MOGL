/**
 * Created by redcamel on 2015-05-05.
 * description
 텍스쳐로 사용될 이미지를 등록함.
 로딩이 완료되지 않은 이미지는 등록되지 않고 무시됨.
 이미지의 크기가 2의 n승으로 떨어지지 않는 경우 자동으로 리사이즈함.
 내부적으로는 어떠한 소스가 와도 image엘리먼트를 만들어 base64형식의 dateURL을 src로 지정한 상태의 객체로 보관함.
 내부처리가 있으므로 field로 제공되지 않음.
 */
var Texture = (function () {
    var Texture, fn;
    Texture = function Texture() {
    }
    fn = Texture.prototype
    return MoGL.ext(Texture, MoGL);
})();