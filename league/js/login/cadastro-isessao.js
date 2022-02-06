const todasContas = JSON.parse(localStorage.getItem('Contas')) || []
let contaConectada

function ativarButton() {
    if (validacaoUsuario == true && validacaoSenha == true && validacaoConfirSenha == true) {
        $('#submitRegister').removeAttr('disabled')

    } else if (validacaoUsuario == false || validacaoSenha == false || validacaoConfirSenha == false) {
        $('#submitRegister').attr('disabled', true)
    }
}

$('#submitRegister').click(function (cancelarForm) {
    cancelarForm.preventDefault()

    let contaRegistrada =
    {
        usuario: $('#nameRegister').val(),
        email: $('#emailRegister').val(),
        senha: $('#password').val(),
        invocador: null,
    }
    console.log("Bem-vindo:", contaRegistrada.nome, contaRegistrada.sobrenome)

    todasContas.unshift(contaRegistrada)
    localStorage.setItem("Contas", JSON.stringify(todasContas))
    window.location.href = "./isessao.html"
})

$('#buttonLogin').click(function (cancelarForm) {
    cancelarForm.preventDefault()

    if (todasContas.find(buscarConta)) {
        contaConectada = todasContas.find(buscarConta)
        localStorage.setItem("Conta_Conectada", JSON.stringify(contaConectada))
        window.location.href = "./index.html"
    }
    else {
        contaConectada = null
        localStorage.setItem("Conta_Conectada", JSON.stringify(contaConectada))
    }
})

function buscarConta(conta) {
    return conta.email === $('#emailLogin').val()
}