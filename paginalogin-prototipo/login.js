criarContas()
let contaConectada

const btnEntrar = function()
{
    criarContas()

    let emailLogin = $('#inpEmailLogin')
    let senhaLogin = $('#inpSenhaLogin')

    console.log(emailLogin.val(), senhaLogin.val())

    if(emailLogin.val().length != '' && senhaLogin.val().length != '')
    {
        for (let i = 1; i <= 100; i++) 
        {
            console.log(i, 'verificação')
            if($('#inpEmailLogin').val() == this["conta"+i].email && $('#inpSenhaLogin').val() == this["conta"+i].senha)
            {
                console.log(this["conta"+i])
                conectandoOUsuario()
                contaConectada = this["conta"+i]
                break
            }
        }
    }
    else
    {
        $('#lblVerificacaoLogin').text("Email ou senha incorreta.")
    }
}

const btnCadastrar = function()
{
    let contas = 
    {
        nome: $('#inpNomeRegistro').val(),
        sobrenome: $('#inpSobrenomeRegistro').val(),
        email: $('#inpEmailRegistro').val(),
        senha: $('#inpSenhaRegistro').val(),
        acessoAdmin: false,
        conectado: false
    }

    let account = localStorage.length
    localStorage.setItem((account + 1), JSON.stringify(contas))

    criarContas()
}

function criarContas()
{
    for(let i = 1;i < localStorage.length;i++)
    {
        this["conta"+i] = JSON.parse(localStorage.getItem(i))
    }
}

function conectandoOUsuario()
{
    console.log('verificando conta')
    contaConectada.conectado = true
}