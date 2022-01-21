$(".winners-upper-video-loop").hide();
$(".second-container-main").css("opacity", "0%");

$(".arrow-left, .arrow-right").hover(
  function () {
    $(this).attr("src", function (index, attr) {
      return attr.replace(".png", "-hover.png");
    });
  },
  function () {
    $(this).attr("src", function (index, attr) {
      return attr.replace("-hover.png", ".png");
    });
  }
);

videoFinalizado = false;
segundoVideoFinalizado = false;

$(".video-texto-promo").click(function () {
  window.location.href = './inscricao-times-teredi.html'
  // if (localStorage.getItem("Conectado") == true) {
  //   window.location.href = "./sobre.html";
  // } else {
  //   window.location.href = "./isessao.html";
  // }
});

$(window).bind("scroll", function () {
  if (
    $(window).scrollTop() >=
    $(".divisor").offset().top +
      $(".divisor").outerHeight() -
      window.innerHeight
  ) {
    if (videoFinalizado == false) {
      $(".second-container-main").css("opacity", "100%");
      $(".winners-video")[0].play();
      $(".winners-upper-video-start")[0].play();
      $(".wrapper-winners, .winners-primeiro, .winners-posicao-primeiro, .winners-primeiro-info").addClass("slide-animacao");
      $(".wrapper-winners, .winners-primeiro, .winners-posicao-primeiro, .winners-primeiro-info").removeClass("slide-animacao");
      changeCurrentWinner()
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

let currentImage = 0;

$(".arrow-left").click(function () {
  currentImage -= 1
  if (currentImage == -2) {
    currentImage = 1;
  }
  changeCurrentWinner()
});

$(".arrow-right").click(function () {
  currentImage += 1
  if (currentImage == 2) {
    currentImage = -1;
  }
  changeCurrentWinner()
});

function changeCurrentWinner(){
  if(currentImage == 0){
    $('#winners-0').show()
    $('#winners-1').hide()
    $('#winners--1').hide()
    console.log('0')
  } else if(currentImage == 1){
    $('#winners-0').hide()
    $('#winners-1').show()
    $('#winners--1').hide()
    console.log('1')
  }else if(currentImage == -1){
    $('#winners-0').hide()
    $('#winners-1').hide()
    $('#winners--1').show()
    console.log('-1')
  }
}