$('.connected').hide()

callAdmins()

function callAdmins(addAdmins){

  let administradores = [
    {
        username: 'monodryad' ,
        email: 'rair2544@gmail.com',
        senha: 'sudoadmin',
        invocador: 'null',
        codigo: 1,
        isConnected: false,
        icon: null,
        isAdmin: true,
        badge: `<span class="badge bg-danger text-dark">Admin</span>`
    },
    {
      username: 'marcy',
      email: 'marcye@gmail.com',
      senha: 'sudoadmin',
      invocador: null,
      codigo: 2,
      isConnected: false,
      icon: null,
      isAdmin: true,
      badge: `<span class="badge bg-danger text-dark">Admin</span>`
    },
    {
      username: 'milly',
      email: 'millyzi@gmail.com',
      senha: 'sudoadmin',
      invocador: null,
      codigo: 3,
      isConnected: false,
      icon: null,
      isAdmin: true,
      badge: `<span class="badge bg-danger text-dark">Admin</span>`
    }
  ]

  if(addAdmins == 1){
    
  }

  let adminAccounts =  []
  for(let i = 0;i < administradores.length;i++){
    adminAccounts.push(administradores[i])
  }
  localStorage.setItem('admin',JSON.stringify(adminAccounts))
}

$('.iniciarSessao, .cadastrarSe').on('click', function(){
  if($(this).hasClass('iniciarSessao')){
      localStorage.setItem('Cadastro', '1')
  }else{
      localStorage.setItem('Cadastro', '2')
  }
})

const completePerfil = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

let conectada

try{
  conectada = JSON.parse(localStorage.getItem('ContaConectada')) || {}
}catch{
  conectada.invocador = 'null'
  conectada.isConnected = false
}


if(conectada.invocador == 'null'){
  completePerfil.fire({
    icon: 'info',
    title: 'Você ainda não vinculou um invocador à sua conta!'
  })
}

if(conectada.isConnected == true){
  $('.connected').show()
  $('.detectIfIsConnected').hide()
  $('.contaConectada').html(`${JSON.parse(localStorage.getItem('ContaConectada')).username} ${JSON.parse(localStorage.getItem('ContaConectada')).badge}`)
  $('.userImage').attr('src', `${JSON.parse(localStorage.getItem('ContaConectada')).icon}`)
  $(".userImage").on('error', function(){
    let userAccount = JSON.parse(localStorage.getItem('ContaConectada'))
    userAccount.icon = `https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon${Math.round(Math.random() * 5268)}.png`
    localStorage.setItem('ContaConectada',JSON.stringify(userAccount))

    let allAccounts = JSON.parse(localStorage.getItem('contas')) || []

    for(let i = 0; i < allAccounts.length;i++){
      if(allAccounts[i].username == userAccount.username){
        allAccounts.splice(i, 1, userAccount)
        localStorage.setItem('contas',JSON.stringify(allAccounts))
        break
      }
    }
    $('.userImage').attr('src', `${JSON.parse(localStorage.getItem('ContaConectada')).icon}`)
  });
  if(JSON.parse(localStorage.getItem('ContaConectada')).isAdmin == true){
    $('.isAdmin').show()
  }else{
    $('.isAdmin').hide()
  }
}else{
  $('.connected').hide()
}


$('.disconnectFromAccount').on('click', function(){
  let contas = JSON.parse(localStorage.getItem('contas')) || []
  for(let iC;iC < contas.length; iC++){
    if(JSON.parse(localStorage.getItem('ContaConectada')).username == contas[iC].username){
        contas[iC].isConnected = false
        localStorage.setItem('contas',JSON.stringify(contas))
    }
  }
  localStorage.removeItem('ContaConectada')
  location.reload(true);
})

