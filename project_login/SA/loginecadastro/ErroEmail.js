  let validationName = document.querySelector("#nameRegister")
  let validationNameLabel = document.querySelector("#labelName")

  let validationLastName = document.querySelector("#lastName")
  let validationLastNameLabel = document.querySelector("#labelLastName")

  let validationEmail = document.querySelector("#emailRegister")
  let validationEmailLabel = document.querySelector("#labelEmail")

  let validationPassword = document.querySelector("#password")
  let validationPasswordLabel = document.querySelector("#labelPassword")

  let validationComfirmPassword = document.querySelector("#comfirmPassword")
  let validationComfirmPasswordLabel = document.querySelector("#labelComfirmPassword")

  validationName.addEventListener('keyup', () => {
   if(validationName.value.length <= 2){
     validationNameLabel.setAttribute('style', 'color: red')
     validationName.setAttribute('style', 'border-color: red')
     validationNameLabel.innerHTML = 'Nome *insira no mínimo 3 caracteres'
   } else {
     validationNameLabel.setAttribute('style', 'color: black')
     validationName.setAttribute('style', 'border-color: rgb(100, 24, 100)')
     validationNameLabel.innerHTML = 'Nome'
   }
   })

   validationLastName.addEventListener('keyup', () => {
    if(validationLastName.value.length <= 2){
      validationLastNameLabel.setAttribute('style', 'color: red')
      validationLastName.setAttribute('style', 'border-color: red')
      validationLastNameLabel.innerHTML = 'Sobre nome *insira no mínimo 3 caracteres'
    } else {
      validationLastNameLabel.setAttribute('style', 'color: black')
      validationLastName.setAttribute('style', 'border-color: rgb(100, 24, 100)')
      validationLastNameLabel.innerHTML = 'Sobre nome'
    }
    })
    
   validationPassword.addEventListener('keyup', () => {
    if(validationPassword.value.length <= 4){
      validationPasswordLabel.setAttribute('style', 'color: red')
      validationPassword.setAttribute('style', 'border-color: red')
      validationPasswordLabel.innerHTML = 'Senha *insira no mínimo 5 caracteres'
    } else {
      validationPasswordLabel.setAttribute('style', 'color: black')
      validationPassword.setAttribute('style', 'border-color: rgb(100, 24, 100)')
      validationPasswordLabel.innerHTML = 'Senha'
      }
    })
     
    validationComfirmPassword.addEventListener('keyup', () => {
    if(validationComfirmPassword.value != validationPassword.value){
      validationComfirmPasswordLabel.setAttribute('style', 'color: red')
      validationComfirmPassword.setAttribute('style', 'border-color: red')
      validationComfirmPasswordLabel.innerHTML = 'Comfirme sua senha *Senha incorreta'
    } else {
      validationComfirmPasswordLabel.setAttribute('style', 'color: black')
      validationComfirmPassword.setAttribute('style', 'border-color: rgb(100, 24, 100)')
      validationComfirmPasswordLabel.innerHTML = 'Comfirme sua senha'
      }
    })

  const submitRegister = function (){
    alert("deu boa ")
  }




