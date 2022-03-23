$(document).ready(function(){
    $('body').css(`background`, `url(./img/slide1.jpg) no-repeat center center fixed`)
    $('body').css(`background-size`, `cover`)
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
    }else{
        $('.pitch').hide()
        $('body').css(`background`, `url(./img/slide${slideN}.jpg) no-repeat center center fixed`)
        $('body').css(`background-size`, `cover`)
    }
})
