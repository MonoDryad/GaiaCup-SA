let nextMatch = 7
nextMatchDay()

function nextMatchDay(){
  if(new Date().getDate() >= 10){
    nextMatch = 14
    if(new Date().getDate() >= 17){
      nextMatch = 21
      if(new Date().getDate() >= 24){
        nextMatch = 28
      }
    }
  }
}

let nextMatchOfTheMonth = nextMatch.toString()

let currentDay = new Date()
let countDownDate = new Date(`Feb ${nextMatch}, 2022 19:00:00`).getTime();

if(currentDay.getDay() > 1 && currentDay.getTime() > countDownDate){
  nextMatch += 2
  if(currentDay.getDay() > 3 && currentDay.getTime() > countDownDate){
    nextMatch += 5
    setNewDay()
  }
  setNewDay()
}

function setNewDay(){
  nextMatchOfTheMonth = nextMatch.toString()
  countDownDate = new Date(`Feb ${nextMatch}, 2022 19:00:00`).getTime();
}

let x = setInterval(function () {
  let agora = new Date().getTime();
  let distancia = countDownDate - agora;
  let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  if (distancia < 0) {
    $(".banner-timer-countdown").text('AO VIVO!')
    $(".banner-timer-countdown").click(function(){
      window.href.location = '../stream.html'});
  }else if(distancia < horas){

  } else{
    $(".banner-timer-countdown").text(dias + "d " + horas + "h "  + minutos + "m " +  segundos + "s");
  }
}, 300);

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
        $(".banner-timer-container").remove()
        $(".banner-timing").remove()
    }, 300);
});
