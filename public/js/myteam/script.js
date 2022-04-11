// * // * // * SCRIPT * \\ * \\ * \\
$('.customBackground').hide()
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

$('.resetTeams').on('click', function(){
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    teams = []
    localStorage.setItem('teams',JSON.stringify(teams))
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
        <div class="letItBeResponsive" style="width: 20%; margin-bottom: 2%;">
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
    $('.customBackground').show()

    for(let i = 0; i < teams.length;i++){
        if($(`.seeTeam-${teamFinded}`).parent().hasClass(`${teams[i].nomeDaOrg.replaceAll(' ','')}`)){
            console.log('d')
            if($(`.removeIt`).hasClass(`trigger-${i}`) ){
                $(`.trigger-${i}`).trigger('click')
                $('.customBackground').hide()
                console.log('v')
                return
            }
        }
    }
    for(let i = 0; i < teams.length;i++){
        if($(`.seeTeam-${teamFinded}`).parent().hasClass(`${teams[i].nomeDaOrg.replaceAll(' ','')}`)){
            console.log($(`.removeIt`).hasClass(`trigger-${i}`))
            $('.customCanvasGoHere').append(`
            <button class="trigger-${i} removeIt " type="button" data-bs-toggle="offcanvas" data-bs-target="#${teams[i].nomeDaOrg.replaceAll(' ','')}" aria-controls="offcanvasBottom"></button>

            <div class="offcanvas offcanvas-bottom bg-dark" tabindex="-1" id="${teams[i].nomeDaOrg.replaceAll(' ','')}" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header SeeTeamHeader">
                    <img class='imgTeamFind-offcanvas' src='${teams[i].logoDaOrg}'>
                    <label class="offcanvas-title bigText-TeamName" id="offcanvasBottomLabel">${teams[i].nomeDaOrg} <label class="smallText-TagTeam"> ${teams[i].tagDaOrg}</label></label>

                    <button type="button" class="btn-close  btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <label style="text-align: center;">Criado por: ${teams[i].criadoPor} ${teams[i].userBadge} - ${teams[i].dataCriacao} - Pontuação: ${calculateAllPoints(teams[i].jogadores[0].elo) + calculateAllPoints(teams[i].jogadores[1].elo) + calculateAllPoints(teams[i].jogadores[2].elo) + calculateAllPoints(teams[i].jogadores[3].elo) + calculateAllPoints(teams[i].jogadores[4].elo)}</label>
                <div class="RemoveThisAlready">
                    ${callAdminFunction(i)}
                </div>
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
            if($(`.removeIt`).hasClass(`trigger-${i}`) ){
                $(`.trigger-${i}`).trigger('click')
                $('.customBackground').hide()
                console.log('v')
                return
            }
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
        whatWillGoToAppend += `<label class="playerInvocadorSee player-${i}-invocador">${teams[teamPosition].jogadores[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${teams[teamPosition].jogadores[i].invocador}">League of Graphs</a> - ${teams[teamPosition].jogadores[i].elo}</label> \n`
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
        whatWillGoToAppend += `<label class="playerInvocadorSee reserva-${i}-invocador">${teams[teamPosition].reservas[i].invocador} - <a href="https://www.leagueofgraphs.com/summoner/br/${teams[teamPosition].reservas[i].invocador}">League of Graphs</a> - ${teams[teamPosition].reservas[i].elo}</label> \n`
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
    $('body, hmtl').toggleClass("noScroll")
    return whatWillGoToAppend
}

function callAdminFunction(teamPosition){
    let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))
    if(contaConectada == null){
        contaConectada = {isAdmin: false}
    }
    if(contaConectada.isAdmin == true){
        console.log('Entrou!')
        return `<p class="deleteTeam deleteTeam${teamPosition} btn btn-danger" onclick="removeTeam(${teamPosition})">Remover Time</p>`
    }else{
        return ``
    }
}
function removeTeam(time){
    let teams = JSON.parse(localStorage.getItem('teams')) || []

    teams.splice(time, 1)
    localStorage.setItem('teams', JSON.stringify(teams))
    location.reload(true)
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
    $('body').css('background', 'none')
    $('body').css('background-image', 'linear-gradient(45deg, #000000 50%, #090909 50%)')
    $('body').css('background-size', '4px 4px')
    let teams = JSON.parse(localStorage.getItem('teams'))
    if(teams == null || teams == [] || teams.length == 0){
        pushTeams()
        findTeam()
        return
    }

    findTeam()
})

$('.goBack').on('click', function(){
    $('.divNoTeam').show()
    $('.divCreatingTeam').hide()
})

$('.goSeeTeamBack').on('click', function(){
    location.reload(true)
    // $('.divNoTeam').show()
    // $('.divFindTeam').hide()
    // $('.MyTeam-Title').show()
    // $('.container-myteam').show()
    // $('body').css('background-image', 'none')
    // $('body').css('background', `url('../../images/background-shadow_isles.jpg') no-repeat center center fixed`)
    // $('body').css('background-size', 'cover')
    // $('.teamsGoHere').children().remove()
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


function pushTeams(){
    let teams = JSON.parse(localStorage.getItem('teams'))
    let time1 = {
        nomeDaOrg: 'Eight Divine Ways',
        tagDaOrg: 'EDW',
        logoDaOrg: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
        staff: [
            {
                username: 'Matheus UE#9601',
                email: 'MATHEUS UE@gmail.com',
                senha: 'MATHEUS UE',
                invocador: 'MATHEUS UE',
                rota: 'Dono',
                codigo: 300,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        jogadores: 
        [
            {
                username: 'EDW Duck',
                email: 'EDWDuck@gmail.com',
                senha: 'EDW Duck',
                invocador: 'EDW Duck',
                rota: 'Topo',
                codigo: 400,
                elo: detectPointsPerElo('Diamante 3'),
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'EDW Sena',
                email: 'EDWSena@gmail.com',
                senha: 'EDW Sena',
                invocador: 'EDW Sena',
                rota: 'Selva',
                codigo: 401,
                elo: detectPointsPerElo('Platina 2'),
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'EDW Nallu',
                email: 'EDWNallu@gmail.com',
                senha: 'EDW Nallu',
                invocador: 'EDW Nallu',
                rota: 'Meio',
                codigo: 402,
                elo: detectPointsPerElo('Platina 4'),
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'EDW Ikaika',
                email: 'EDWIkaika@gmail.com',
                senha: 'EDW Ikaika',
                invocador: 'EDW Ikaika',
                rota: 'Atirador',
                codigo: 403,
                isConnected: false,
                elo: detectPointsPerElo('Ouro 3'),
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'EDW Ylang',
                email: 'EDWYlang@gmail.com',
                senha: 'EDW Ylang',
                invocador: 'EDW Ylang',
                rota: 'Atirador',
                codigo: 404,
                isConnected: false,
                elo: detectPointsPerElo('Ouro 1'),
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: 
        [
            {
                username: 'Zuif',
                email: 'Zuif@gmail.com',
                senha: 'Zuif',
                invocador: 'Zuif',
                rota: 'Smurf - EDW Ylang',
                codigo: 404,
                isConnected: false,
                elo: detectPointsPerElo('Ouro 4'),
                icon: 'https://d33wubrfki0l68.cloudfront.net/4d128470-0269-4e59-8422-1974dca68351/EDW.jpg',
                isAdmin: false,
                team: 'Eight Divine Ways',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '14/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    let time2 = {
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

    let time3 = {
        nomeDaOrg: 'NAOKI WHITE',
        tagDaOrg: 'NKIW - <label><a href="https://twitter.com/NAOKIESPORT">Twitter</a> | <a href="https://discord.gg/GcEa9fqy">Discord</a> | <a href="https://www.twitch.tv/bruuxao19">Twitch</a></label>',
        logoDaOrg: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
        staff: [
            {
                username: 'NKI Bruxão#0197',
                email: 'NKIBruxão@gmail.com',
                senha: 'NKIBruxão',
                invocador: 'NKI Bruxão',
                rota: 'Dono',
                codigo: 700,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        jogadores: 
        [
            {
                username: 'Dkjr#8810',
                email: 'Dkjr@gmail.com',
                senha: 'Dkjr',
                invocador: 'I DKjr I',
                elo: detectPointsPerElo('Platina 3'),
                rota: 'Topo',
                codigo: 700,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: '! Lucas#8631',
                email: 'Lucas@gmail.com',
                senha: 'Lucas',
                invocador: 'nki baiano',
                elo: detectPointsPerElo('Ouro 2'),
                rota: 'Selva',
                codigo: 701,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Tikinho#1835',
                email: 'Tikinho@gmail.com',
                senha: 'Tikinho',
                invocador: 'Tiikas',
                elo: detectPointsPerElo('Ouro 4'),
                rota: 'Meio',
                codigo: 702,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Gabriel W M Oliveira#7151',
                email: 'Gabriel@gmail.com',
                senha: 'Gabriel',
                invocador: 'akiii',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Atirador',
                codigo: 703,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'NKI Dark Fairy#8807',
                email: 'Dark@gmail.com',
                senha: 'Dark',
                invocador: 'NKI Dark Fairy',
                elo: detectPointsPerElo('Ouro 1'),
                rota: 'Suporte',
                codigo: 704,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: 
        [            
            {
                username: 'Silas#1487',
                email: 'Efort@gmail.com',
                senha: 'Efort',
                invocador: 'Efort',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Atirador',
                codigo: 711,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/95729c27-a47d-4bb8-9a2c-39ac1dd201a4/NKI%20(8).png',
                isAdmin: false,
                team: 'NAOKI WHITE',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '28/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    let time4 = {
        nomeDaOrg: 'NAOKI E-SPORTS',
        tagDaOrg: 'NKI - <label><a href="https://twitter.com/NAOKIESPORT">Twitter</a> | <a href="https://discord.gg/GcEa9fqy">Discord</a> | <a href="https://www.twitch.tv/bruuxao19">Twitch</a></label>',
        logoDaOrg: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
        staff: [
            {
                username: 'NKI Bruxão#0197',
                email: 'NKIBruxão@gmail.com',
                senha: 'NKIBruxão',
                invocador: 'NKI Bruxão',
                rota: 'Dono',
                codigo: 800,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        jogadores: 
        [
            {
                username: 'Feijas Soca Fofo#8731',
                email: 'Feijas@gmail.com',
                senha: 'Feijas',
                invocador: 'É o Feijas',
                elo: detectPointsPerElo('Diamante 4'),
                rota: 'Topo',
                codigo: 801,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Whitelopes#7900',
                email: 'Whitelopes@gmail.com',
                senha: 'Whitelopes',
                invocador: 'El Blanco Lopes',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Selva',
                codigo: 802,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'ggelos#2910#0197',
                email: 'ggelos@gmail.com',
                senha: 'ggelos',
                invocador: 'HuskyPocket',
                elo: detectPointsPerElo('Ouro 1'),
                rota: 'Meio',
                codigo: 803,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'NKI Bruxão#0197',
                email: 'NKIBruxão@gmail.com',
                senha: 'NKIBruxão',
                invocador: 'NKI Bruxão',
                elo: detectPointsPerElo('Ouro 4'),
                rota: 'Atirador',
                codigo: 804,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Lemonz#7518',
                email: 'Lemonz@gmail.com',
                senha: 'Lemonz',
                invocador: 'Lemonzord',
                elo: detectPointsPerElo('Diamante 3'),
                rota: 'Suporte',
                codigo: 805,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: [
            {
                username: 'QuirinoLL#9624',
                email: 'QuirinoLL@gmail.com',
                senha: 'QuirinoLL',
                invocador: 'chivador',
                elo: detectPointsPerElo('Ouro 4'),
                rota: 'Não registrado',
                codigo: 811,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/ade37233-0887-4424-8326-d76feb3a95ff/NKI%20(16).png',
                isAdmin: false,
                team: 'NAOKI E-SPORTS',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '28/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    let time5 = {
        nomeDaOrg: 'Tnoway verde',
        tagDaOrg: 'TNV - <label><a href="https://discord.gg/vquHQKeH">Discord</a></label>',
        logoDaOrg: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
        staff: [
            {
                username: 'CandyS2#0917',
                email: 'CandyS2@gmail.com',
                senha: 'CandyS2',
                invocador: 'CandyS2',
                rota: 'Dono',
                codigo: 900,
                isConnected: false,
                icon: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
                isAdmin: false,
                team: 'Tnoway verde',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        jogadores: 
        [
            {
                username: 'Scorpion#6455',
                email: 'Scorpion@gmail.com',
                senha: 'Scorpion',
                invocador: 'TNW Pimpeu',
                elo: detectPointsPerElo('Ouro 3'),
                rota: 'Topo',
                codigo: 901,
                isConnected: false,
                icon: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
                isAdmin: false,
                team: 'Tnoway verde',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Splinter#8636',
                email: 'MTSplinter42@gmail.com',
                senha: 'MTSplinter42',
                invocador: 'MTSplinter42',
                elo: detectPointsPerElo('Prata'),
                rota: 'Selva',
                codigo: 902,
                isConnected: false,
                icon: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
                isAdmin: false,
                team: 'Tnoway verde',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'QUIETIN#6711',
                email: 'QUIETIN@gmail.com',
                senha: 'QUIETIN',
                invocador: 'TNW Quietin',
                elo: detectPointsPerElo('Prata'),
                rota: 'Meio',
                codigo: 903,
                isConnected: false,
                icon: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
                isAdmin: false,
                team: 'Tnoway verde',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Sïnistro#9009',
                email: 'Sïnistro@gmail.com',
                senha: 'Sïnistro',
                invocador: 'TNW Sinistro',
                elo: detectPointsPerElo('Ouro 3'),
                rota: 'Atirador',
                codigo: 904,
                isConnected: false,
                icon: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
                isAdmin: false,
                team: 'Tnoway verde',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'l0rdkillerPB#1980',
                email: 'l0rdkillerPB@gmail.com',
                senha: 'l0rdkillerPB',
                invocador: 'l0rdkillerPB',
                elo: detectPointsPerElo('Ouro 4'),
                rota: 'Suporte',
                codigo: 905,
                isConnected: false,
                icon: 'https://cdn.discordapp.com/attachments/935531218978615347/962063243042488360/a18a15bf7ae6495c89478ef2447dbcd1_3.png',
                isAdmin: false,
                team: 'Tnoway verde',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: [],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '28/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    let time6 = {
        nomeDaOrg: 'Orange Kingdom',
        tagDaOrg: 'OK - <label><a href="https://twitter.com/OrangeKingdomBR">Twitter</a> | <a href="https://discord.gg/6xnnHDnG6A">Discord</a></label>',
        logoDaOrg: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
        staff: [
            {
                username: 'Alybaff#9168',
                email: 'Alybaff@gmail.com',
                senha: 'Alybaff',
                invocador: 'Alybaff',
                rota: 'Dono',
                codigo: 1000,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Ensabuado',
                email: 'Ensabuado@gmail.com',
                senha: 'Ensabuado',
                invocador: 'Ensabuado',
                rota: 'Coach¹',
                codigo: 1000,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Padrasto',
                email: 'Padrasto@gmail.com',
                senha: 'Padrasto',
                invocador: 'Padrasto',
                rota: 'Coach²',
                codigo: 1000,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        jogadores: 
        [
            {
                username: 'fernandesz#5829',
                email: 'fernandesz@gmail.com',
                senha: 'fernandesz',
                invocador: 'fernandesz c10',
                elo: detectPointsPerElo('Ouro 1'),
                rota: 'Topo',
                codigo: 1001,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Morfpheu#0233',
                email: 'Morfpheu@gmail.com',
                senha: 'Morfpheu',
                invocador: 'Morfpheu',
                elo: detectPointsPerElo('Platina 3'),
                rota: 'Selva',
                codigo: 1002,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Mago#6647',
                email: 'Mago@gmail.com',
                senha: 'Mago',
                invocador: 'Magodastrevas42',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Meio',
                codigo: 1003,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'luk#1654',
                email: 'luk@gmail.com',
                senha: 'luk',
                invocador: 'Redeath',
                elo: detectPointsPerElo('Platina 1'),
                rota: 'Atirador',
                codigo: 1004,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Shiro#5885',
                email: 'Shiro@gmail.com',
                senha: 'Shiro',
                invocador: 'Bar do Shiro',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Suporte',
                codigo: 1005,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: [
            {
                username: 'Rock tt#7998',
                email: 'Rock@gmail.com',
                senha: 'Rock',
                invocador: 'Craque Rick',
                elo: detectPointsPerElo('Platina 3'),
                rota: 'Não registrado',
                codigo: 1006,
                isConnected: false,
                icon: 'https://d33wubrfki0l68.cloudfront.net/415c04dc-83c8-4057-a27f-0177e929db3f/okempo.png',
                isAdmin: false,
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '28/03/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    let time7 = {
        nomeDaOrg: 'NEO Akihabara',
        tagDaOrg: 'AKH - <label><a href="https://twitter.com/theneoteam">Twitter</a> | <a href="https://discord.gg/PNph25qtya">Discord</a></label>',
        logoDaOrg: '../images/png-akiha.png',
        staff: [
            {
                username: 'Soviético#3929',
                email: 'Soviético@gmail.com',
                senha: 'Soviético',
                invocador: 'Soviético',
                rota: 'Dono',
                codigo: 1100,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Deretch',
                email: 'Deretch@gmail.com',
                senha: 'Deretch',
                invocador: 'Deretch',
                rota: 'Coach¹',
                codigo: 1101,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Lorita',
                email: 'Lorita@gmail.com',
                senha: 'Lorita',
                invocador: 'Lorita',
                rota: 'Coach²',
                codigo: 1101,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                team: 'Orange Kingdom',
                badge: `<span class="badge bg-info text-dark">User</span>`
            }
        ],
        jogadores: 
        [
            {
                username: 'Dragooni#2500',
                email: 'Dragooni@gmail.com',
                senha: 'Dragooni',
                invocador: 'Dragooni',
                elo: detectPointsPerElo('Ouro 3'),
                rota: 'Topo',
                codigo: 1110,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Gusta#2078',
                email: 'Gusta@gmail.com',
                senha: 'Gusta',
                invocador: 'Banguêla',
                elo: detectPointsPerElo('Diamante 2'),
                rota: 'Selva',
                codigo: 1111,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Yami#4182',
                email: 'Yami@gmail.com',
                senha: 'Yami',
                invocador: 'Ashes of Hell',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Meio',
                codigo: 1112,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Fafa#3340',
                email: 'Fafa@gmail.com',
                senha: 'Fafa',
                invocador: 'KYT Gumayusi',
                elo: detectPointsPerElo('Platina 3'),
                rota: 'Atirador',
                codigo: 1112,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'zebailin#4784',
                email: 'zebailin@gmail.com',
                senha: 'zebailin',
                invocador: 'zebailin',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Suporte',
                codigo: 1113,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        reservas: [
            {
                username: 'Baliana#5898',
                email: 'Baliana@gmail.com',
                senha: 'Baliana',
                invocador: 'Bali Boreas',
                elo: detectPointsPerElo('Platina 4'),
                rota: 'Suporte',
                codigo: 1120,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Nicola Grudinsky#4830',
                email: 'NicolaGrudinsky@gmail.com',
                senha: 'NicolaGrudinsky',
                invocador: 'Bis Limão',
                elo: detectPointsPerElo('Ouro 3'),
                rota: 'Suporte',
                codigo: 1121,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'Th#8979',
                email: 'Th@gmail.com',
                senha: 'Th',
                invocador: 'OLY Baki',
                elo: detectPointsPerElo('Prata'),
                rota: 'Suporte',
                codigo: 1122,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
            {
                username: 'DragananK#7193',
                email: 'DragananK@gmail.com',
                senha: 'DragananK',
                invocador: 'DragananK',
                elo: detectPointsPerElo('Diamante 3'),
                rota: 'Suporte',
                codigo: 1123,
                isConnected: false,
                icon: '../images/png-akiha.png',
                isAdmin: false,
                team: 'NEO Akihabara',
                badge: `<span class="badge bg-info text-dark">User</span>`
            },
        ],
        criadoPor: 'Mono Dryad',
        userIcon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5081.png',
        dataCriacao: '09/04/2022',
        userBadge: '<span class="badge bg-danger text-dark">System</span>',
    }

    teams.push(time1)
    teams.push(time2)
    teams.push(time3)
    teams.push(time4)
    teams.push(time5)
    teams.push(time6)
    teams.push(time7)

    localStorage.setItem('teams', JSON.stringify(teams))
}

setInterval(function () {
    $('.container-myteam').css('opacity', '100%')
    $('::-webkit-scrollbar').css('opacity', `100%`)
    $('.loading').hide()
}, 2000)
