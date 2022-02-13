// -- // -- // -- // LOCALSTORAGE FUNCTIONALITY \\ -- \\ -- \\ -- \\

$('.btnCadastro').click(function(){
    const allUsers = JSON.parse(localStorage.getItem('contas')) || []
    let registeredUser = {
        username: $('.inpRegistroUserName').val(),
        email: $('.inpRegistroEmail').val(),
        senha: $('.inpRegistroPassword').val(),
        invocador: null,
        codigo: allUsers.length+1
    }
    
    allUsers.push(registeredUser)
    localStorage.setItem('contas', JSON.stringify(allUsers))
})

$('.btnEntrar').click(function(){
    const allUsers = JSON.parse(localStorage.getItem('contas')) || []
    if(allUsers.find(function(contasLocais){return contasLocais.username == $('.inpUserName').val()})){
        if(allUsers.find(function(contasLocais){return contasLocais.senha == $('.inpPassword').val() && contasLocais.username == $('.inpUserName').val()})){
            alert('sucesso!')
        }else{
            alert('senha incorreta')
        }
    }else{
        alert('usuário não encontrado')
    }
})


// -- // -- // -- // PAGE FUNCTIONALITY \\ -- \\ -- \\ -- \\
const whatUserWant = JSON.parse(localStorage.getItem('registerOrLogin'))

if(whatUserWant == 'register'){
    $('.register-content-main').show()
    $('.login-content-main').hide()
}else{
    $('.register-content-main').hide()
    $('.login-content-main').show()
}

$('.btnCadastrar').click(function(){
    $('.content-title').text('Cadastro')
    $('.register-content-main').show()
    $('.login-content-main').hide()
})

$('.btnIsessao').click(function(){
    $('.content-title').text('Iníciar Sessão')
    $('.register-content-main').hide()
    $('.login-content-main').show()
})

let showingPassword = 0
let showingRegisterPassword = 0
let showingRegisterConfirmationPassword

$('.imgOcultando').click(function(){
    if(showingPassword == 0){
        $(this).attr("src", function (index, attr) {
            showingPassword = 1
            $('.inpPassword').attr('type', 'text')
            $(this).css('width', '7%')
            $(this).css('margin-left', '-8%')
            return attr.replace(".png", "-showing.png")
        })
    }else{
        $(this).attr("src", function (index, attr) {
            showingPassword = 0
            $('.inpPassword').attr('type', 'password')
            $(this).css('width', '5%')
            $(this).css('margin-left', '-7%')
            return attr.replace("-showing.png", ".png")
        })
    }
})

$('.imgOcultandoRegistro').click(function(){
    if(showingRegisterPassword == 0){
        $(this).attr("src", function (index, attr) {
            showingRegisterPassword = 1
            $('.inpRegistroPassword').attr('type', 'text')
            $(this).css('width', '7%')
            $(this).css('margin-left', '-8%')
            return attr.replace(".png", "-showing.png")
        })
    }else{
        $(this).attr("src", function (index, attr) {
            showingRegisterPassword = 0
            $('.inpRegistroPassword').attr('type', 'password')
            $(this).css('width', '5%')
            $(this).css('margin-left', '-7%')
            return attr.replace("-showing.png", ".png")
        })
    }
})

$('.imgOcultandoRegistroConfirm').click(function(){
    if(showingRegisterConfirmationPassword == 0){
        $(this).attr("src", function (index, attr) {
            showingRegisterConfirmationPassword = 1
            $('.inpRegistroConfirmPassword').attr('type', 'text')
            $(this).css('width', '7%')
            $(this).css('margin-left', '-8%')
            return attr.replace(".png", "-showing.png")
        })
    }else{
        $(this).attr("src", function (index, attr) {
            showingRegisterConfirmationPassword = 0
            $('.inpRegistroConfirmPassword').attr('type', 'password')
            $(this).css('width', '5%')
            $(this).css('margin-left', '-7%')
            return attr.replace("-showing.png", ".png")
        })
    }
})

let isCapsPressed = false
let isShiftPressed = false

$(document).bind('keyup', function(tecla){
    if(tecla.which==20 && isCapsPressed == false){
        if(isShiftPressed == true){
            return
        }else{
            $('.imgCapslock').css('opacity', '100%')
            isCapsPressed = true
        }
    }else if(tecla.which==20 && isCapsPressed == true){
        if(isShiftPressed == true){
            return
        }else{
            $('.imgCapslock').css('opacity', '0%')
            isCapsPressed = false
        }
    }
});

$(document).on('keydown',function(tecla){
    if(tecla.which==16 && isShiftPressed == false){
        if(isCapsPressed == true){
            return
        }else{        
        $('.imgCapslock').css('opacity', '100%')
        isShiftPressed = true
        }
    }
});

$(document).on('keyup',function(tecla){
    if(tecla.which==16 && isShiftPressed == true){
        if(isCapsPressed == true){
            return
        }else{        
        $('.imgCapslock').css('opacity', '0%')
        isShiftPressed = false
        }
    }
});
