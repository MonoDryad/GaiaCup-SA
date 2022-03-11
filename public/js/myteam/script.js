// * // * // * SCRIPT * \\ * \\ * \\

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
        dataCriacao: null
    }

    let data = new Date()
    teamObject.dataCriacao = `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`

    teamObject.nomeDaOrg = $('.inpCreateTeamName').val()
    teamObject.tagDaOrg = $('.inpCreateTeamTag').val()
    teamObject.logoDaOrg = $('.inpFileCreateTeamLogo').val()

    teamObject.criadoPor = JSON.parse(localStorage.getItem('ContaConectada')).username
    teamObject.userIcon = JSON.parse(localStorage.getItem('ContaConectada')).icon

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

    if(JSON.parse(localStorage.getItem('ContaConectada')).team != null){
        $('.divTeam').show() 
        $('.divNoTeam').hide()
        myteam()
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
    $('.nameCreatedBy').text(connectedTeam.criadoPor)
    $('.dateCreated').text(connectedTeam.dataCriacao)
    $('.imgCreatedByUser').attr('src', connectedTeam.userIcon)

    if(connectedTeam.criadoPor == JSON.parse(localStorage.getItem('ContaConectada')).username){
        $('.creatorConnected').show()
    }
}

$('.removeTeam').on('click', function(){
    connectedTeam = null
    let teams = JSON.parse(localStorage.getItem('teams')) || []
    let contas = JSON.parse(localStorage.getItem('contas')) || []
    let contaConectada = JSON.parse(localStorage.getItem('ContaConectada'))
    contaConectada.team = null

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == contaConectada.username){
            contas.splice(i, 1, contaConectada)
          localStorage.setItem('contas',JSON.stringify(contas))
          break
        }
      }

    localStorage.setItem('ContaConectada',JSON.stringify(contaConectada))

    for(let i = 0;i < JSON.parse(localStorage.getItem('teams')).length; i++ ){
        if(JSON.parse(localStorage.getItem('ContaConectada')).team == teams.nomeDaOrg){
            teams.splice(i, 1)
            localStorage.setItem('teams',JSON.stringify(teams))
        }
    }
    location.reload(true);
})

// * // * // * PAGE FUNCTIONALITY * \\ * \\ * \\

$('.creatorConnected, .divTeam, .divCreatingTeam').hide()

$('.btnCreateTeam').on('click', function(){
    $('.divNoTeam').hide()
    $('.divCreatingTeam').show()
})

$('.goBack').on('click', function(){
    $('.divNoTeam').show()
    $('.divCreatingTeam').hide()
})

$('.createTeamTag, .createTeamName, .createTeamLogo').hide()

// $('.lblCreateTeam').hide()

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