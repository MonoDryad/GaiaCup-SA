let miniPage = 0
checkWhichMiniPageIs()

$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        if(miniPage == 0){
            miniPage = 0
        }else{
            miniPage--
        }
        checkWhichMiniPageIs()
    }
    else {
        if(miniPage == 3){
            miniPage = 3
        }else{
            miniPage++
        }
        checkWhichMiniPageIs()
    }
});

function checkWhichMiniPageIs(){
    switch(miniPage){
        case 0:
            $('#miniPage-0').attr('checked',true)
            $('#miniPage-1').attr('checked',false)
            showCurrentMiniPage()
            break
        case 1:
            $('#miniPage-0').attr('checked',false)
            $('#miniPage-1').attr('checked',true)
            $('#miniPage-2').attr('checked',false)
            showCurrentMiniPage()
            break
        case 2:
            $('#miniPage-1').attr('checked',false)
            $('#miniPage-2').attr('checked',true)
            $('#miniPage-3').attr('checked',false)
            showCurrentMiniPage()
            break
        case 3:
            $('#miniPage-2').attr('checked',false)
            $('#miniPage-3').attr('checked',true)
            showCurrentMiniPage()
            break
    }
}

function showCurrentMiniPage(){
    if(miniPage == 0){
        $('.body-container-gaiacup-sobre').addClass('showContent')
        $('.body-container-gaiacup-sobre').removeClass('hideContent')
        $('.body-container-inexorabilis-sobre').addClass('hideContent')
        $('.body-container-inexorabilis-sobre').removeClass('showContent')
    }else if(miniPage == 1){
        $('.body-container-gaiacup-sobre').addClass('hideContent')
        $('.body-container-gaiacup-sobre').removeClass('showContent')
        $('.body-container-inexorabilis-sobre').addClass('showContent')
        $('.body-container-inexorabilis-sobre').removeClass('hideContent')
        $('.body-container-gaiagaming-sobre').addClass('hideContent')
        $('.body-container-gaiagaming-sobre').removeClass('showContent')
    }else if(miniPage == 2){
        $('.body-container-inexorabilis-sobre').addClass('hideContent')
        $('.body-container-inexorabilis-sobre').removeClass('showContent')
        $('.body-container-gaiagaming-sobre').addClass('showContent')
        $('.body-container-gaiagaming-sobre').removeClass('hideContent')
        $('.body-container-desenvolvedores-sobre').addClass('hideContent')
        $('.body-container-desenvolvedores-sobre').removeClass('showContent')
    }
}