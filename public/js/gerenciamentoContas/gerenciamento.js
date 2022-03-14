function alterarSenha(){

    let conta = JSON.parse(localStorage.getItem('ContaConectada'))

    conta.senha = document.getElementById("novo-password").value
    
    localStorage.setItem("ContaConectada",JSON.stringify(conta))

    let contas = JSON.parse(localStorage.getItem("contas"))

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == conta.username){
          contas.splice(i, 1, conta)
          localStorage.setItem('contas',JSON.stringify(contas))
          break
        }}
}

function alterarEmail(){
    let conta = JSON.parse(localStorage.getItem('ContaConectada'))

    conta.email = document.getElementById("novo-email").value
    
    localStorage.setItem("ContaConectada",JSON.stringify(conta))

    let contas = JSON.parse(localStorage.getItem("contas"))

    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == conta.username){
          contas.splice(i, 1, conta)
          localStorage.setItem('contas',JSON.stringify(contas))
          break
        }}
}   