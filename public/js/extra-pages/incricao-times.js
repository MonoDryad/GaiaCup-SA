let questaoN = 0

$('#InfoJogadorUm, #InfoJogadorDois, #InfoJogadorTres, #InfoJogadorQuatro, #InfoJogadorCinco, #InfoJogadorSeis, #InfoJogadorSete, #InfoJogadorOito, #InfoJogadorNove').hide()

function questaoProximo() {
    questaoN++
    pagina()
}

function questaoVoltar() {
    questaoN--
    pagina()
}

function pagina() {
    switch (questaoN) {
        case 1:
            $('#InfoLineup').hide()
            $('#InfoJogadorUm').show()
            $('#InfoJogadorDois').hide()
            $('#pLocalizacao').text('Informação do Jogador 1')
            $('#btnVoltar').removeAttr('disabled')
            break
        case 2:
            $('#InfoJogadorUm').hide()
            $('#InfoJogadorDois').show()
            $('#InfoJogadorTres').hide()
            $('#pLocalizacao').text('Informação do Jogador 2')
            break
        case 3:
            $('#InfoJogadorDois').hide()
            $('#InfoJogadorTres').show()
            $('#InfoJogadorQuatro').hide()
            $('#pLocalizacao').text('Informação do Jogador 3')
            break
        case 4:
            $('#InfoJogadorTres').hide()
            $('#InfoJogadorQuatro').show()
            $('#InfoJogadorCinco').hide()
            $('#pLocalizacao').text('Informação do Jogador 4')
            $('#btnFinish').prop('disabled', true)
            break
        case 5:
            $('#InfoJogadorQuatro').hide()
            $('#InfoJogadorCinco').show()
            $('#InfoJogadorSeis').hide()
            $('#btnFinish').removeAttr('disabled')
            $('#pLocalizacao').text('Informação do Jogador 5')
            break
        case 6:
            $('#InfoJogadorCinco').hide()
            $('#InfoJogadorSeis').show()
            $('#InfoJogadorSete').hide()
            $('#pLocalizacao').text('Informação do Jogador Reserva 1')
            break
        case 7:
            $('#InfoJogadorSeis').hide()
            $('#InfoJogadorSete').show()
            $('#InfoJogadorOito').hide()
            $('#pLocalizacao').text('Informação do Jogador Reserva 2')
            break
        case 8:
            $('#InfoJogadorSete').hide()
            $('#InfoJogadorOito').show()
            $('#InfoJogadorNove').hide()
            $('#pLocalizacao').text('Informação do Jogador Reserva 3')
            break
        case 9:
            $('#InfoJogadorOito').hide()
            $('#InfoJogadorNove').show()
            $('#pLocalizacao').text('Informação do Jogador Reserva 4')
            break
        case 10:
            $('#InfoJogadorNove').hide()
            $('#pLocalizacao').text('Obrigado por preencher o formulário, agora a equipe da Gaia irá analisar o seu time e, caso o seu time esteja 100% OK, iremos contatar o dono ou o capitão da lineup!')
            break
        case 0:
            $('#InfoLineup').show()
            $('#InfoJogadorUm').hide()
            $('#pLocalizacao').text('Informação da lineup')
            $('#btnVoltar').prop('disabled', true)
            break
    }
}