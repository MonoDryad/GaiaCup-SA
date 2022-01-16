$('.winners-upper-video-loop').hide()

let videoFinalizado = false;
let segundoVideoFinalizado = false

$(".video-texto-promo").click(function () {
  if (localStorage.getItem("Conectado") == true) {
    window.location.href = "./sobre.html";
  } else {
    window.location.href = "./isessao.html";
  }
});

$(window).bind("scroll", function () {
  if (
    $(window).scrollTop() >=
    $(".news-last").offset().top +
      $(".news-last").outerHeight() -
      window.innerHeight
  ) {
    
    if ((videoFinalizado == false)) {
      $(".winners-video")[0].play();
      $(".wrapper-winners").addClass("slide-animacao");

    }
  }
});

function trocarAnimação() {
  if(segundoVideoFinalizado == true){
    $('.winners-upper-video-loop').show()
    $('.winners-upper-video-loop')[0].play()
    $('.winners-upper-video-start').hide()
  }
}