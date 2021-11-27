const novasContas = []
let contaConectada
if(localStorage.length > 0)
{
const contasExistentes = JSON.parse(localStorage.getItem('Contas'))
for(let i = 0;i<contasExistentes.length;i++){
novasContas.push(contasExistentes[i])
}
}

let contaRegistrada =
{
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    senha: '',
}

$('#btnIdRegistroRegistrar').click(function()
{
    contaRegistrada =
    {
        nome: $('#inpIdRegistroNome').val(),
        sobrenome: $('#inpIdRegistroSobrenome').val(),
        email: $('#inpIdRegistroEmail').val(),
        telefone: $('#inpIdRegistroTelefone').val(),
        senha: $('#inpIdRegistroSenha').val(),
    }
    console.log("Seja bem-vindo: ", contaRegistrada.nome, contaRegistrada.sobrenome)

    novasContas.unshift(contaRegistrada)
    localStorage.setItem("Contas", JSON.stringify(novasContas))

    contaRegistrada =
    {
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        senha: '',
    }
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
    }
    else
    {
        $('#inpIdErroSenha').html('Campo de Senha não foi preenchido!')
    }
}