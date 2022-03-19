$('.divAlterarEmail, .divAlterarSenha, .divVincularInvocador, .divNoAccount, .adminOnly, .divUsers').hide()

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

$('.alterarEmail').on('click', function(){
  $('.divAlterarEmail').show()
  $('.divAlterarSenha').hide()
  $('.divVincularInvocador').hide()
  $('.divUsers').hide()
})

$('.alterarSenha').on('click', function(){
  $('.divAlterarSenha').show()
  $('.divAlterarEmail').hide()
  $('.divVincularInvocador').hide()
  $('.divUsers').hide()
})

$('.vincularInvocador').on('click', function(){
  $('.divVincularInvocador').show()
  $('.divAlterarSenha').hide()
  $('.divAlterarEmail').hide()
  $('.divUsers').hide()
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
              if(contaUsuário.isAdmin == true){
                contaUsuário.email = $('.newEmail').val()
                localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
                allAccounts.splice(i, 1, contaUsuário)
                localStorage.setItem('admin',JSON.stringify(allAccounts))
                location.reload(true);
              }else{
                contaUsuário.email = $('.newEmail').val()
                localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
                allAccounts.splice(i, 1, contaUsuário)
                localStorage.setItem('contas',JSON.stringify(allAccounts))
                location.reload(true);
              }
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
              if(contaUsuário.isAdmin == true){
                contaUsuário.senha = $('.newPassword').val()
                localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
                allAccounts.splice(i, 1, contaUsuário)
                localStorage.setItem('admin',JSON.stringify(allAccounts))
                location.reload(true);
              }else{
                contaUsuário.senha = $('.newPassword').val()
                localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
                allAccounts.splice(i, 1, contaUsuário)
                localStorage.setItem('contas',JSON.stringify(allAccounts))
                location.reload(true);
              }
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
            if(contaUsuário.isAdmin == true){
              contaUsuário.invocador = $('.newSummoner').val()
              localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
              allAccounts.splice(i, 1, contaUsuário)
              localStorage.setItem('admin',JSON.stringify(allAccounts))
              location.reload(true);
            }else{
              contaUsuário.invocador = $('.newSummoner').val()
              localStorage.setItem('ContaConectada', JSON.stringify(contaUsuário))
              allAccounts.splice(i, 1, contaUsuário)
              localStorage.setItem('contas',JSON.stringify(allAccounts))
              location.reload(true);
            }
          }
        }
      }else{
        Swal.fire('Esse invocador já está vinculado!  ', '', 'error')   
      }
    } else if (result.isDenied) {

    }
  })
})

$('.findUsers').one('click', function(){
  $('.divVincularInvocador').hide()
  $('.divAlterarSenha').hide()
  $('.divAlterarEmail').hide()
  $('.divUsers').show()

  let contas = JSON.parse(localStorage.getItem('contas')) || []

  for(let i = 0; i < contas.length;i++){
    let accountsToFind = i
    $('.usersGoHere').append(`
    <div class="letItBeResponsive" style="width: 23%; margin-bottom: 2%;">
        <div class="${contas[i].username.replaceAll(' ','')}" style="text-align: center">
            <img class='imgUserFind iconUser-${i}' src='${contas[i].icon}' >
            <h5>${contas[i].username}</h5>
            <p class="tagFindUser">${contas[i].invocador}</p>
            <button onclick='seeUser(${accountsToFind})' class="btn btn-dark seeUser-${i}">Usuário</button>
        </div>
    </div>`)
    if(contas[i].icon == null){
      callAccountError(i)
    }
  }
})

$('.findUsers').on('click', function(){
  $('.divVincularInvocador').hide()
  $('.divAlterarSenha').hide()
  $('.divAlterarEmail').hide()
  $('.divUsers').show()
})

function seeUser(contaEncontrada){
  let contas = JSON.parse(localStorage.getItem('contas')) || []

  for(let i = 0; i < contas.length;i++){
      if($(`.seeUser-${contaEncontrada}`).parent().hasClass(`${contas[i].username.replaceAll(' ','')}`)){
          console.log('d')
          if($(`.removeIt`).hasClass(`trigger-${i}`) ){
            $(`.botao-${i}`).trigger('click')
              console.log('v')
              return
          }
      }
  }
  for(let i = 0; i < contas.length;i++){
    if($(`.seeUser-${contaEncontrada}`).parent().hasClass(`${contas[i].username.replaceAll(' ','')}`)){
      console.log($(`.removeIt`).hasClass(`botao-${i}`))
      console.log(i)
      $('.customModalGoHere').append(`
      <button type="button" class="botao-${i} removeIt" data-bs-toggle="modal" data-bs-target="#user-${i}"></button>
  
      <div class="modal fade" id="user-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modificar usuário:  <img class="imgUserFind iconUser${i}" src="${contas[i].icon}"> ${contas[i].username}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="user-${i}" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="${contas[i].username}-name divShowUser">
                <label>Nome do Usuário</label>
                <input class="${contas[i].username}-inpName inputModifyUsername" value="${contas[i].username}">
              </div>
              <div class="${contas[i].email}-email divShowUser">
                <label>E-mail</label>
                <input class="${contas[i].email}-inpEmail inputModifyEmail" value="${contas[i].email}">
              </div>
              <div class="${contas[i].senha}-senha divShowUser">
              <label>Senha</label>
              <input class="${contas[i].senha}-inpSenha inputModifyPassword" value="${contas[i].senha}">
            </div>
              <div class="${contas[i].invocador}-invocador divShowUser">
                <label>Invocador</label>
                <input class="${contas[i].invocador}-inpInvocador inputModifySummoner" value="${contas[i].invocador}">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" onclick="saveUser(${i})">Salvar Mudanças</button>
              <button type="button" class="btn btn-danger" onclick="deleteUser(${i})" data-bs-dismiss="modal">Remover Usuário</button>
            </div>
          </div>
        </div>
      </div>`)
      if($(`.removeIt`).hasClass(`botao-${i}`) ){
        $(`.botao-${i}`).trigger('click')
        console.log('s')
        return
      }
    }
  }
} 

$('.imgUserFind').on('error', function(){
  let contas = JSON.parse(localStorage.getItem('contas')) || []

  for(let i = 0; i < contas.length;i++){
    if($(this).hasClass(`iconUser-${i}`)){
      contas[i].icon = `https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon${Math.round(Math.random() * 5268)}.png`
      localStorage.setItem('contas', JSON.stringify(contas))
      location.reload(true);
    }
  }
})

function callAccountError(contaErro){
  let contas = JSON.parse(localStorage.getItem('contas')) || []

  for(let i = 0; i < contas.length;i++){
    if(contas[i].username == contas[contaErro].username){
      contas[i].icon = `https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon${Math.round(Math.random() * 5268)}.png`
      localStorage.setItem('contas', JSON.stringify(contas))
      location.reload(true);
    }
  }
}

function saveUser(contaModificada){
  let contas = JSON.parse(localStorage.getItem('contas')) || []
    contas[contaModificada].username = $('.inputModifyUsername').val()
    contas[contaModificada].email = $('.inputModifyEmail').val()
    contas[contaModificada].senha = $('.inputModifyPassword').val()
    contas[contaModificada].invocador = $('.inputModifySummoner').val()

    localStorage.setItem('contas', JSON.stringify(contas))
    location.reload(true)
}

function deleteUser(contaDeletada){
  let contas = JSON.parse(localStorage.getItem('contas')) || []
  Swal.fire({
    title: `Deletar o usuário ${contas[contaDeletada].username}?`,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Deletar',
    denyButtonText: `Não deletar`,
  }).then((result) => {
    if (result.isConfirmed) { 
      contas.splice(contaDeletada, 1)
      localStorage.setItem('contas', JSON.stringify(contas))
      location.reload(true)
    }
  })
}