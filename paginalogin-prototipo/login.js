let contas = 
{
    nome: $('#inpNomeRegistro').val(),
    sobrenome: $('#inpSobrenomeRegistro').val(),
    email: $('#inpEmailRegistro').val(),
    senha: $('#inpSenhaRegistro').val(),
}

localStorage.setItem('Analise', 'Ativado!')

const btnEntrar = function()
{
    for (let i = 1; i <= localStorage.length; i++) 
    {
        this["conta"+i] = JSON.parse(localStorage.getItem(i))
    }


    let emailLogin = $('#inpEmailLogin')
    let senhaLogin = $('#inpSenhaLogin')

    console.log(emailLogin.val(), senhaLogin.val())

    if(emailLogin.val() == 'adminRai@admin.com' && senhaLogin.val() == 'adminRai')
    {
        localStorage.setItem('acessoAdmin', true)
        window.location.href = "teste.html"
    }
    else
    {
        for (let i = 2; i <= localStorage.length; i++) 
        {
            console.log(i, ':v')
            if($('#inpEmailLogin').val() == this["conta"+i].email && $('#inpSenhaLogin').val() == this["conta"+i].senha){
                localStorage.setItem('acessoAdmin', false)
                window.location.href = "teste.html"
                console.log('aham')
            }
        }
    }
}

const btnCadastrar = function()
{
    contas = 
    {
        nome: $('#inpNomeRegistro').val(),
        sobrenome: $('#inpSobrenomeRegistro').val(),
        email: $('#inpEmailRegistro').val(),
        senha: $('#inpSenhaRegistro').val(),
    }

    let jsonContas = JSON.stringify(contas)
    console.log(jsonContas)

    localStorage.setItem((localStorage.length + 1), JSON.stringify(contas))

    for (let i = 2; i <= localStorage.length; i++) 
    {
        this["conta"+i] = JSON.parse(localStorage.getItem(i))
        console.log(this['conta'+i].email,this['conta'+i].senha)
    }
}