let img_w = $(".slide li").width(); //940 이미지의 가로 너비
let img_n = $(".slide li").length; //4 이미지의 총 개수
let oldinx = 0; //기존 인덱스
let newinx = 0; //새로운 인덱스
var auto = setInterval(autoSlide, 4000); //자동 슬라이드

$(".slide li:last").prependTo(".slide");
$(".slide").css({ left: -img_w });

function slideImage(newinx, m) {
    if (m == 0) { //prev btn
        $(".slide").stop(true, true).animate({ left: "+=" + img_w }, 600, "easeOutCubic",
            function () {
                $(".slide li:last").prependTo(".slide");
                $(".slide").css({ left: -img_w });
            });

        $(".slide_btn li").eq(oldinx).removeClass("active");
        $(".slide_btn li").eq(newinx).addClass("active");
    } else { //next btn
        $(".slide").stop(true, true).animate({ left: "-=" + img_w }, 600, "easeOutCubic",
            function () {
                $(".slide li:first").appendTo(".slide");
                $(".slide").css({ left: -img_w });
            });

        $(".slide_btn li").eq(oldinx).removeClass("active");
        $(".slide_btn li").eq(newinx).addClass("active");
    }

    oldinx = newinx;
};



//슬라이드 자동 함수
function autoSlide() {
    newinx++;

    if (newinx == img_n) {
        newinx = 0;
    }

    slideImage(newinx, 1);
}

//next
$(".next").click(function () {
    clearInterval(auto);

    newinx++;

    if (newinx >= img_n) {
        newinx = 0; //총 이미지 개수 4에서 1을 뺀 3 -> index = 3 (0,1,2,3)
    }

    slideImage(newinx, 1);

    auto = setInterval(slideAuto, 4000);
});

//prev
$(".prev").click(function () {
    clearInterval(auto);

    newinx--;

    if (newinx < 0) {
        newinx = img_n - 1; //총 이미지 개수 4에서 1을 뺀 3 -> index = 3 (0,1,2,3)
    }

    slideImage(newinx, 0);

    auto = setInterval(slideAuto, 4000);
});

//하단의 페이지네이션 클릭했을 때
$(".slide_btn li").click(function () {
    newinx = $(this).index();

    //prepend와 append로 인해 인덱스 번호가 섞여 있기 때문에 페이지네이션을 클릭할 때 인덱스 번호가 나란히 오도록 재배치하는 명령이 필요하다
    //재배치
    for (i = 1; i <= img_n; i++) {
        $(".slide li.pic" + i).appendTo(".slide");
    }

    //3번, 4번 이미지를 앞으로 보내 준다 (안정성 문제)
    $(".slide li:last").prependTo(".slide");
    $(".slide").css({ left: -img_w });
    $(".slide li:last").prependTo(".slide");

    clearInterval(auto);

    for (i = 1; i <= newinx + 1; i++) {
        slideImage(newinx, 1);
    }

    auto = setInterval(autoSlide, 4000);
});