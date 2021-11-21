const btnCadastrar = function()
{
    let usuario = $('#inpUsuario').val()
    let email = $('#inpEmail').val()
    let senha = $('#inpSenha').val()
    let confirmacaoSenha = $('#inpConfirmarSenha').val()

    // Verificação de cadastro

    if(usuario == '' || usuario.length < 3)
    {
        $('#lblVerificacao').html('O tamanho minímo é de 3 caracteres')
        if(senha == '' || senha.length < 5)
        {
            $('#lblVerificacao').html('A senha deve conter mais que 5 caracteres.')
        }
    }
    else if(senha == '' || senha.length < 5)
    {
        $('#lblVerificacao').html('A senha deve conter mais que 5 caracteres.')
    }
    else
    {
        console.log('DEBUG: Passando as informações')
    }
}