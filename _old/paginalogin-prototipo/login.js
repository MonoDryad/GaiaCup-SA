criarContas()
let contaRaiAdmin = {
    nome: "Raí",
    sobrenome: "Souza",
    email: "rair2544@hotmail.com",
    senha: "adminRai12345",
    acessoAdmin: true,
    conectado: false
}

let contaConectada

const btnEntrar = function()
{
    criarContas()

    let emailLogin = $('#inpEmailLogin')
    let senhaLogin = $('#inpSenhaLogin')

    console.log(emailLogin.val(), senhaLogin.val())

    if(emailLogin.val().length != '' && senhaLogin.val().length != '')
    {
        let i = 0
        do
        {
            i++
            if($('#inpEmailLogin').val() == this["conta"+i].email && $('#inpSenhaLogin').val() == this["conta"+i].senha)
            {
                contaConectada = this["conta"+i]
                conectandoOUsuario()
                break
            } else if($('#inpEmailLogin').val() == "rair2544@hotmail.com" && $('#inpSenhaLogin').val() == "adminRai12345")
            {
                contaConectada = contaRaiAdmin
                conectandoOUsuario()
                break
            }
            console.log("Verificando...", i, this["conta"+i])
        } while($('#inpEmailLogin').val() != this["conta"+i].email)
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

    $('#divCadastro-Container').hide()
    $('#divLoginCorpo').show()
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
    localStorage.setItem("Conta Conectada", JSON.stringify(contaConectada))
    console.log(contaConectada)
    window.location.href = "teste.html"
}

function btnCnc()
{
    $('#divCadastro-Container').show()
    $('#divLoginCorpo').hide()
}
