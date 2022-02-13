$(".qpmode, .iniciar-sessao").hover(
  function () {
    $(this).attr("src", function (index, attr) {
      $(".iniciar-sessao").css("cursor", "pointer");
      return attr.replace(".png", "-hover.png");
    });
  },
  function () {
    $(this).attr("src", function (index, attr) {
      $(".qpmode").css("cursor", "pointer");
      return attr.replace("-hover.png", ".png");
    });
  }
);

$(".qpmode, .iniciar-sessao").click(function(){
  let whatUserWant
  if($(this).hasClass('qpmode')){
    whatUserWant = 'register'
    localStorage.setItem('registerOrLogin', JSON.stringify(whatUserWant))
  }else{
    whatUserWant = 'login'
    localStorage.setItem('registerOrLogin', JSON.stringify(whatUserWant))
  }
  window.location.href = './login.html'
})

pageLoaded();

function pageLoaded() {
  if (window.location.pathname == "/index.html" ||window.location.pathname == "/project_global_monodryad/index.html" || window.location.pathname == "/public/index.html" || window.location.pathname == "/league/index.html" || window.location.pathname == "/") {
    $(".nav-link").removeClass("active");
    $("#index").addClass("active");
  } else if (window.location.pathname == "/sobre.html" || window.location.pathname == "/project_global_monodryad/sobre.html" || window.location.pathname == "/public/sobre.html" || window.location.pathname == "/league/sobre.html") {
    $(".nav-link").removeClass("active");
    $("#sobre").addClass("active");
  } else if (window.location.pathname == "/regulamento.html" || window.location.pathname == "/project_global_monodryad/regulamento.html" || window.location.pathname == "/public/regulamento.html" || window.location.pathname == "/league/regulamento.html") {
    $(".nav-link").removeClass("active");
    $("#regulamento").addClass("active");
  } else if (window.location.pathname == "/stream.html" || window.location.pathname == "/project_global_monodryad/stream.html" || window.location.pathname == "/public/stream.html" || window.location.pathname == "/league/stream.html") {
    $(".nav-link").removeClass("active");
    $("#stream").addClass("active");
  }
}
