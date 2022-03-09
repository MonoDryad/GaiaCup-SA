$('.creatorConnected, .divTeam, .divCreatingTeam').hide()

$('.btnCreateTeam').on('click', function(){
    $('.divNoTeam').hide()
    $('.divCreatingTeam').show()
})

$('.goBack').on('click', function(){
    $('.divNoTeam').show()
    $('.divCreatingTeam').hide()
})

// $('.lblCreateTeam').hide()

$('input').focusin(function(){
    if($(this).hasClass('inpCreateTeamName')){
        $(this).attr('placeholder', '')
        $('.createTeamName').addClass('input-goup-login')
        $('.createTeamName').show()
    }else if($(this).hasClass('inpCreateTeamTag')){
        $(this).attr('placeholder', '')
        $('.pTextPassword').addClass('input-goup-login')
        $('.pTextPassword').show()
    }
})