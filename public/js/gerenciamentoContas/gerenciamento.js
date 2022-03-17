$('.divAlterarEmail, .divAlterarSenha, .divVincularInvocador, .divNoAccount, .adminOnly').hide()

let contaUsuário
let allAccounts

try{
$('.actualEmail').val(JSON.parse(localStorage.getItem('ContaConectada')).email)
$('.actualPassword').val(JSON.parse(localStorage.getItem('ContaConectada')).senha)
$('.actualSummoner').val(JSON.parse(localStorage.getItem('ContaConectada')).invocador)
  contaUsuário = JSON.parse(localStorage.getItem('ContaConectada'))
}catch{
  $('.containerGerenciamentoDeContas-User').hide()
  $('.divNoAccount').show()
}

if(JSON.parse(localStorage.getItem('ContaConectada')).isAdmin == true){
  $('.adminOnly').show()
  allAccounts = JSON.parse(localStorage.getItem('admin'))
}else{
  allAccounts = JSON.parse(localStorage.getItem('contas'))
  console.log('kk')
}
  
$('.receiveEmailGaiaCup').on('click', function(){

})


$('.alterarEmail').on('click', function(){
  $('.divAlterarEmail').show()
  $('.divAlterarSenha').hide()
  $('.divVincularInvocador').hide()
})

$('.alterarSenha').on('click', function(){
  $('.divAlterarSenha').show()
  $('.divAlterarEmail').hide()
  $('.divVincularInvocador').hide()
})

$('.vincularInvocador').on('click', function(){
  $('.divVincularInvocador').show()
  $('.divAlterarSenha').hide()
  $('.divAlterarEmail').hide()
})

$('.changeEmail').on('click', function(){
  // actualEmail
  // newEmail

  if($('.newEmail').val() == $('.actualEmail').val()){
    Swal.fire({
      icon: 'error',
      title: 'Você já está usando esse E-mail!',
    })
    return
  }
  Swal.fire({
    title: 'Confirmar mudanças?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Mudar',
    denyButtonText: `Não mudar`,
  }).then((result) => {
    if (result.isConfirmed) {
      if($('.newEmail').val().includes('@', 3)){
        if($('.newEmail').val().indexOf('.') > ($('.newEmail').val().indexOf('@') + 1) && $('.newEmail').val().includes('.', 5)){
          for(let i = 0; i < allAccounts.length;i++){
            console.log(i)
            if(allAccounts[i].email == contaUsuário.email){
              contaUsuário.email = $('.newEmail').val()
              localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
              allAccounts.splice(i, 1, contaUsuário)
              localStorage.setItem('contas',JSON.stringify(allAccounts))
              location.reload(true);
            }
          }
        }else{
          Swal.fire('E-mail inválido!', '', 'error')
        }
      }else{
        Swal.fire('E-mail inválido!', '', 'error')   
      }
    } else if (result.isDenied) {

    }
  })
})

let isChecked = false
$('.seePasswordCheckbox').on('click', function(){
  if(isChecked == false){
    isChecked = true
    $('.actualPassword, .newPassword, .confirmNewPassword').attr('type', 'text')
  }else{
    isChecked = false
    $('.actualPassword, .newPassword, .confirmNewPassword').attr('type', 'password')
  }
})

$('.changePassword').on('click', function(){
  // actualEmail
  // newEmail

  if($('.newEmail').val() == $('.actualEmail').val()){
    Swal.fire({
      icon: 'error',
      title: 'Você já está usando esse E-mail!',
    })
    return
  }
  Swal.fire({
    title: 'Confirmar mudanças?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Mudar',
    denyButtonText: `Não mudar`,
  }).then((result) => {
    if (result.isConfirmed) {
      if($('.newPassword').val().length > 5){
        if($('.newPassword').val() == $('.confirmNewPassword').val()){
          for(let i = 0; i < allAccounts.length;i++){
            console.log(i)
            if(allAccounts[i].username == contaUsuário.username){
              contaUsuário.senha = $('.newPassword').val()
              localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
              allAccounts.splice(i, 1, contaUsuário)
              localStorage.setItem('contas',JSON.stringify(allAccounts))
              location.reload(true);
            }
          }
        }else{
          Swal.fire('As senhas não batem!', '', 'error')
        }
      }else{
        Swal.fire('Senha muito pequena!', '', 'error')   
      }
    } else if (result.isDenied) {

    }
  })
})

$('.changeSummoner').on('click', function(){
  // actualEmail
  // newEmail

  if($('.newEmail').val() == $('.actualEmail').val()){
    Swal.fire({
      icon: 'error',
      title: 'Você já está usando esse E-mail!',
    })
    return
  }
  Swal.fire({
    title: 'Confirmar mudanças?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Mudar',
    denyButtonText: `Não mudar`,
  }).then((result) => {
    if (result.isConfirmed) {
      if($('.actualSummoner').val() != $('.newSummoner').val()){
        for(let i = 0; i < allAccounts.length;i++){
          console.log(i)
          if(allAccounts[i].username == contaUsuário.username){
            contaUsuário.invocador = $('.newSummoner').val()
            localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
            allAccounts.splice(i, 1, contaUsuário)
            localStorage.setItem('contas',JSON.stringify(allAccounts))
            location.reload(true);
          }
        }
      }else{
        Swal.fire('Esse invocador já está vinculado!  ', '', 'error')   
      }
    } else if (result.isDenied) {

    }
  })
})