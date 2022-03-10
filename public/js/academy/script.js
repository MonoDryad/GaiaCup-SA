// $('.hidding, .adminNewVideo').hide()

if(JSON.parse(localStorage.getItem('ContaConectada')).isAdmin == true){
    $('.adminNewVideo').show()
}