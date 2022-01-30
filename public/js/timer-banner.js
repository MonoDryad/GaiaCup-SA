let countDownDate = new Date("Feb 07, 2022 19:00:00").getTime();

let x = setInterval(function () {
  let now = new Date().getTime();

  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $(".banner-timer-countdown").text(
    days + ":" + hours + ":" + minutes + ":" + seconds
  );

  if (distance < 0) {
    clearInterval(x);
    $(".banner-timer-countdown").text("AO VIVO!");
    $(".banner-timer-countdown").click(function(){
      window.href.location = './stream.html'
    });
  }
}, 1000);

$(".banner-close").hover(
  function () {
    $(this).attr("src", function (index, attr) {
      return attr.replace(".png", "-over.png");
    });
    $(".banner-close").click(function () {
      $(this).attr("src", function (index, attr) {
        return attr.replace(".png", "-down.png");
      });
    });
  },
  function () {
    $(".banner-close").click(function () {
      $(this).attr("src", function (index, attr) {
        return attr.replace("-down.png", ".png");
      });
    });
    $(this).attr("src", function (index, attr) {
      return attr.replace("-over.png", ".png");
    });
  }
);

$(".banner-close").click(function () {

    $(".banner-timing").addClass("opacity-animacao")
    setInterval(function () {
        $(".banner-timing").remove()
    }, 1000);
});
