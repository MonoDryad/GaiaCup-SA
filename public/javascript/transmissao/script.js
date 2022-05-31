let screenWSize = $(window).width() - 10
let screenHSize

if($(window).height() >= 800){
    screenHSize = 768
    $('#challongeFrame').css('height', '768px')
    $('#twitch-embed').css('height', '768px')
}else{
    screenHSize = 510
    $('#challongeFrame').css('height', '510px')
    $('#twitch-embed').css('height', '510px')
}


$(document).resize(function(){
    if($(window).height() >= 800){
        
        screenHSize = 768
        $('#challongeFrame').css('height', '768px')
        $('#twitch-embed').css('height', '768px')
    }else{
        screenHSize = 510
        $('#challongeFrame').css('height', '510px')
        $('#twitch-embed').css('height', '510px')
    }
    screenWSize = $(window).width() - 10
    newStreamScreen()    
})

$(document).ready(newStreamScreen())

function newStreamScreen(){
    new Twitch.Embed("twitch-embed", {
        width: screenWSize,
        height: screenHSize,
        channel: "monodryad",
        autoplay: true,
        allowfullscreen: true,
    });
}
