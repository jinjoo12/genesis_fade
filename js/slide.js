(function($){  // 매개변수(파라미터 Parameter)
    // 즉시표현함수는 제이쿼리 달러 사인기호의 
    // 외부 플러그인(라이브러리)와 충돌을 피하기 위해 사용하는 함수식

    // 객체(Object 오브젝트) 선언 {} : 섹션별 변수 중복을 피할 수 있다.
    // const obj = new Object(); // 객체 생성자 방식
    //       obj = {}  

    const obj = {  // 객체 리터럴 방식 권장
        init(){  // 대표 메서드
            this.header();
            this.section1();
            this.section2();
            this.section3();
        },
        header(){},
        section1(){
            let cnt=0;
            let setId=0;
            let winW = $(window).innerWidth();
            const slideContainer = $('#section1 .slide-container');
            const slideWrap = $('#section1 .slide-wrap');
            const slideview = $('#section1 .slide-view');
            const slide = $('#section1 .slide');
            const slideImg = $('#section1 .slide img');
            const pageBtn = $('#section1 .page-btn');
            const stopBtn = $('#section1 .stop-btn');
            const playBtn = $('#section1 .play-btn');
            const n = $('#section1 .slide').length-1;
            
            const imgRate = 1.3452443510246979;  //slideImg.innerWidth() / winW; // 창너비(1903)대한 이미지(2560) 비율
            const imgTranRate = 0.1265625;  // 이미지(2560) 크기에 대한 translateX (-값비율) : 324 / 2560 ransform: translateX(-324px)
            // console.log('슬라이드 이미지 너비 = ' + slideImg.innerWidth() );
            // console.log('슬라이드 이미지 비율 = ' + imgRate );


            // 이미지 크기 조절 => 창크기에 반응하는 이미지 크기
            let x = (imgRate * winW) * imgTranRate;
            slideImg.css({width: imgRate * winW, transform:`translateX(${-x}px)` });

            // console.log( imgRate );
            // console.log( winW );
            // console.log( imgRate * winW );


            // 창크기에 반응하는 이미지 크기와 트랜스레이트X
            // 크기가 1px만 변경되도 즉각 반응
            $(window).resize(function(){
                winW = $(window).innerWidth();
                x = (imgRate * winW) * imgTranRate;
                slideImg.css({width: imgRate * winW, transform:`translateX(${-x}px)` })
            });


            // 이미지 반응형 => 비율계산
            // 이미지비율 = 이미지너비(2500)
            // 1.313715187 = 2500 /1903
            // 윈도우너비 = $(window).innerWidth();
            // 이미지크기 = 창너비(반응형크기) * 비율(1.313715187)


            // 0. 메인슬라이드 터치스와이프
            // 마우스다운 => 터치시작
            // 마우스업 => 터치끝
            // 화면의 왼쪽 끝이 0 ~ 오른쪽 끝이 1920
            let mouseDown = null;
            let mouseUp = null;

            let dragStart = null;
            let dragEnd = null;

            let mDown = false;
            let sizeX = 10;



            //슬라이드 좌측 끝
            // console.log( slideWrap.offset().left );

            // 터치 스와이프 이벤트
            // 데스크탑 : 마우스 터치 스와이프 이벤트
            // 데스크탑 : 마우스 터치 드래그 앤 드롭
            // 태블릿 & 모바일 : 손가락(핑거링) 터치 스와이프 이벤트
            // 태블릿 & 모바일 : 손가락(핑거링) 터치 드래그 앤 드롭
            slideContainer.on({
                mousedown(e){
                    winW = $(window).innerWidth();
                    mouseDown = e.clientX; 
                    console.log(e.clientX);  
                    console.log(slideWrap.offset().left+1903);  
                    dragStart = e.clientX - (slideWrap.offset().left+1903);  
                    mDown = true;            
                },
                mouseup(e){
                    mouseUp = e.clientX;        
                    
                    if( mouseDown-mouseUp > sizeX ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }                            
                    }
                    
                    if( mouseDown-mouseUp < -sizeX ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }                            
                    }
                    mDown = false;
                    

                }
                
            })

            $(document).on({
                mouseup(e){
                    if(!mDown) return;

                    mouseUp = e.clientX;

                    if( mouseDown-mouseUp > sizeX ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }                            
                    }
                    
                    if( mouseDown-mouseUp < -sizeX ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }                            
                    }
                    mDown = false;
                }
            });


            // 태블릿 & 모바일 : 손가락(핑거링) 터치 스와이프 이벤트
            // 태블릿 & 모바일 : 손가락(핑거링) 터치 드래그 앤 드롭
            slideContainer.on({
                touchstart(e){
                    winW = $(window).innerWidth();
                    sizeX = winW/4;
                    mouseDown = e.originalEvent.changedTouches[0].clientX; 
                    dragStart = e.originalEvent.changedTouches[0].clientX - (slideWrap.offset().left+1903);  
                    mDown = true;            
                },
                touchend(e){
                    mouseUp = e.originalEvent.changedTouches[0].clientX;        
                    
                    if( mouseDown-mouseUp > sizeX ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }                            
                    }
                    
                    if( mouseDown-mouseUp < -sizeX ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }                            
                    }
                    mDown = false;
                    if( mouseDown-mouseUp >= sizeX && mouseDown-mouseUp <= sizeX ){
                        mainSlide();
                    }

                },
                touchmove(e){
                    if(!mDown) return;
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    // console.log(dragEnd-dragStart);
                    slideWrap.css({left: dragEnd - dragStart});

                }
            })

            //손가락 터치 이벤트 확인하기 
            //=> 태블릿과 모바일에서만 동작
            // originalEvent: TouchEvent, type: 'touchstart'
            // slideContainer.on({
            //     touchstart(e){
            //         console.log( e.originalEvent.changedTouches[0].clientX);
            //     },  
            //     touchend(e){
            //         console.log( e.originalEvent.changedTouches[0].clientX);
            //     },
            //     // touchmove(e){
            //     //     console.log( e.originalEvent.changedTouches[0].clientX);
            //     // }
            // });




            // 1. 메인슬라이드함수
            //   페이드인 / 아웃 효과 애니메이션 슬라이드 구현
            //    -모든 슬라이드를 position: absolute; 로 해준다.
            //    -맨위 그래고 아래 포개진 슬라이드 앞뒤 순서를 정한다 z-index: 3, 2, 1
            //    -페이드 아웃 효과는 opacity: 0를 사용한다 시간은 0.6s 또는 1s
            //    -계속 10개의 슬라이드를 반복적으로 회전하여 순서대로 보여진다
            mainNextSlide();  // 로딩시 실행
            //메인다음슬라이드함수(다음페이드인아웃)
            function mainNextSlide(){
                slide                        .css({zIndex: 1, opacity: 1});
                slide.eq(cnt)                .css({zIndex:2});
                // cnt=0이면 마지막슬라이드번호 9
                // 그렇지않으면 cnt-1
                slide.eq(cnt===0 ? n : cnt-1).css({zIndex:3}).stop().animate({opacity:1}, 0).animate({opacity:0}, 1000);
                pageEvent();
            }
            //메인이전슬라이드함수(이전페이드인아웃)
            function mainPrevSlide(){
                slide                            .css({zIndex:1, opacity: 1});
                slide.eq(cnt=== n ? 0 : cnt+1)   .css({zIndex:2});
                // cnt=0이면 마지막슬라이드번호 9
                // 그렇지않으면 cnt-1
                slide.eq(cnt)                    .css({zIndex:3}).stop().animate({opacity:0}, 0).animate({opacity:1}, 1000);
                pageEvent();
            }

            // 2-1. 다음카운트함수
            function nextCount(){
                cnt++;
                if(cnt>9) cnt=0;
                mainNextSlide();
            }
            // 2-2. 이전카운트함수
            function prevCount(){
                cnt--;
                if(cnt<0) cnt=n;
                mainPrevSlide();  //메인이전슬라이드함수
            }

            // 3. 자동타이머함수(7초 후 7초간격 계속)
            function autoTimer(){
                setId = setInterval(nextCount, 4000);
            }
            autoTimer();

            // 4. 페이지 이벤트 함수
            function pageEvent(){
                pageBtn.removeClass('on');
                pageBtn.eq( cnt>n ? 0 : cnt).addClass('on');
            }

            // 5. 페이지버튼클릭
            pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();
                        cnt=idx;
                        mainSlide();
                        clearInterval(setId); // 클릭시 일시중지
                    }
                });
            });

            // 6-1. 스톱 버튼 클릭이벤트
            stopBtn.on({
                click(e){
                    e.preventDefault();
                    stopBtn.addClass('on');
                    playBtn.addClass('on');
                    clearInterval(setId); // 클릭시 일시중지
                }
            })

            // 6-2. 플레이 버튼 클릭이벤트
            playBtn.on({
                click(e){
                    e.preventDefault();
                    stopBtn.removeClass('on');
                    playBtn.removeClass('on');
                    autoTimer(); // 클릭시 재실행 7초후실행
                }
            })

            
        },
        section2(){
            // 0. 변수설정
            let cnt = 0;
            const slideContainer = $('#section2 .slide-container');
            const section2Container = $('#section2 .container');
            const slideWrap = $('#section2 .slide-wrap');
            const slideview = $('#section2 .slide-view');
            const slide = $('#section2 .slide-view .slide');
            const slideH3 = $('#section2 .slide-view .slide h3');
            const slideH4 = $('#section2 .slide-view .slide h4');
            const pageBtn = $('#section2 .page-btn');
            const selectBtn = $('#section2 .select-btn');
            const subMenu = $('#section2 .sub-menu');
            const materialIcons = $('#section2  .select-btn .material-icons');
            const heightRate = 0.884545392;
            let n = slide.length-2; // 10개

            let dragStart = null;
            let dragEnd = null;

            let mDown = false;
            let winW = $(window).innerWidth();
            let sizeX = 100;
            let offsetL = slideWrap.offset().left;
            let slideWidth;
            

            // 터치스와이프
            let touchStart = null;
            let touchEnd = null;

            // 컨테이너 너비
            //console.log($('#section2').innerWidth());
            resizeFn(); // 로딩시
            // 함수는 명령어의 묶음
            function resizeFn(){
                winW = $(window).innerWidth(); // 창크기 계속 값을 보여준다.
                // 창너비(window)가 1642픽셀이하에서 패딩 좌측값 0으로 설정
                if(winW <= 1642){ // 이하  winW <= 1642
                     
                     
                    if(winW>1280){ // 1280 초과에서는 슬라이드 3개
                        slideWidth = (section2Container.innerWidth()-0+20+20)/3;
                        n = slide.length-2;  //8 = 10-2
                        pageBtn.eq(8).css({ display: 'none' });
                        pageBtn.eq(9).css({ display: 'none' });
                        pageBtn.css({ display: 'none' });  //10개 모두 숨김
                        for(let i=0; i<n; i++){
                            pageBtn.eq(i).css({ display: 'block' }); //8개만 보임 2개 숨김
                        }
                        if(cnt>=n-1){  // 7
                            cnt=n-1;
                        }
                    }
                    else{ // 1280 이하에서는 슬라이드 1개
                        slideWidth = (section2Container.innerWidth()-0+20+20)/1;
                        n = slide.length;    //10
                        // 페이지 버튼 제어(개수) 8개인 경우 / 10개인 경우
                            pageBtn.css({ display: 'block' });    //10개 모두 보임
                        
                    }
                    
                }
                else{ // 1642 초과
                    slideWidth = (section2Container.innerWidth()-198+20+20)/3;
                    pageBtn.css({ display: 'none' });  //10개 모두 숨김
                    for(let i=0; i<n; i++){
                        pageBtn.eq(i).css({ display: 'block' }); //8개만 보임 2개 숨김
                    }
                }
                
                slideWrap.css({width: slideWidth*10});
                slide.css({width: slideWidth, height: slideWidth*heightRate});
                slideH3.css({fontSize: slideWidth*0.07});
                slideH4.css({fontSize: slideWidth*0.03});
                
                mainSlide(); // 슬라이드에 슬라이드 너비 전달하기 위해서
            }
            
            // 가로 세로 크기가 1픽셀만이라도 변경되면 동작 구동(구현))이 된다
            // 가로 세로 크기가 변경이 안되면 영원히 그대로 구동(구현)이 없다
            $(window).resize(function(){
                resizeFn();
                
            });


            // 데스크탑 터치 스와이프 & 드래그 앤 드롭
            slideContainer.on({
                mousedown(e){
                    touchStart = e.clientX;
                    dragStart = e.clientX - (slideWrap.offset().left-offsetL);
                    mDown = true;
                    slideview.css({cursor: 'grabbing'});
                },
                mouseup(e){
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > sizeX){
                        nextCount();
                    }
                    if(touchStart-touchEnd < -sizeX){
                        prevCount();
                    }
                    if( touchStart-touchEnd >= -sizeX && touchStart-touchEnd <= sizeX ){
                        mainSlide();
                    }
                    mDown = false;
                    slideview.css({cursor: 'grab'});
                },
                mousemove(e){
                    if(!mDown) return;
                    dragEnd = e.clientX;
                    slideWrap.css({left: dragEnd - dragStart});
                }
            });    


             $(document).on({
                mouseup(e){
                    if(!mDown) return;
                    // mDown = true; 상태에서
                    // mouseup 에서 mDown = false; 변경
                    // 그러면 이미 실행한거임
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > sizeX){
                        nextCount();
                    }
                    if(touchStart-touchEnd < -sizeX){
                        prevCount();
                    }
                    if( touchStart-touchEnd >= -sizeX  &&  touchStart-touchEnd <= sizeX ){
                        mainSlide();
                    }
                    mDown = false;
                    slideview.css({cursor: 'grab'});
                }
            })

            // 태블릿, 모바일 터치 스와이프 & 드래그 앤 드롭
            slideContainer.on({
                touchstart(e){
                    touchStart = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX - (slideWrap.offset().left-offsetL);
                    mDown = true;
                    slideview.css({cursor: 'grabbing'});
                },
                touchend(e){
                    touchEnd = e.originalEvent.changedTouches[0].clientX;
                    if(touchStart-touchEnd > sizeX){
                        nextCount();
                    }
                    if(touchStart-touchEnd < -sizeX){
                        prevCount();
                    }
                    if( touchStart-touchEnd >= -sizeX && touchStart-touchEnd <= sizeX ){
                        mainSlide();
                    }
                    mDown = false;
                    slideview.css({cursor: 'grab'});
                },
                touchmove(e){
                    if(!mDown) return;
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    slideWrap.css({left: dragEnd - dragStart});
                }
            });  





            // 셀렉트버튼 클릭 이벤트 => 토글 이벤트
            // 셀렉트버튼 한번 클릭하면 서브메뉴 보이고
            // 셀렉트버튼 또 한번 클릭하면 서브메뉴 숨긴
            selectBtn.on({
                click(e){
                    e.preventDefault();
                    subMenu.toggleClass('on');  // 서브메뉴
                    materialIcons.toggleClass('on'); // 아이콘
                }
            })


            // 1. 메인슬라이드함수
            mainSlide();
            function mainSlide(){                
                slideWrap.stop().animate({left: -slideWidth * cnt }, 600, 'easeInOutExpo');                
                pageBtnEvent();
            }

            // 다음카운트함수
            function nextCount(){
                cnt++;
                if(cnt>n-1) {cnt=n-1};
                mainSlide();
            }

            // 이전카운트함수
            function prevCount(){
                cnt--;
                if(cnt<0) {cnt=0};
                mainSlide();
            }


            // 2. 페이지버튼 클릭이벤트
            // each() 메서드
            pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();
                        console.log(idx);
                        cnt=idx;
                        mainSlide();
                    }
                })
            });

            //  3. 페이지버튼 이벤트 함수
            function pageBtnEvent(){
                pageBtn.removeClass('on');
                pageBtn.eq(cnt).addClass('on');
            }


        },
        section3(){},
    }
    obj.init();

})(jQuery); // 전달인수(아규먼트 Argument)
