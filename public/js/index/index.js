$(".winners-upper-video-loop").hide();
$(".second-container-main").css("opacity", "0%");

let goToMyTeam = 0
$(".img-last-video").on('click', function(){
  try{
    JSON.parse(localStorage.getItem('ContaConectada')).isConnected
    goToMyTeam = 1
  }catch{
    localStorage.setItem('Cadastro', '2')
    goToMyTeam = 0
  }
  if(goToMyTeam == 1){
    window.location.href = "./myteam.html"
  }else{
    window.location.href = "./login.html"
  }
})



$(".img-last-video").hover(
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

let videoPrincipal = document.getElementById("videoP");
let currentTimePrincipal = videoPrincipal.currentTime;

let segundoVideoLoop = document.getElementById("winners-upper-video-loop");
let currentTimeSegundoLoop = segundoVideoLoop.currentTime;

let ultimoVideo = document.getElementById("final-video");
let currentTimeultimoVideo = ultimoVideo.currentTime;

$(window).on("scroll", function () {
  if ($(window).scrollTop() >= $(".divisor").offset().top + $(".divisor").outerHeight() - window.innerHeight) {
    if (videoFinalizado == false) {
      $(".second-container-main").css("opacity", "100%");
      $(".winners-video")[0].play();
      $(".winners-upper-video-start")[0].play();
      $(".wrapper-winners, .winners-primeiro, .winners-posicao-primeiro, .winners-primeiro-info").addClass("slide-animacao");
      $(".wrapper-winners, .winners-primeiro, .winners-posicao-primeiro, .winners-primeiro-info").removeClass("slide-animacao");
      changeCurrentWinner();
    }
  }
  if ($(window).scrollTop() >= $(".elos-container").offset().top + $(".elos-container").outerHeight() - window.innerHeight){
    $(".winners-upper-video-loop")[currentTimeSegundoLoop].pause();
    initiateEloAnimation();
  } else {
    $(".winners-upper-video-loop")[currentTimeSegundoLoop].play();
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
  currentImage -= 1;
  if (currentImage == -2) {
    currentImage = 1;
  }
  changeCurrentWinner();
});

$(".arrow-right").click(function () {
  currentImage += 1;
  if (currentImage == 2) {
    currentImage = -1;
  }
  changeCurrentWinner();
});

function changeCurrentWinner() {
  if (currentImage == 0) {
    $("#winners-0").show();
    $("#winners-1").hide();
    $("#winners--1").hide();
  } else if (currentImage == 1) {
    $("#winners-0").hide();
    $("#winners-1").show();
    $("#winners--1").hide();
  } else if (currentImage == -1) {
    $("#winners-0").hide();
    $("#winners-1").hide();
    $("#winners--1").show();
  }
}

function initiateEloAnimation() {
  $(".show-elos-title").addClass("rank-show");
  $(".show-elos-title").css("opacity", "100%");
  $(".barra-rank").addClass("rank-border");
  $(".barra-rank").css("width", "100%");
  setInterval(function () {
    $(".rank-platinum").addClass("rank-show");
    $(".rank-platinum").css("opacity", "100%");
    setInterval(function () {
      $(".rank-gold").addClass("rank-show");
      $(".rank-gold").css("opacity", "100%");
      $(".rank-diamond").addClass("rank-show");
      $(".rank-diamond").css("opacity", "100%");
      setInterval(function () {
        $(".rank-silver").addClass("rank-show");
        $(".rank-silver").css("opacity", "100%");
        $(".rank-master").addClass("rank-show");
        $(".rank-master").css("opacity", "100%");
        setInterval(function () {
          $(".rank-bronze").addClass("rank-show");
          $(".rank-bronze").css("opacity", "100%");
          $(".rank-grandmaster").addClass("rank-show");
          $(".rank-grandmaster").css("opacity", "100%");
          setInterval(function () {
            $(".rank-iron").addClass("rank-show");
            $(".rank-iron").css("opacity", "100%");
            $(".rank-challenger").addClass("rank-show");
            $(".rank-challenger").css("opacity", "100%");
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  }, 600);
  setInterval(function () {
    $(".verso-1").addClass("rank-show");
    $(".verso-1").css("opacity", "100%");
    setInterval(function () {
      $(".verso-1").remove();
      $(".verso-2").addClass("rank-show");
      $(".verso-2").css("opacity", "100%");
      setInterval(function () {
        $(".verso-2").remove();
        $(".verso-3").addClass("rank-show");
        $(".verso-3").css("opacity", "100%");
        setInterval(function () {
          $(".verso-3").remove();
          $(".verso-4").addClass("rank-show");
          $(".verso-4").css("opacity", "100%");
        }, 2000);
      }, 2000);
    }, 2000);
  }, 1000);
}
