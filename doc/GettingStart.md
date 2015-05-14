# 작성중
# Hello World - MoGL로 삼각형 그리기!

##Step!
1. World 생성
2. Scene 생성
3. Scnee에 Geometry 등록 / Material 등록 / Texture 등록
4. Scene에 Mesh 등록
5. The End

###Step1
#### World - 하는일
- Canvas객체를 기반으로 webGL Context를 초기화 한다.
- World에 등록된 Render 리스트를 실제로 렌더링한다.

```javascript
    // 월드 생성 
    var world = new World('firstWorld')
    // var world = new World('캔버스아이디')
```

World를 생성하고 나면 World에 Scene 객체를 추가 할 수있습니다.

###Step2
#### Scene - 하는일
- MoGL은 Scene단위 렌더링을 진행합니다. 따라서 Scene은 렌더링에 필요한 주요 정보들을 모두 관리합니다. 
