function alterarEmail(){

    let contas = JSON.parse(localStorage.getItem("contas"))
    let conta
    
    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == document.getElementById('procurarEmail').value){
            conta = contas[i]
            break
        }
    }
    
    conta.email = document.getElementById('email').value
    
    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == conta.username){
          contas.splice(i, 1, conta)
          localStorage.setItem('contas',JSON.stringify(contas))
          break
        }
    }
}


function alterarSenha(){

    let contas = JSON.parse(localStorage.getItem("contas"))
    let conta
    
    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == document.getElementById('senha_atual').value){
            conta = contas[i]
            break
        }
    }
    
    conta.senha = document.getElementById('editar-password').value
    
    for(let i = 0; i < contas.length;i++){
        if(contas[i].username == conta.username){
          contas.splice(i, 1, conta)
          localStorage.setItem('contas',JSON.stringify(contas))
          break
        }
    }
}