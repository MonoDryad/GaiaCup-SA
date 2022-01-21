

$(".qpmode, .iniciar-sessao").hover(
  function () {
    $(this).attr("src", function (index, attr) {
      $(".iniciar-sessao").css("cursor", "pointer");
      $(".iniciar-sessao").click(function () {
        window.location.href = "./isessao.html";
      });
      return attr.replace(".png", "-hover.png");
    });
  },
  function () {
    $(this).attr("src", function (index, attr) {
      $(".qpmode").css("cursor", "pointer");
      $(".qpmode").click(function () {
        window.location.href = "./registro.html";
      });
      return attr.replace("-hover.png", ".png");
    });
  }
);

let actualpage = window.location.pathname  

pageLoaded();

function pageLoaded() {
  switch (actualpage) {
    case '/public/index.html':
      $(".nav-link").removeClass("active");
      $("#index").addClass("active");
      break;
    case '/public/sobre.html':
      $(".nav-link").removeClass("active");
      $("#sobre").addClass("active");
      break;
    case '/public/regulamento.html':
      $(".nav-link").removeClass("active");
      $("#regulamento").addClass("active");
      break;
    case '/public/stream.html':
      $(".nav-link").removeClass("active");
      $("#stream").addClass("active");
      break;
  }
}
