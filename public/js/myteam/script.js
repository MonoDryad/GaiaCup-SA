$('.creatorConnected, .divTeam, .divCreatingTeam').hide()

$('.btnCreateTeam').on('click', function(){
    $('.divNoTeam').hide()
    $('.divCreatingTeam').show()
})

$('.goBack').on('click', function(){
    $('.divNoTeam').show()
    $('.divCreatingTeam').hide()
})

$('.createTeamTag, .createTeamName').hide()

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
    }
})

$('input').focusout(function(){
    if($(this).hasClass('inpCreateTeamName') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Nome da Organização')
        $('.createTeamName').hide()
    }else if($(this).hasClass('inpCreateTeamTag') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Tag da Organização')
        $('.createTeamTag').hide()
    }
})