// * // * // * SCRIPT * \\ * \\ * \\
$('.creatorConnected, .divTeam, .divCreatingTeam, .btnRemoverJogador, .creatorConnected-Remove, .divNoTeam').hide()

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

    if(JSON.parse(localStorage.getItem('ContaConectada')).isConnected == true){
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
        $('.divNoAccount').show()
    }
})

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

// * // * // * PAGE FUNCTIONALITY * \\ * \\ * \\

$('.btnCreateTeam').on('click', function(){
    $('.divNoTeam').hide()
    $('.divCreatingTeam').show()
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