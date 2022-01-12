let Slide = 3;

if ($(window).width() < 809) {
  $("#fake-video1").css("display", "none");
  $("#fake-video2").css("display", "none");
  $("#fake-video3").css("display", "none");
} else if ($(window).width() > 1800) {
  $("#fake-video1").css("max-width", "997px");
  $("#fake-video2").css("max-width", "997px");
  $("#fake-video3").css("max-width", "997px");
} else if ($(window).width() > 809 && $(window).width() < 1800) {
  $("#fake-video1").css("display", "block");
  $("#fake-video2").css("display", "block");
  $("#fake-video3").css("display", "block");

  switch (Slide) {
    case 1:
      $("#fake-video1").show();
      $("#fake-video2").hide();
      $("#fake-video3").show();
      trocarSlide();
      break;

    case 2:
      $("#fake-video1").hide();
      $("#fake-video2").show();
      $("#fake-video3").show();
      trocarSlide();
      break;

    case 3:
      $("#fake-video1").show();
      $("#fake-video2").show();
      $("#fake-video3").hide();
      trocarSlide();
      break;
  }

  $("#fake-video1").css("max-width", "750px");
  $("#fake-video2").css("max-width", "750px");
  $("#fake-video3").css("max-width", "750px");
  trocarSlide();
}

$(window).resize(function () {
  if ($(window).width() < 809) {
    $("#fake-video1").css("display", "none");
    $("#fake-video2").css("display", "none");
    $("#fake-video3").css("display", "none");
  } else if ($(window).width() > 1800) {
    $("#fake-video1").css("max-width", "997px");
    $("#fake-video2").css("max-width", "997px");
    $("#fake-video3").css("max-width", "997px");
  } else if ($(window).width() > 809 && $(window).width() < 1800) {
    $("#fake-video1").css("display", "block");
    $("#fake-video2").css("display", "block");
    $("#fake-video3").css("display", "block");

    switch (Slide) {
      case 1:
        $("#fake-video1").show();
        $("#fake-video2").hide();
        $("#fake-video3").show();
        trocarSlide();
        break;

      case 2:
        $("#fake-video1").hide();
        $("#fake-video2").show();
        $("#fake-video3").show();
        trocarSlide();
        break;

      case 3:
        $("#fake-video1").show();
        $("#fake-video2").show();
        $("#fake-video3").hide();
        trocarSlide();
        break;
    }

    $("#fake-video1").css("max-width", "750px");
    $("#fake-video2").css("max-width", "750px");
    $("#fake-video3").css("max-width", "750px");
    trocarSlide();
  }
});

document.querySelector(".video-01").addEventListener("ended", function () {
  if (Slide == 3) {
    Slide = 1;
    trocarSlide();
  } else if (Slide == 2) {
    Slide = 3;
    trocarSlide();
  } else {
    Slide = 2;
    trocarSlide();
  }
});

$("#mudar-slider-direita").click(function () {
  Slide++;
  trocarSlide();
});

$("#mudar-slider-esquerda").click(function () {
  if (Slide == 3) {
    Slide = 2;
    trocarSlide();
  } else {
    Slide--;
    trocarSlide();
  }
});

$("#mostrar-slider-1").click(function () {
  Slide = 3;
  trocarSlide();
});

$("#mostrar-slider-2").click(function () {
  Slide = 1;
  trocarSlide();
});

$("#mostrar-slider-3").click(function () {
  Slide = 2;
  trocarSlide();
});

function trocarSlide() {
  switch (Slide) {
    case 1:
      $("#video1").attr(
        "src",
        "./videos/slide2.webm"
      );

      $("#fake-video1").show();
      $("#fake-video2").hide();
      $("#fake-video3").show();

      $("#fake-video3").css("right", "");
      $("#fake-video1").css("left", "");

      $("#fake-video3").css("left", "5vw");
      $("#fake-video1").css("right", "5vw");
      $("#mostrar-slider-2").attr("src", "./images/slider_selecionado.png");
      $("#mostrar-slider-1").attr("src", "./images/slider_apagado.png");
      $("#mostrar-slider-3").attr("src", "./images/slider_apagado.png");
      break;
    case 2:
      $("#video1").attr(
        "src",
        "./videos/slide1.webm"
      );

      $("#fake-video1").hide();
      $("#fake-video2").show();
      $("#fake-video3").show();

      $("#fake-video3").css("left", "");
      $("#fake-video2").css("right", "");

      $("#fake-video3").css("right", "5vw");
      $("#fake-video2").css("left", "5vw");
      $("#mostrar-slider-3").attr("src", "./images/slider_selecionado.png");
      $("#mostrar-slider-2").attr("src", "./images/slider_apagado.png");
      $("#mostrar-slider-1").attr("src", "./images/slider_apagado.png");
      break;
    case 3:
      $("#video1").attr(
        "src",
        "./videos/slide3.webm"
      );
      $("#fake-video1").show();
      $("#fake-video2").show();
      $("#fake-video3").hide();

      $("#fake-video2").css("left", "");
      $("#fake-video1").css("right", "");

      $("#fake-video2").css("right", "5vw");
      $("#fake-video1").css("left", "5vw");
      $("#mostrar-slider-1").attr("src", "./images/slider_selecionado.png");
      $("#mostrar-slider-3").attr("src", "./images/slider_apagado.png");
      $("#mostrar-slider-2").attr("src", "./images/slider_apagado.png");
      break;
    case 4:
      Slide = 1;
      trocarSlide();
      break;
    case 0:
      Slide = 3;
      trocarSlide();
      break;
    default:
  }
}
