$('.connected').hide()

if(JSON.parse(localStorage.getItem('ContaConectada')).isConnected == true){
  $('.connected').show()
  $('.detectIfIsConnected').hide()
  $('.contaConectada').html(JSON.parse(localStorage.getItem('ContaConectada')).username)
  $('.userImage').attr('src', `${JSON.parse(localStorage.getItem('ContaConectada')).icon}`)
  $(".userImage").on('error', function(){
    let userAccount = JSON.parse(localStorage.getItem('ContaConectada'))
    userAccount.icon = `https://raw.communitydragon.org/12.4/game/assets/ux/summonericons/profileicon${Math.round(Math.random() * 5267)}.png`
    localStorage.setItem('ContaConectada',JSON.stringify(userAccount))

    let allAccounts = JSON.parse(localStorage.getItem('contas')) || []

    for(let i = 0; i < allAccounts.length;i++){
      if(allAccounts[i].username == userAccount.username){
        allAccounts.splice(i, 1, userAccount)
        console.log(allAccounts)
        localStorage.setItem('contas',JSON.stringify(allAccounts))
        break
      }
    }

    console.log(allAccounts.indexOf(userAccount.username))
    $('.userImage').attr('src', `${JSON.parse(localStorage.getItem('ContaConectada')).icon}`)
  });
}else{
  $('.connected').hide()
}

$('.disconnectFromAccount').on('click', function(){
  localStorage.removeItem('ContaConectada')
  location.reload(true);
})

