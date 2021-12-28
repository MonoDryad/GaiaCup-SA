let Slide = 0

$(window).resize(function () {
   if ($(window).width() < 809) {
      $('#fake-video1').css("display", "none")
      $('#fake-video2').css("display", "none")
      $('#fake-video3').css("display", "none")
   } else if ($(window).width() > 1500) {
      $('#fake-video1').css("max-width", "997px")
      $('#fake-video2').css("max-width", "997px")
      $('#fake-video3').css("max-width", "997px")
   } else if ($(window).width() > 809 && $(window).width() < 1500) {
      $('#fake-video1').css("display", "block")
      $('#fake-video2').css("display", "block")
      $('#fake-video3').css("display", "block")

      switch (Slide) {
         case 0:
            $('#fake-video1').hide()
            $('#fake-video2').show()
            $('#fake-video3').show()
            break
         case 1:
            $('#fake-video1').show()
            $('#fake-video2').hide()
            $('#fake-video3').show()
            break
         case 2:
            $('#fake-video1').show()
            $('#fake-video2').show()
            $('#fake-video3').hide()
         case 3:
            $('#fake-video1').hide()
            $('#fake-video2').show()
            $('#fake-video3').show()
      }

      $('#fake-video1').css("max-width", "750px")
      $('#fake-video2').css("max-width", "750px")
      $('#fake-video3').css("max-width", "750px")
   }

})

document.querySelector('#video1').addEventListener('ended', function () {
   Slide = 1
   trocarSlide()
})

document.querySelector('#video2').addEventListener('ended', function () {
   Slide = 2
   trocarSlide()
})

document.querySelector('#video3').addEventListener('ended', function () {
   Slide = 3
   trocarSlide()
})

function trocarSlide() {
   switch (Slide) {
      case 1:
         document.getElementById('video1').load()
         $('#video1').hide()
         $('#video2').show()
         $('#video3').hide()

         $('#fake-video1').show()
         $('#fake-video2').hide()
         $('#fake-video3').show()

         $('#fake-video1').css("right", "")
         $('#fake-video3').css("left", "")

         $('#fake-video1').css("left", "5vw")
         $('#fake-video3').css("right", "5vw")
         break
      case 2:
         document.getElementById('video2').load()
         document.getElementById('video2').currentTime = 0
         $('#video1').hide()
         $('#video2').hide()
         $('#video3').show()
         document.getElementById('video3').play()

         $('#fake-video1').show()
         $('#fake-video2').show()
         $('#fake-video3').hide()

         $('#fake-video1').css("left", "")
         $('#fake-video2').css("right", "")

         $('#fake-video1').css("right", "5vw")
         $('#fake-video2').css("left", "5vw")
         break
      case 3:
         document.getElementById('video2').load()
         document.getElementById('video2').currentTime = 0
         $('#video1').show()
         $('#video2').hide()
         $('#video3').hide()
         document.getElementById('video1').currentTime = 0
         document.getElementById('video1').play()

         $('#fake-video1').hide()
         $('#fake-video2').show()
         $('#fake-video3').show()

         $('#fake-video2').css("left", "")
         $('#fake-video3').css("right", "")

         $('#fake-video2').css("right", "5vw")
         $('#fake-video3').css("left", "5vw")
         break
   }
}

