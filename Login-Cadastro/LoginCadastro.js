const novasContas = JSON.parse(localStorage.getItem('Contas')) || []
let contaConectada

$('#btnIdRegistroRegistrar').click(function()
{
    let contaRegistrada =
    {
        nome: $('#inpIdRegistroNome').val(),
        sobrenome: $('#inpIdRegistroSobrenome').val(),
        email: $('#inpIdRegistroEmail').val(),
        telefone: $('#inpIdRegistroTelefone').val(),
        senha: $('#inpIdRegistroSenha').val(),
    }
    console.log("Bem-vindo:", contaRegistrada.nome, contaRegistrada.sobrenome)

    novasContas.unshift(contaRegistrada)
    localStorage.setItem("Contas", JSON.stringify(novasContas))
})

$('#btnIdEntrar').click(function()
{
    if(novasContas.find(buscarConta))
    {
        console.log('Conta encontrada!')
        console.log(novasContas.find(buscarConta))
        contaConectada = novasContas.find(buscarConta)
        confirmarConta()
    }
    else
    {
        contaConectada = null
        if($('#inpIdEmail').val() != '')
        {
            $('#inpIdErroUsuario').text('Email ou Telefone não encontrado!')
        }
        else
        {
            $('#inpIdErroUsuario').text('Campo de Usuário não foi preenchido!')
        }
    }
})

function buscarConta(conta)
{
    return conta.email === $('#inpIdEmail').val()
}

function confirmarConta()
{
    if(contaConectada.senha == $('#inpIdSenha').val())
    {
        $('#inpIdErroSenha').html('Sucesso!')
    }
    else if(contaConectada.senha != $('#inpIdSenha').val())
    {
        $('#inpIdErroSenha').html('Senha incorreta!')
        contaConectada = null
    }
    else
    {
        $('#inpIdErroSenha').html('Campo de Senha não foi preenchido!')
        contaConectada = null
    }
}

$('#btnIdCadastra-se').click(function()
{
    $('.divClassContainerLogin').hide()
    $('.divClassContainerRegistro').css("display","block")
})

$('#btnIdRegistroVoltar').click(function()
{
    $('.divClassContainerLogin').show()
    $('.divClassContainerRegistro').css("display","none")
})

