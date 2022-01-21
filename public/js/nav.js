$(".qpmode, .iniciar-sessao").hover(
  function () {
    $(this).attr("src", function (index, attr) {
        $(".iniciar-sessao").css('cursor','pointer')
      $(".iniciar-sessao").click(function () {
        window.location.href = "./isessao.html";
      });
      return attr.replace(".png", "-hover.png");
    });
  },
  function () {
    $(this).attr("src", function (index, attr) {
      $(".qpmode").css('cursor','pointer')
      $(".qpmode").click(function () {
        window.location.href = "./registro.html";
      });
      return attr.replace("-hover.png", ".png");
      
    });
  }
);
