// Validação Mestra
let validacaoUsuario, validacaoSenha, validacaoConfirSenha

// Validação
let validationName = document.querySelector("#nameRegister")
let validationNameLabel = document.querySelector("#labelName")

let validationEmail = document.querySelector("#emailRegister")
let validationEmailLabel = document.querySelector("#labelEmail")

let validationPassword = document.querySelector("#password")
let validationPasswordLabel = document.querySelector("#labelPassword")

let validationConfirmPassword = document.querySelector("#confirmPassword")
let validationConfirmPasswordLabel = document.querySelector("#labelConfirmPassword")

validationName.addEventListener('keyup', () => {
  if (validationName.value.length <= 2) {
    validationNameLabel.setAttribute('style', 'color: red')
    validationName.setAttribute('style', 'border-color: red')
    validationNameLabel.innerHTML = 'Usuário *insira no mínimo 3 caracteres'
    validacaoUsuario = false
    return(ativarButton())
  } else {
    validationNameLabel.setAttribute('style', 'color: black')
    validationName.setAttribute('style', 'border-color: rgb(100, 24, 100)')
    validationNameLabel.innerHTML = 'Usuário'
    validacaoUsuario = true
    return(ativarButton())
  }
})

validationPassword.addEventListener('keyup', () => {
  if (validationPassword.value.length <= 4) {
    validationPasswordLabel.setAttribute('style', 'color: red')
    validationPassword.setAttribute('style', 'border-color: red')
    validationPasswordLabel.innerHTML = 'Senha *insira no mínimo 5 caracteres'
    validacaoSenha = false
    return(ativarButton())
  } else if (validationPassword.value != validationConfirmPassword.value) {
    validationPasswordLabel.setAttribute('style', 'color: red')
    validationPassword.setAttribute('style', 'border-color: red')
    validationPasswordLabel.innerHTML = 'Confirme sua senha *As senhas não são iguais'
    validacaoConfirSenha = false
    return(ativarButton())
  } else {
    validationPasswordLabel.setAttribute('style', 'color: black')
    validationPassword.setAttribute('style', 'border-color: rgb(100, 24, 100)')
    validationPasswordLabel.innerHTML = 'Senha'
    validacaoSenha = true

    validationConfirmPasswordLabel.setAttribute('style', 'color: black')
    validationConfirmPassword.setAttribute('style', 'border-color: rgb(100, 24, 100)')
    validationConfirmPasswordLabel.innerHTML = 'Confirme sua senha'
    validacaoConfirSenha = true
    return(ativarButton())
  }
})

validationConfirmPassword.addEventListener('keyup', () => {
  if (validationConfirmPassword.value != validationPassword.value) {
    validationConfirmPasswordLabel.setAttribute('style', 'color: red')
    validationConfirmPassword.setAttribute('style', 'border-color: red')
    validationConfirmPasswordLabel.innerHTML = 'Confirme sua senha *Senha incorreta'
    validacaoConfirSenha = false

    validationPasswordLabel.setAttribute('style', 'color: red')
    validationPassword.setAttribute('style', 'border-color: red')
    validationPasswordLabel.innerHTML = 'Confirme sua senha *As senhas não são iguais'
    validacaoConfirSenha = false
    return(ativarButton())
  } else {
    validationConfirmPasswordLabel.setAttribute('style', 'color: black')
    validationConfirmPassword.setAttribute('style', 'border-color: rgb(100, 24, 100)')
    validationConfirmPasswordLabel.innerHTML = 'Confirme sua senha'
    validacaoConfirSenha = true

    validationPasswordLabel.setAttribute('style', 'color: black')
    validationPassword.setAttribute('style', 'border-color: rgb(100, 24, 100)')
    validationPasswordLabel.innerHTML = 'Senha'
    validacaoSenha = true
    return(ativarButton())
  }
})