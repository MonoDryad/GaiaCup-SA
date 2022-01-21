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

pageLoaded();

function pageLoaded() {
  if (
    window.location.pathname == "/project_global_monodryad/index.html" ||
    window.location.pathname == "/public/index.html"
  ) {
    $(".nav-link").removeClass("active");
    $("#index").addClass("active");
  } else if (
    window.location.pathname == "/project_global_monodryad/sobre.html" ||
    window.location.pathname == "/public/sobre.html"
  ) {
    $(".nav-link").removeClass("active");
    $("#sobre").addClass("active");
  } else if (
    window.location.pathname == "/project_global_monodryad/regulamento.html" ||
    window.location.pathname == "/public/regulamento.html"
  ) {
    $(".nav-link").removeClass("active");
    $("#regulamento").addClass("active");
  } else if (
    window.location.pathname == "/project_global_monodryad/stream.html" ||
    window.location.pathname == "/public/stream.html"
  ) {
    $(".nav-link").removeClass("active");
    $("#stream").addClass("active");
  }
}
