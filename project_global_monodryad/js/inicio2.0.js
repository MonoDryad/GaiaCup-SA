$(".winners-upper-video-loop").hide();
$(".slider-winners-second").hide();
$(".slider-winners-third").hide();
$(".slider-winners-first").show();

$(".arrow-left, .arrow-right").hover(function(){
  $(this).attr("src", function(index, attr){
      return attr.replace(".png", "-hover.png");
  });
}, function(){
  $(this).attr("src", function(index, attr){
      return attr.replace("-hover.png", ".png");
  });
});

let videoFinalizado = false;
let segundoVideoFinalizado = false;

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
    $(".divisor").offset().top +
      $(".divisor").outerHeight() -
      window.innerHeight
  ) {
    if (videoFinalizado == false) {
      $(".winners-video")[0].play();
      $(".winners-upper-video-start")[0].play();
      $(".wrapper-winners").addClass("slide-animacao");
      $(".winners-primeiro").addClass("slide-animacao");
      $(".winners-posicao-primeiro").addClass("slide-animacao");
      $(".winners-primeiro-info").addClass("slide-animacao");
    }
  }
});

function trocarAnimação() {
  if (segundoVideoFinalizado == true) {
    $(".winners-upper-video-loop").show();
    $(".winners-upper-video-loop")[0].play();
    $(".winners-upper-video-start").hide();
  }
}
