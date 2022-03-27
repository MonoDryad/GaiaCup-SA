let pagina = 1
console.clear()
$('.btnProximo').on('click', function(){
    pagina++
    if(pagina == 12){
        callPage()
        $('.btnProximo').attr('disabled',true)
        return
    }

    callPage()
})

$('.btnAnterior').on('click', function(){
    pagina--
    if(pagina == 1){
        callPage()
        $('.btnAnterior').attr('disabled',true)
        return
    }
    callPage()
})

function callPage(){

    $('.page').text(`Página ${pagina}/12`)
    switch(pagina){
        case 1:
            $('.Informacoes-Org').css('display', 'block')
            $('.Redesocial-Org').css('display', 'none')
            $('.btnAnterior').attr('disabled',true)
            break
        case 2:
            $('.Informacoes-Org').css('display', 'none')
            $('.Redesocial-Org').css('display', 'block')
            $('.staff-Org').css('display', 'none')
            $('.btnAnterior').attr('disabled',false)
            break
        case 3:
            $('.Redesocial-Org').css('display', 'none')
            $('.staff-Org').css('display', 'block')
            $('.Jogador-1').css('display', 'none')
            break
        case 4:
            $('.staff-Org').css('display', 'none')
            $('.Jogador-1').css('display', 'block')
            $('.Jogador-2').css('display', 'none')
            break
        case 5:
            $('.Jogador-1').css('display', 'none')
            $('.Jogador-2').css('display', 'block')
            $('.Jogador-3').css('display', 'none')
            break
        case 6:
            $('.Jogador-2').css('display', 'none')
            $('.Jogador-3').css('display', 'block')
            $('.Jogador-4').css('display', 'none')
            break
        case 7:
            $('.Jogador-3').css('display', 'none')
            $('.Jogador-4').css('display', 'block')
            $('.Jogador-5').css('display', 'none')
            break
        case 8:
            $('.Jogador-4').css('display', 'none')
            $('.Jogador-5').css('display', 'block')
            $('.Reserva-1').css('display', 'none')
            break
        case 9:
            $('.Jogador-5').css('display', 'none')
            $('.Reserva-1').css('display', 'block')
            $('.Reserva-2').css('display', 'none')
            break
        case 10:
            $('.Reserva-1').css('display', 'none')
            $('.Reserva-2').css('display', 'block')
            $('.Reserva-3').css('display', 'none')
            break
        case 11:
            $('.Reserva-2').css('display', 'none')
            $('.Reserva-3').css('display', 'block')
            $('.Reserva-4').css('display', 'none')
            $('.btnProximo').attr('disabled',false)
            break
        case 12:
            $('.Reserva-3').css('display', 'none')
            $('.Reserva-4').css('display', 'block')
            break
    }
    console.clear()
}