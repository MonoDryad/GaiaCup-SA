if($(window).width() < 990){
    $('.aboutimage').attr('src', './images/about-image-responsive.png')
}else{
    $('.aboutimage').attr('src', './images/about-image.png')
}

$(window).resize(function(){
    if($(this).width() < 990){
        $('.aboutimage').attr('src', './images/about-image-responsive.png')
    }else{
        $('.aboutimage').attr('src', './images/about-image.png')
    }
})