// * // * // * SCRIPT * \\ * \\ * \\
$('.creatorConnected, .divTeam, .divCreatingTeam, .btnRemoverJogador, .creatorConnected-Remove, .divNoTeam, .divFindTeam').hide()

$('.goCreate').on('click', function(){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let teamObject = {
        nomeDaOrg: null,
        tagDaOrg: null,
        logoDaOrg: null,
        staff: [],
        jogadores: [],
        reservas: [],
        criadoPor: null,
        userIcon: null,
        dataCriacao: null,
        userBadge: null,
    }

    let data = new Date()
    teamObject.dataCriacao = `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`

    for(let i = 0;i < teams.length;i++){
        if($('.inpCreateTeamName').val() == teams[i].nomeDaOrg){
            Swal.fire({
                icon: 'error',
                title: `${$('.inpCreateTeamName').val()} já está registrado!`,
                position: 'center',
            })
            return
        }
    }
    teamObject.nomeDaOrg = $('.inpCreateTeamName').val()
    teamObject.tagDaOrg = $('.inpCreateTeamTag').val().toUpperCase()
    teamObject.logoDaOrg = $('.inpFileCreateTeamLogo').val()

    teamObject.criadoPor = JSON.parse(localStorage.getItem('ContaConectada')).username
    teamObject.userIcon = JSON.parse(localStorage.getItem('ContaConectada')).icon
    teamObject.userBadge = JSON.parse(localStorage.getItem('ContaConectada')).badge

    teams.push(teamObject)
    localStorage.setItem('teams', JSON.stringify(teams))

    let contaUsuario = JSON.parse(localStorage.getItem('ContaConectada'))
    contaUsuario.team = $('.inpCreateTeamName').val()
    localStorage.setItem('ContaConectada', JSON.stringify(contaUsuario))

    let contas
    if(JSON.parse(localStorage.getItem('ContaConectada')).isAdmin == true){
        contas = JSON.parse(localStorage.getItem('admin'))
    }else{
        contas = JSON.parse(localStorage.getItem('contas'))
    }

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == contaUsuario.username){
          contas.splice(i, 1, contaUsuario)
          if(JSON.parse(localStorage.getItem('ContaConectada')).isAdmin == true){
                localStorage.setItem('admin',JSON.stringify(contas))
            }else{
                localStorage.setItem('contas',JSON.stringify(contas))
            }
          break
        }
    }

    $('.divCreatingTeam').hide()
    $('.divTeam').show()

    myteam()
})

let connectedTeam

$(document).ready(function(){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contaConectada = JSON.parse(localStorage.getItem('ContaConectada')) || false
    if(contaConectada.isConnected == true){
        $('.divNoAccount').hide()
        $('.divNoTeam').show()
        for(let i = 0; i < teams.length;i++){
            if(teams[i].nomeDaOrg == JSON.parse(localStorage.getItem('ContaConectada')).team){
                $('.divTeam').show() 
                $('.divNoTeam').hide()
                myteam()
                updateMyTeam()
            }
        }
    }else{
        $('.divNoAccount').hide()
        $('.divNoTeam').show()
    }
})

// MUDAR ACIMA!!!!

function myteam(){
    for(let i = 0;i < JSON.parse(localStorage.getItem('teams')).length; i++ ){
        if(JSON.parse(localStorage.getItem('ContaConectada')).team == JSON.parse(localStorage.getItem('teams'))[i].nomeDaOrg){
            connectedTeam = JSON.parse(localStorage.getItem('teams'))[i]
        }
    }

    $('.teamHeaderImg').attr('src', connectedTeam.logoDaOrg)
    $('.h2TeamHeaderName').text(connectedTeam.nomeDaOrg)
    $('.h3TagHeaderName').text(connectedTeam.tagDaOrg)
    $('.nameCreatedBy').html(`${connectedTeam.criadoPor} ${connectedTeam.userBadge}`)
    $('.dateCreated').text(connectedTeam.dataCriacao)
    $('.imgCreatedByUser').attr('src', connectedTeam.userIcon)

    if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
        $('.creatorConnected').show()
    }

    if(connectedTeam.staff.length > 0){
        for(let i = 0; i < connectedTeam.staff.length; i++){
            if(connectedTeam.staff[i].rota == 'Técnico' || connectedTeam.staff[i].rota == 'Analista'){
                $(`.perfilFuncao-${i+1}`).text(connectedTeam.staff[i].rota)
                $(`.perfilNomeTecnico-${i+1}`).val(connectedTeam.staff[i].username)
                $(`.perfilImageTecnico-${i+1}`).attr('src', connectedTeam.staff[i].icon)
                if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                    $(`.btnRemoverStaff-${i+1}`).show()
                }
            }
        }
    }

    if(connectedTeam.reservas.length > 0){
        for(let i = 0; i < connectedTeam.reservas.length; i++){
            $(`.perfilRotaJogadorReserva-${i+1}`).text(connectedTeam.reservas[i].rota)
            $(`.perfilNomeJogadorReserva-${i+1}`).val(connectedTeam.reservas[i].username)
            $(`.perfilImageJogadorReserva-${i+1}`).attr('src', connectedTeam.reservas[i].icon)
            $(`.perfilInvocadorReserva-${i+1}`).html(`${connectedTeam.reservas[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${connectedTeam.reservas[i].invocador}">League of Graphs</a>`)
            if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                $(`.btnRemoverJogadorReserva-${i+1}`).show()
            }
        }
    }

    if(connectedTeam.jogadores.length > 0){
        for(let i = 0; i < connectedTeam.jogadores.length; i++){
            if(connectedTeam.jogadores[i].rota == 'Topo'){
                $('.perfilRotaJogador-1').text(connectedTeam.jogadores[i].rota)
                $('.perfilNomeJogador-1').val(connectedTeam.jogadores[i].username)
                $('.perfilImageJogador-1').attr('src',connectedTeam.jogadores[i].icon)
                $('.perfilInvocador-1').html(`${connectedTeam.jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${connectedTeam.jogadores[i].invocador}">League of Graphs</a>`)
                if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                    $('.btnRemoverJogador-1').show()
                }
                $('.Rota-1').hide()  
            }
            if(connectedTeam.jogadores[i].rota == 'Selva'){
                $('.perfilRotaJogador-2').text(connectedTeam.jogadores[i].rota)
                $('.perfilNomeJogador-2').val(connectedTeam.jogadores[i].username)
                $('.perfilImageJogador-2').attr('src',connectedTeam.jogadores[i].icon)
                $('.perfilInvocador-2').html(`${connectedTeam.jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${connectedTeam.jogadores[i].invocador}">League of Graphs</a>`)
                if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                    $('.btnRemoverJogador-2').show()
                }
                $('.Rota-2').hide()
            }
            if(connectedTeam.jogadores[i].rota == 'Meio'){
                $('.perfilRotaJogador-3').text(connectedTeam.jogadores[i].rota)
                $('.perfilNomeJogador-3').val(connectedTeam.jogadores[i].username)
                $('.perfilImageJogador-3').attr('src',connectedTeam.jogadores[i].icon)
                $('.perfilInvocador-3').html(`${connectedTeam.jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${connectedTeam.jogadores[i].invocador}">League of Graphs</a>`)
                if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                    $('.btnRemoverJogador-3').show()
                }
                $('.Rota-3').hide()
            }
            if(connectedTeam.jogadores[i].rota == 'Atirador'){
                $('.perfilRotaJogador-4').text(connectedTeam.jogadores[i].rota)
                $('.perfilNomeJogador-4').val(connectedTeam.jogadores[i].username)
                $('.perfilImageJogador-4').attr('src',connectedTeam.jogadores[i].icon)
                $('.perfilInvocador-4').html(`${connectedTeam.jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${connectedTeam.jogadores[i].invocador}">League of Graphs</a>`)
                if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                    $('.btnRemoverJogador-4').show()
                }
                $('.Rota-4').hide()
            }
            if(connectedTeam.jogadores[i].rota == 'Suporte'){
                $('.perfilRotaJogador-5').text(connectedTeam.jogadores[i].rota)
                $('.perfilNomeJogador-5').val(connectedTeam.jogadores[i].username)
                $('.perfilImageJogador-5').attr('src',connectedTeam.jogadores[i].icon)
                $('.perfilInvocador-5').html(`${connectedTeam.jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${connectedTeam.jogadores[i].invocador}">League of Graphs</a>`)
                if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
                    $('.btnRemoverJogador-5').show()
                }
                $('.Rota-5').hide()
            }
        }
    }
}

function updateMyTeam(){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contas = JSON.parse(localStorage.getItem('contas')) || []
    let jogadorAtualizado


    let jogadorNumero = 0
    let players = 1

    if(jogadorNumero > connectedTeam.jogadores.length-1){
        players = 0
    }
    let i = 0

    while(players != 0){
        if(contas[i].username == connectedTeam.jogadores[jogadorNumero].username){
            jogadorAtualizado = contas[i]
            connectedTeam.jogadores.splice(jogadorNumero, 1, jogadorAtualizado)
            jogadorNumero++
        }else{
            i++
        }


        $(`.perfilImageJogador-${jogadorNumero}`).on('error', function(){
            jogadorAtualizado.icon = `https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon${Math.round(Math.random() * 5268)}.png`
            contas.splice(i, 1, jogadorAtualizado)
            localStorage.setItem('contas',JSON.stringify(contas))
        })

        if(i > contas.length-1){
            i = 0
        }

        if(jogadorNumero > connectedTeam.jogadores.length-1){
            players = 0
        }
    }

    if(jogadorNumero > connectedTeam.jogadores.length-1){
        for(let i = 0; i < teams.length;i++){
            if(teams[i].nomeDaOrg == JSON.parse(localStorage.getItem('ContaConectada')).team){
                teams.splice(i, 1, connectedTeam)
                localStorage.setItem('teams',JSON.stringify(teams))
                playerSuccessfully.fire({
                    icon: 'success',
                    title: 'Time atualizado com sucesso!'
                })
            }
        }
    }

    localStorage.setItem('contas', JSON.stringify(contas))
}

$('.addPlayer').one('click', function(){
    if(connectedTeam.jogadores.length >= 5){
        $('.addPlayer').attr('data-bs-target', ' ')
        $('.addPlayer').attr('data-bs-toggle', ' ')
    }else{
        $('.addPlayer').attr('data-bs-target', '#addPlayer')
        $('.addPlayer').attr('data-bs-toggle', 'modal')
        $(this).trigger('click')
    }
})

$('.addPlayer').on('click', function(){
    if(connectedTeam.jogadores.length >= 5){
        Swal.fire({
            icon: 'error',
            title: `A sua Line-up está completa!`,
            position: 'center',
        })
    }
})

$('.addStaff').one('click', function(){
    if(connectedTeam.staff.length >= 4){
        $(this).attr('data-bs-target', ' ')
        $(this).attr('data-bs-toggle', ' ')
    }else{
        $(this).attr('data-bs-target', '#addStaff')
        $(this).attr('data-bs-toggle', 'modal')
        $(this).trigger('click')
    }
})

$('.addStaff').on('click', function(){
    if(connectedTeam.staff.length >= 4){
        Swal.fire({
            icon: 'error',
            title: `A sua Staff está cheia!`,
            position: 'center',
        })
    }
})

$('.addReserva').one('click', function(){
    if(connectedTeam.reservas.length >= 4){
        $(this).attr('data-bs-target', ' ')
        $(this).attr('data-bs-toggle', ' ')
    }else{
        $(this).attr('data-bs-target', '#addReserva')
        $(this).attr('data-bs-toggle', 'modal')
        $(this).trigger('click')
    }
})

$('.addReserva').on('click', function(){
    if(connectedTeam.reservas.length >= 4){
        Swal.fire({
            icon: 'error',
            title: `A sua Line-up reserva está completa!`,
            position: 'center',
        })
    }
})

$('.btnRemoverJogador').on('click', function(){
    let contas = JSON.parse(localStorage.getItem('contas')) || []
    let text2 = $(this).parent()

    if($(this).parent().hasClass(`divJogador-${text2[0].classList[1].charAt(11)}`)){
        for(let i = 0; i <= connectedTeam.jogadores.length;i++){
            if($(`.divJogador-${text2[0].classList[1].charAt(11)}`).find(`.perfilNomeJogador-${text2[0].classList[1].charAt(11)}`).val() == connectedTeam.jogadores[i].username){
                for(let iC;iC < contas.length; iC++){
                    if(connectedTeam.jogadores[i].username == contas[iC].username){
                        contas[iC].rota = null
                        contas[iC].team = null
                        localStorage.setItem('contas',JSON.stringify(contas))
                    }
                }
                connectedTeam.jogadores.splice(i, 1)

                let teams = JSON.parse(localStorage.getItem('teams')) || []
                for(let i = 0; i < teams.length;i++){
                    if(teams[i].nomeDaOrg == JSON.parse(localStorage.getItem('ContaConectada')).team){
                        teams.splice(i, 1, connectedTeam)
                        localStorage.setItem('teams',JSON.stringify(teams))
                        location.reload(true)
                    }
                }
            }
        }
    }

    if($(this).parent().hasClass(`divJogadorReserva-${text2[0].classList[1].charAt(18)}`)){
        for(let i = 0; i <= connectedTeam.reservas.length-1;i++){
            if($(`.divJogadorReserva-${text2[0].classList[1].charAt(18)}`).find(`.perfilNomeJogadorReserva-${text2[0].classList[1].charAt(18)}`).val() == connectedTeam.reservas[i].username){
                for(let iC;iC < contas.length; iC++){
                    if(connectedTeam.reservas[i].username == contas[iC].username){
                        contas[iC].rota = null
                        contas[iC].team = null
                        localStorage.setItem('contas',JSON.stringify(contas))
                    }
                }
                connectedTeam.reservas.splice(i, 1)

                let teams = JSON.parse(localStorage.getItem('teams')) || []
                for(let i = 0; i < teams.length;i++){
                    if(teams[i].nomeDaOrg == JSON.parse(localStorage.getItem('ContaConectada')).team){
                        teams.splice(i, 1, connectedTeam)
                        localStorage.setItem('teams',JSON.stringify(teams))
                        location.reload(true)
                    }
                }
            }
        }
    }

    if($(this).parent().hasClass(`divStaff-${text2[0].classList[1].charAt(9)}`)){
        for(let i = 0; i <= connectedTeam.staff.length-1;i++){
            if($(`.divStaff-${text2[0].classList[1].charAt(9)}`).find(`.perfilNomeTecnico-${text2[0].classList[1].charAt(9)}`).val() == connectedTeam.staff[i].username){
                for(let iC;iC < contas.length; iC++){
                    if(connectedTeam.staff[i].username == contas[iC].username){
                        contas[iC].rota = null
                        contas[iC].team = null
                        localStorage.setItem('contas',JSON.stringify(contas))
                    }
                }
                connectedTeam.staff.splice(i, 1)

                let teams = JSON.parse(localStorage.getItem('teams')) || []
                for(let i = 0; i < teams.length;i++){
                    if(teams[i].nomeDaOrg == JSON.parse(localStorage.getItem('ContaConectada')).team){
                        teams.splice(i, 1, connectedTeam)
                        localStorage.setItem('teams',JSON.stringify(teams))
                        location.reload(true)
                    }
                }
            }
        }
    }
})

$('.editInformation').on('click', function(){
    $('.editarNome').val(connectedTeam.nomeDaOrg)
    $('.editarTag').val(connectedTeam.tagDaOrg)
    $('.editarLogo').val(connectedTeam.logoDaOrg)
})

$('.salvarMudancasTeam').on('click', function(){
    connectedTeam.nomeDaOrg = $('.editarNome').val()
    connectedTeam.tagDaOrg = $('.editarTag').val().toUpperCase()
    connectedTeam.logoDaOrg = $('.editarLogo').val()

    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contas = JSON.parse(localStorage.getItem('contas')) || []
    let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))

    for(let i = 0; i < teams.length;i++){
        if(teams[i].nomeDaOrg == contaConectada.team){
            teams.splice(i, 1, connectedTeam)
            localStorage.setItem('teams',JSON.stringify(teams))
            contaConectada.team = $('.editarNome').val()
        }
    }

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == contaConectada.username){
            contas.splice(i, 1, contaConectada)
            localStorage.setItem('contas', JSON.stringify(contas))
        }
    }

    localStorage.setItem('ContaConectada', JSON.stringify(contaConectada))
    location.reload(true);
})

$('.callPlayerToTeam').on('click', function(){
    for(let i = 0; i < connectedTeam.jogadores.length;i++){
        if(connectedTeam.jogadores[i].username == $('.callUser').val()){
            Swal.fire({
                icon: 'error',
                title: `${$('.callUser').val()} já está no time`,
                position: 'center',
            })
            return
        }
    }

    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contas = JSON.parse(localStorage.getItem('contas')) || []

    let jogadorAdicionado
    let usuarioEncontrado = 0

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == $('.callUser').val()){
            connectedTeam.jogadores.push(contas[i])
            jogadorAdicionado = contas[i]
            jogadorAdicionado.team = connectedTeam.nomeDaOrg
            jogadorAdicionado.rota = $('.selectPlayerLane option:selected').text()
            if($('.callUser').val() == JSON.parse(localStorage.getItem('ContaConectada')).username){
                let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))
                contaConectada.rota = $('.selectPlayerLane option:selected').text()
                localStorage.setItem('ContaConectada', JSON.stringify(contaConectada))
            }

            contas.splice(i, 1, jogadorAdicionado)
            localStorage.setItem('contas', JSON.stringify(contas))
            usuarioEncontrado = 1
        }
    }

    if(usuarioEncontrado == 0){
        Swal.fire({
            icon: 'error',
            title: `${$('.callUser').val()} não está registrado!`,
            position: 'center',
        })
        return
    }

    for(let i = 0; i < connectedTeam.reservas.length;i++){
        console.log('primeiro For ' + i)
        for(let iTwo = 0; iTwo < connectedTeam.jogadores.length;iTwo++){
            console.log('segundo For ' + iTwo)
            if(connectedTeam.jogadores[iTwo].username == connectedTeam.reservas[i].username){
                console.log('Vamos ver: é igual? ' + connectedTeam.jogadores[iTwo].username == connectedTeam.reservas[i].username)
                Swal.fire({
                    icon: 'error',
                    title: `${connectedTeam.jogadores[i].username} já está registrado como reserva!`,
                    position: 'center',
                })
                return
            }
        }
    }

    for(let i = 0; i < teams.length;i++){
        if(jogadorAdicionado.team == teams[i].nomeDaOrg){
            teams.splice(i, 1, connectedTeam)
            localStorage.setItem('teams',JSON.stringify(teams))
        }
    }

    location.reload(true);

})

$('.callStaffToTeam').on('click', function(){
    for(let i = 0; i < connectedTeam.staff.length;i++){
        if(connectedTeam.staff[i].username == $('.callStaffUser').val()){
            Swal.fire({
                icon: 'error',
                title: `${$('.callUser').val()} já está no time`,
                position: 'center',
            })
            return
        }
    }

    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contas = JSON.parse(localStorage.getItem('contas')) || []

    let jogadorAdicionado
    let usuarioEncontrado = 0

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == $('.callStaffUser').val()){
            connectedTeam.staff.push(contas[i])
            jogadorAdicionado = contas[i]
            jogadorAdicionado.team = connectedTeam.nomeDaOrg
            jogadorAdicionado.rota = $('.selectStaffFunction option:selected').text()
            if($('.callStaffUser').val() == JSON.parse(localStorage.getItem('ContaConectada')).username){
                let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))
                contaConectada.rota = $('.selectStaffFunction option:selected').text()
                localStorage.setItem('ContaConectada', JSON.stringify(contaConectada))
            }

            contas.splice(i, 1, jogadorAdicionado)
            localStorage.setItem('contas', JSON.stringify(contas))
            usuarioEncontrado = 1
        }
    }

    if(usuarioEncontrado == 0){
        Swal.fire({
            icon: 'error',
            title: `${$('.callStaffUser').val()} não está registrado !`,
            position: 'center',
        })
        return
    }

    for(let i = 0; i < teams.length;i++){
        if(jogadorAdicionado.team == teams[i].nomeDaOrg){
            teams.splice(i, 1, connectedTeam)
            localStorage.setItem('teams',JSON.stringify(teams))
        }
    }
    location.reload(true);
})

$('.callReservaToTeam').on('click', function(){
    for(let i = 0; i < connectedTeam.reservas.length;i++){
        if(connectedTeam.reservas[i].username == $('.callReservaUser').val()){
            Swal.fire({
                icon: 'error',
                title: `${$('.callReservaUser').val()} já está no time`,
                position: 'center',
            })
            return
        }
    }

    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contas = JSON.parse(localStorage.getItem('contas')) || []

    let jogadorAdicionado
    let usuarioEncontrado = 0

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == $('.callReservaUser').val()){
            connectedTeam.reservas.push(contas[i])
            jogadorAdicionado = contas[i]
            jogadorAdicionado.team = connectedTeam.nomeDaOrg
            jogadorAdicionado.rota = $('.selectReservaLane option:selected').text()
            if($('.callReservaUser').val() == JSON.parse(localStorage.getItem('ContaConectada')).username){
                let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))
                contaConectada.rota = $('.selectReservaLane option:selected').text()
                localStorage.setItem('ContaConectada', JSON.stringify(contaConectada))
            }

            contas.splice(i, 1, jogadorAdicionado)
            localStorage.setItem('contas', JSON.stringify(contas))
            usuarioEncontrado = 1
        }
    }

    for(let i = 0; i < connectedTeam.jogadores.length-1;i++){
        for(let iTwo = 0; iTwo < connectedTeam.reservas.length-1;iTwo++){
            if(connectedTeam.jogadores[i].username == connectedTeam.reservas[iTwo].username){
                Swal.fire({
                    icon: 'error',
                    title: `${connectedTeam.jogadores[i].username} já está registrado como reserva!`,
                    position: 'center',
                })
                return
            }
        }
    }

    if(usuarioEncontrado == 0){
        Swal.fire({
            icon: 'error',
            title: `${$('.callReservaUser').val()} não está registrado !`,
            position: 'center',
        })
        return
    }

    for(let i = 0; i < teams.length;i++){
        if(jogadorAdicionado.team == teams[i].nomeDaOrg){
            teams.splice(i, 1, connectedTeam)
            localStorage.setItem('teams',JSON.stringify(teams))
        }
    }
    location.reload(true);
})

$('.removeTeam').on('click', function(){

    Swal.fire({
        title: 'Você tem certeza?',
        text: "Seu time será deletado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Deletar!'
    }).then((result) => {
        if (result.isConfirmed) {
            let teams = JSON.parse(localStorage.getItem('teams')) || []
            let contas = JSON.parse(localStorage.getItem('contas')) || []
            let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))
            contaConectada.team = null
            contaConectada.rota = null
    
            for(let i = 0; i < contas.length;i++){
                if(contas[i].username == contaConectada.username){
                    contas.splice(i, 1, contaConectada)
                    localStorage.setItem('contas',JSON.stringify(contas))
                }
            }
    
            localStorage.setItem('ContaConectada',JSON.stringify(contaConectada))

            let aindaTemJogadores = 1
            let aindaTemStaff = 1
            let aindaTemReserva = 1
    
            if(connectedTeam.jogadores.length == 0){
                aindaTemJogadores = 0
            }

            if(connectedTeam.staff.length == 0){
                aindaTemStaff = 0
            }

            if(connectedTeam.reservas.length == 0){
                aindaTemReserva = 0
            }

            localStorage.setItem('contas',JSON.stringify(contas))
            for(let i = 0;i < teams.length; i++ ){
                if(connectedTeam.nomeDaOrg == teams[i].nomeDaOrg){
                    teams.splice(i, 1)
                    localStorage.setItem('teams',JSON.stringify(teams))
                }
            }
    
            while(aindaTemJogadores != 0){
                for(let i = 0; i < contas.length;i++){
                    console.log('Conta: ' + i)
                    if(connectedTeam.jogadores[0].username == contas[i].username){
                        console.log('achou ' + contas[i].username + ' é igual a ' + connectedTeam.jogadores[0].username + ` (${connectedTeam.jogadores[0].username == contas[i].username})`)
                        connectedTeam.jogadores[0].team = null
                        connectedTeam.jogadores[0].rota = null
                        contas.splice(i, 1, connectedTeam.jogadores[0])
                        connectedTeam.jogadores.splice(0, 1)
                        localStorage.setItem('contas',JSON.stringify(contas))
                        if(connectedTeam.jogadores.length < 1){
                            aindaTemJogadores = 0
                            break
                        }
                    }
                }
                if(connectedTeam.jogadores.length < 1){
                    aindaTemJogadores = 0
                }
            }

            while(aindaTemStaff != 0){
                for(let i = 0; i < contas.length;i++){
                    console.log('Conta: ' + i)
                    if(contas[i].username == connectedTeam.staff[0].username){
                        console.log('achou ' + contas[i].username + ' é igual a ' + connectedTeam.staff[0].username + ` (${connectedTeam.staff[0].username == contas[i].username})`)
                        connectedTeam.staff[0].team = null
                        connectedTeam.staff[0].rota = null
                        contas.splice(i, 1, connectedTeam.staff[0])
                        connectedTeam.staff.splice(0, 1)
                        localStorage.setItem('contas',JSON.stringify(contas))
                        if(connectedTeam.staff.length == 0){
                            aindaTemStaff = 0
                            break
                        }
                    }
                }
                if(connectedTeam.staff.length == 0){
                    aindaTemStaff = 0
                }
            }

            while(aindaTemReserva != 0){
                for(let i = 0; i < contas.length;i++){
                    console.log('Conta: ' + i)
                    if(contas[i].username == connectedTeam.reservas[0].username){
                        console.log('achou ' + contas[i].username + ' é igual a ' + connectedTeam.reservas[0].username + ` (${connectedTeam.reservas[0].username == contas[i].username})`)
                        connectedTeam.reservas[0].team = null
                        connectedTeam.reservas[0].rota = null
                        contas.splice(i, 1, connectedTeam.reservas[0])
                        connectedTeam.reservas.splice(0, 1)
                        localStorage.setItem('contas',JSON.stringify(contas))
                        if(connectedTeam.reservas.length == 0){
                            aindaTemReserva = 0
                            break
                        }
                    }
                }
                if(connectedTeam.reservas.length == 0){
                    aindaTemReserva = 0
                }
            }

            Swal.fire(
                'Deletado!',
                'A página será recarregada ao confirmar.',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    location.reload(true);
                }
            })

        }else{
            return
        }
    })
})

function findTeam() {
    let teams = JSON.parse(localStorage.getItem('teams')) || []

    for(let i = 0; i < teams.length;i++){
        let teamToFind = i
        $('.teamsGoHere').append(`
        <div class="letItBeResponsive" style="width: 15%; margin: 1%;">
            <div class="${teams[i].nomeDaOrg.replaceAll(' ','')}" style="text-align: center">
                <img class='imgTeamFind' src='${teams[i].logoDaOrg}' >
                <h5>${teams[i].nomeDaOrg}</h5>
                <p class="tagFindTeams">${teams[i].tagDaOrg}</p>
                <button onclick='seeTeam(${teamToFind})' class="btn btn-dark seeTeam-${i}">Ver Time</button>
            </div>
        </div>`)
    }
}

function seeTeam(teamFinded){
    let teams = JSON.parse(localStorage.getItem('teams')) || []

    for(let i = 0; i < teams.length;i++){
        if($(`.seeTeam-${teamFinded}`).parent().hasClass(`${teams[i].nomeDaOrg.replaceAll(' ','')}`)){
            console.log($(`.removeIt`).hasClass(`trigger-${i}`))
            if($(`.removeIt`).hasClass(`trigger-${i}`) ){
                $(`.trigger-${i}`).trigger('click')
                return
            }
            $('.customCanvasGoHere').append(`
            <button class="trigger-${i} removeIt " type="button" data-bs-toggle="offcanvas" data-bs-target="#${teams[i].nomeDaOrg.replaceAll(' ','')}" aria-controls="offcanvasBottom"></button>

            <div class="offcanvas offcanvas-bottom bg-dark" data-bs-scroll="false" tabindex="-1" id="${teams[i].nomeDaOrg.replaceAll(' ','')}" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header SeeTeamHeader">
                    <img class='imgTeamFind-offcanvas' src='${teams[i].logoDaOrg}'>
                    <label class="offcanvas-title bigText-TeamName" id="offcanvasBottomLabel">${teams[i].nomeDaOrg} <label class="smallText-TagTeam"> ${teams[i].tagDaOrg}</label></label>
                    <button type="button" class="btn-close  btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <label style="text-align: center;">Criado por: ${teams[i].criadoPor} ${teams[i].userBadge} - ${teams[i].dataCriacao}</label>
                <hr>
                <div class="offcanvas-body divSeeTeamInfo large">
                    <div class="divSubSeeTeamInfo divSeePlayers">
                        <hr>
                        <h5 class="seeTitleSide">Jogadores</h5>
                        <hr>
                        ${callPlayer(teams[i].jogadores.length, i)}
                    </div>
                    <div class="divSubSeeTeamInfo divSeeReservas">
                        <hr>
                        <h5 class="seeTitleSide">Reservas</h5>
                        <hr>
                        ${callReservas(teams[i].reservas.length, i)}
                    </div>
                    <div class="divSubSeeTeamInfo divSeeStaffs">
                        <hr>
                        <h5 class="seeTitleSide">Staff</h5>
                        <hr>
                        ${callStaff(teams[i].staff.length, i)}
                    </div>
                </div>
            </div>`)
            $(`.trigger-${i}`).trigger('click')
        }
    }
}

function callPlayer(teamSize, teamPosition){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let whatWillGoToAppend = ``

    for(let i = 0; i < teamSize; i++){
        whatWillGoToAppend += `<div class="seePlayersShowing player-${i}"> \n`
        whatWillGoToAppend += `<label class="playerRotaSee player-${i}-rota">${teams[teamPosition].jogadores[i].rota}</label> \n`
        whatWillGoToAppend += `<label class="player-${i}-username playerUsernameSee"><img class="player-${i}-icon myIconSeeTeam" src="${teams[teamPosition].jogadores[i].icon}">${teams[teamPosition].jogadores[i].username}</label> \n`
        whatWillGoToAppend += `<label class="playerInvocadorSee player-${i}-invocador">${teams[teamPosition].jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${teams[teamPosition].jogadores[i].invocador}">League of Graphs</a></label> \n`
        whatWillGoToAppend += `</div>
        <hr>`
    }
    return whatWillGoToAppend
}

function callReservas(teamSize, teamPosition){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let whatWillGoToAppend = ``

    for(let i = 0; i < teamSize; i++){
        whatWillGoToAppend += `<div class="seePlayersShowing reserva-${i}"> \n`
        whatWillGoToAppend += `<label class="playerRotaSee reserva-${i}-rota">${teams[teamPosition].reservas[i].rota}</label> \n`
        whatWillGoToAppend += `<label class="reserva-${i}-username playerUsernameSee"><img class="reserva-${i}-icon myIconSeeTeam" src="${teams[teamPosition].reservas[i].icon}">${teams[teamPosition].reservas[i].username}</label> \n`
        whatWillGoToAppend += `<label class="playerInvocadorSee reserva-${i}-invocador">${teams[teamPosition].reservas[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${teams[teamPosition].reservas[i].invocador}">League of Graphs</a></label> \n`
        whatWillGoToAppend += `</div>
        <hr>`
    }
    return whatWillGoToAppend
}

function callStaff(teamSize, teamPosition){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let whatWillGoToAppend = ``

    for(let i = 0; i < teamSize; i++){
        whatWillGoToAppend += `<div class="seePlayersShowing staff-${i}"> \n`
        whatWillGoToAppend += `<label class="playerRotaSee staff-${i}-rota">${teams[teamPosition].staff[i].rota}</label> \n`
        whatWillGoToAppend += `<label class="staff-${i}-username playerUsernameSee"><img class="staff-${i}-icon myIconSeeTeam" src="${teams[teamPosition].staff[i].icon}">${teams[teamPosition].staff[i].username}</label> \n`
        whatWillGoToAppend += `</div>
        <hr>`
    }
    return whatWillGoToAppend
}


// * // * // * PAGE FUNCTIONALITY * \\ * \\ * \\

$('.btnCreateTeam').on('click', function(){
    $('.divNoTeam').hide()
    $('.divCreatingTeam').show()
})

$('.btnSearchTeam').on('click', function(){
    $('.divNoTeam').hide()
    $('.divFindTeam').show()
    $('.MyTeam-Title').hide()
    $('.container-myteam').hide()
    findTeam()
})

$('.goBack').on('click', function(){
    $('.divNoTeam').show()
    $('.divCreatingTeam').hide()
})

$('.createTeamTag, .createTeamName, .createTeamLogo').hide()

$('input').focusin(function(){
    if($(this).hasClass('inpCreateTeamName')){
        $(this).attr('placeholder', '')
        $('.createTeamName').addClass('input-goup-login')
        $('.createTeamName').show()
    }else if($(this).hasClass('inpCreateTeamTag')){
        $(this).attr('placeholder', '')
        $('.createTeamTag').addClass('input-goup-login')
        $('.createTeamTag').show()
    }else if($(this).hasClass('inpFileCreateTeamLogo')){
        $(this).attr('placeholder', '')
        $('.createTeamLogo').addClass('input-goup-login')
        $('.createTeamLogo').show()
    }
})

$('input').focusout(function(){
    if($(this).hasClass('inpCreateTeamName') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Nome da Organização')
        $('.createTeamName').hide()
    }else if($(this).hasClass('inpCreateTeamTag') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Tag da Organização')
        $('.createTeamTag').hide()
    }else if($(this).hasClass('inpFileCreateTeamLogo') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Adicionar link para a logo')
        $('.createTeamLogo').hide()
    }
})

const playerSuccessfully = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
})

pushTeams()
function pushTeams(){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let time0 = {
        nomeDaOrg: 'KINGSMAN EsportS',
        tagDaOrg: 'KNS',
        logoDaOrg: 'https://d33wubrfki0l68.cloudfront.net/3b528993-be69-414c-b3e5-ba6e75de2fc5/Logo.png',
        staff: [],
        jogadores: 
        [
            {
                username: 'Geterwin',
                email: 'geterwin@gmail.com',
                senha: 'geterwin',
                invocador: 'Geterwin',
                rota: 'Topo',
                codigo: 500,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon654.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Dioniso',
                email: 'dioniso@gmail.com',
                senha: 'dioniso',
                invocador: 'Dioniso',
                rota: 'Selva',
                codigo: 501,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5229.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Tyrantrum',
                email: 'tyrantrum@gmail.com',
                senha: 'tyrantrum',
                invocador: 'Tyrantrum',
                rota: 'Meio',
                codigo: 502,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon3152.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Hearth Moon',
                email: 'hearthMoon@gmail.com',
                senha: 'hearthMoon',
                invocador: 'Hearth Moon',
                rota: 'Atirador',
                codigo: 503,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4618.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Piveta',
                email: 'Piveta@gmail.com',
                senha: 'Piveta',
                invocador: 'Piveta',
                rota: 'Suporte',
                codigo: 504,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4631.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: 
        [
            {
                username: 'Raphael',
                email: 'raphael@gmail.com',
                senha: 'raphael',
                invocador: 'Raphael da UFES',
                rota: 'Suporte',
                codigo: 510,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon2098.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '14/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }
    let time1 = {
        nomeDaOrg: 'Equipe 7 Gaming',
        tagDaOrg: 'E7',
        logoDaOrg: 'https://d33wubrfki0l68.cloudfront.net/5d945835-931f-45d0-882a-e09545fbde93/e7%20(1).png',
        staff: [],
        jogadores: 
        [
            {
                username: '2noé',
                email: '2noé@gmail.com',
                senha: '2noé',
                invocador: '2noé',
                rota: 'Topo',
                codigo: 600,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon1386.png',
                isAdmin: false,
                team: 'Equipe 7 Gaming',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Divine Itachi',
                email: 'DivineItachi@gmail.com',
                senha: 'DivineItachi',
                invocador: 'Divine Itachi',
                rota: 'Meio',
                codigo: 602,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4902.png',
                isAdmin: false,
                team: 'Equipe 7 Gaming',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Lee Gumayusi',
                email: 'LeeGumayusi@gmail.com',
                senha: 'LeeGumayusi',
                invocador: 'Lee Gumayusi',
                rota: 'Atirador',
                codigo: 603,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon709.png',
                isAdmin: false,
                team: 'Equipe 7 Gaming',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'E7Jorgerous',
                email: 'E7Jorgerous@gmail.com',
                senha: 'E7Jorgerous',
                invocador: 'E7 Jorgerous',
                rota: 'Suporte',
                codigo: 604,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4860.png',
                isAdmin: false,
                team: 'Equipe 7 Gaming',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: 
        [
            {
                username: 'come to 1v1',
                email: 'cometo1v1@gmail.com',
                senha: 'cometo1v1',
                invocador: 'come to 1v1',
                rota: 'Indefinido',
                codigo: 510,
                isConnected: false,
                icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4552.png',
                isAdmin: false,
                team: 'KINGSMAN EsportS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '15/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    for(let i = 0; i < teams.length;i++){
        if(teams[i].nomeDaOrg == time0.nomeDaOrg){
            teams.splice(i, 1, time0)
        }else if(teams[i].nomeDaOrg == time1.nomeDaOrg){
            teams.splice(i, 1, time1)
        }
    }

    localStorage.setItem('teams', JSON.stringify(teams))
}

setInterval(function () {
    $('.container-myteam').css('opacity', '100%')
    $('::-webkit-scrollbar').css('opacity', `100%`)
    $('.loading').hide()
}, 2000)
