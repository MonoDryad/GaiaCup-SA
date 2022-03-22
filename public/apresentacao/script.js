$(document).ready(function(){
    $('body').append(`<img class="changeSlide" src="./img/slide1.jpg">`)
})

let slideN = 1

$('body').keydown(function(e) {
    if(e.which == 39){
        if(slideN == 8){
            window.location.href = "../"
        }else{
            slideN++
        }
    }else if(e.which == 37){
        if(slideN == 1){
            return
        }else{
            slideN--
        }
    }
    if(slideN == 3){
        $('body').append(`<video class="pitch" src="./pitch.mp4" controls type="video/mp4">`)
        $('.changeSlide').hide()
    }else{
        $('.pitch').hide()
        $('.changeSlide').show()
        $('.changeSlide').attr('src', `./img/slide${slideN}.jpg`)
    }
})
