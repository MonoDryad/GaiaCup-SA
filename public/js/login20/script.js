// -- // -- // -- // LOCALSTORAGE FUNCTIONALITY \\ -- \\ -- \\ -- \\
$('.btnCadastro').click(function(){
    $('.inpRegistroConfirmPassword, .inpRegistroPassword, .inpRegistroEmail, .inpRegistroUserName').css('border-bottom', '#797979 solid 1px')
    $('.pErrorRegisterUsername, .pErrorRegisterEmail, .pErrorRegisterPassword, .pErrorRegisterConfirmPassword').text('')

    let registeredUser = {
        username: null,
        email: null,
        senha: null,
        invocador: null,
        codigo: null,
        isConnected: false,
        icon: null,
        isAdmin: false,
        badge: `<span class="badge bg-info text-dark">User</span>`
    }
    const allUsers = JSON.parse(localStorage.getItem('contas')) || []
    if($('.inpRegistroUserName').val().length > 3 && allUsers.find(function(usuariosExistentes){return usuariosExistentes.username == $('.inpRegistroUserName').val().toLowerCase()}) == undefined){
        registeredUser.username = $('.inpRegistroUserName').val().toLowerCase()
        if($('.inpRegistroEmail').val().length > 3  && allUsers.find(function(usuariosExistentes){return usuariosExistentes.email == $('.inpRegistroEmail').val().toLowerCase()}) == undefined){
            if($('.inpRegistroEmail').val().includes('@', 3)){
                if($('.inpRegistroEmail').val().indexOf('.') > ($('.inpRegistroEmail').val().indexOf('@') + 1) && $('.inpRegistroEmail').val().includes('.', 5)){
                    registeredUser.email = $('.inpRegistroEmail').val().toLowerCase()
                    if($('.inpRegistroPassword').val().length > 5){
                        if($('.inpRegistroPassword').val() == $('.inpRegistroConfirmPassword').val()){
                            registeredUser.senha = $('.inpRegistroPassword').val()
                            registeredUser.codigo = allUsers.length+1
                            registeredUser.icon = `https://raw.communitydragon.org/12.4/game/assets/ux/summonericons/profileicon${Math.round(Math.random() * 5267)}.png`
                            allUsers.push(registeredUser)
                            localStorage.setItem('contas', JSON.stringify(allUsers))
                            $('.register-content-main').hide()
                            $('.container-login-content').show()
                        }else{
                            $('.inpRegistroConfirmPassword').css('border-bottom', '#b40000 solid 1px')
                            $('.pErrorRegisterConfirmPassword').text('• Senhas incompatíveis')
                        }
                    }else{
                        $('.inpRegistroPassword').css('border-bottom', '#b40000 solid 1px')
                        $('.pErrorRegisterPassword').text('• Senha pequena')
                    }
                }else{
                    $('.inpRegistroEmail').css('border-bottom', '#b40000 solid 1px')
                    $('.pErrorRegisterEmail').text('• E-mail inválido')
                }
            }else{
                $('.inpRegistroEmail').css('border-bottom', '#b40000 solid 1px')
                $('.pErrorRegisterEmail').text('• E-mail inválido')
            }
        }else{
            $('.inpRegistroEmail').css('border-bottom', '#b40000 solid 1px')
            $('.pErrorRegisterEmail').text('• E-mail em uso/incorreto')
        }
    }else{
        $('.inpRegistroUserName').css('border-bottom', '#b40000 solid 1px')
        $('.pErrorRegisterUsername').text('• Usuário em uso/incorreto')
    }
})

$('.btnEntrar').click(function(){
    const allUsers = JSON.parse(localStorage.getItem('contas')) || []
    if(allUsers.find(function(contasLocais){return contasLocais.username == $('.inpUserName').val().toLowerCase()})){
        if(allUsers.find(function(contasLocais){return contasLocais.senha == $('.inpPassword').val() && contasLocais.username == $('.inpUserName').val().toLowerCase()})){
            let loggedAccount = allUsers.find(function(contasLocais){return contasLocais.senha == $('.inpPassword').val() && contasLocais.username == $('.inpUserName').val().toLowerCase()})
            loggedAccount.isConnected = true
            localStorage.setItem('ContaConectada',JSON.stringify(loggedAccount))
            window.location.href = "./index.html"
        }else if($('.inpPassword').val() < 1){
            $('.inpPassword').css('border-bottom', '#b40000 solid 1px')
            $('.pErrorPassword').text('• Campo não preenchido')
        }else{
            $('.inpPassword').css('border-bottom', '#b40000 solid 1px')
            $('.pErrorPassword').text('• Senha incorreta')
        }
    }else if($('.inpUserName').val() < 1){
        $('.inpUserName').css('border-bottom', '#b40000 solid 1px')
        $('.pErrorUsername').text('• Campo não preenchido')
    }else{
        $('.inpUserName').css('border-bottom', '#b40000 solid 1px')
        $('.pErrorUsername').text('• Usuário não existe')
    }
})

$('.btnEntrarAdmin').click(function(){
    const allUsers = JSON.parse(localStorage.getItem('admin')) || []
    if(allUsers.find(function(contasLocais){return contasLocais.username == $('.inpUserNameAdmin').val().toLowerCase()})){
        if(allUsers.find(function(contasLocais){return contasLocais.senha == $('.inpPasswordAdmin').val() && contasLocais.username == $('.inpUserNameAdmin').val().toLowerCase()})){
            let loggedAccount = allUsers.find(function(contasLocais){return contasLocais.senha == $('.inpPasswordAdmin').val() && contasLocais.username == $('.inpUserNameAdmin').val().toLowerCase()})
            loggedAccount.isConnected = true
            localStorage.setItem('ContaConectada',JSON.stringify(loggedAccount))
            window.location.href = "./index.html"
        }else if($('.pTextUsernameAdmin').val() < 1){
            $('.pTextUsernameAdmin').css('border-bottom', '#b40000 solid 1px')
            $('.pErrorPassword').text('• Campo não preenchido')
        }else{
            $('.pTextUsernameAdmin').css('border-bottom', '#b40000 solid 1px')
            $('.pErrorPassword').text('• Senha incorreta')
        }
    }else if($('.inpUserNameAdmin').val() < 1){
        $('.inpUserName').css('border-bottom', '#b40000 solid 1px')
        $('.pErrorUsername').text('• Campo não preenchido')
    }else{
        $('.inpUserNameAdmin').css('border-bottom', '#b40000 solid 1px')
        $('.pErrorUsername').text('• Usuário não existe')
    }
})
// -- // -- // -- // LOCALSTORAGE FUNCTIONALITY \\ -- \\ -- \\ -- \\ 

// -- // -- // -- // PAGE FUNCTIONALITY \\ -- \\ -- \\ -- \\
$('.inpRegistroConfirmPassword, .inpRegistroPassword, .inpRegistroEmail, .inpRegistroUserName, .inpUserName, .inpPassword').on('keyup',function(){
    $(this).css('border-bottom', '#797979 solid 1px')
    if($(this).hasClass('inpRegistroUserName')){
        $('.pErrorRegisterUsername').text('')
    }else if($(this).hasClass('inpRegistroEmail')){
        $('.pErrorRegisterEmail').text('')
    }else if($(this).hasClass('inpRegistroPassword')){
        $('.pErrorRegisterPassword').text('')
    }else if($(this).hasClass('inpRegistroConfirmPassword')){
        $('.pErrorRegisterConfirmPassword').text('')
    }else if($(this).hasClass('inpUserName')){
        $('.pErrorUsername').text('')
    }else if($(this).hasClass('inpPassword')){
        $('.pErrorPassword').text('')
    }
})



$('.pText').hide()

$('input').focusin(function(){
    if($(this).hasClass('inpUserName')){
        $(this).attr('placeholder', '')
        $('.pTextUsername').addClass('input-goup-login')
        $('.pTextUsername').show()
    }else if($(this).hasClass('inpPassword')){
        $(this).attr('placeholder', '')
        $('.pTextPassword').addClass('input-goup-login')
        $('.pTextPassword').show()
    }else if($(this).hasClass('inpRegistroUserName')){
        $(this).attr('placeholder', '')
        $('.pTextRegisterUsername').addClass('input-goup-login')
        $('.pTextRegisterUsername').show()
    }else if($(this).hasClass('inpRegistroEmail')){
        $(this).attr('placeholder', '')
        $('.pTextRegisterEmail').addClass('input-goup-login')
        $('.pTextRegisterEmail').show()
    }else if($(this).hasClass('inpRegistroPassword')){
        $(this).attr('placeholder', '')
        $('.pTextRegisterPassword').addClass('input-goup-login')
        $('.pTextRegisterPassword').show()
    }else if($(this).hasClass('inpRegistroConfirmPassword')){
        $(this).attr('placeholder', '')
        $('.pTextRegisterConfirmPassword').addClass('input-goup-login')
        $('.pTextRegisterConfirmPassword').show()
    }else if($(this).hasClass('inpUserNameAdmin')){
        $(this).attr('placeholder', '')
        $('.pTextUsernameAdmin').addClass('input-goup-login')
        $('.pTextUsernameAdmin').show()
    }else if($(this).hasClass('inpPasswordAdmin')){
        $(this).attr('placeholder', '')
        $('.pTextPasswordAdmin').addClass('input-goup-login')
        $('.pTextPasswordAdmin').show()
    }
})

$('input').focusout(function(){
    if($(this).hasClass('inpUserName') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Nome do usuário')
        $('.pTextUsername').hide()
    }else if($(this).hasClass('inpPassword') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Senha')
        $('.pTextPassword').hide()
    }else if($(this).hasClass('inpRegistroUserName') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Nome do usuário')
        $('.pTextRegisterUsername').hide()
    }else if($(this).hasClass('inpRegistroEmail') && $(this).val().length < 1){
        $(this).attr('placeholder', 'E-mail')
        $('.pTextRegisterEmail').hide()
    }else if($(this).hasClass('inpRegistroPassword') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Senha')
        $('.pTextRegisterPassword').hide()
    }else if($(this).hasClass('inpRegistroConfirmPassword') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Confirmar senha')
        $('.pTextRegisterConfirmPassword').hide()
    }else if($(this).hasClass('inpUserNameAdmin') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Nome do usuário')
        $('.pTextUsernameAdmin').hide()
    }else if($(this).hasClass('inpPasswordAdmin') && $(this).val().length < 1){
        $(this).attr('placeholder', 'Senha')
        $('.pTextPasswordAdmin').hide()
    }
})

$('.content-title').text('Iníciar Sessão')
$('.register-content-main').hide()
$('.login-content-main').show()


$('.btnCadastrar').click(function(){
    $('.content-title').text('Cadastro')
    $('.register-content-main').show()
    $('.container-login-content').hide()
})

$('.btnIsessao').click(function(){
    $('.content-title').text('Iníciar Sessão')
    $('.register-content-main').hide()
    $('.container-login-content').show()
})

let showingPassword = 0
let showingRegisterPassword = 0
let showingRegisterConfirmationPassword = 0
let showingAdminPassword = 0

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

$('.imgOcultandoAdmin').click(function(){
    if(showingPassword == 0){
        $(this).attr("src", function (index, attr) {
            showingPassword = 1
            $('.inpPasswordAdmin').attr('type', 'text')
            $(this).css('width', '7%')
            $(this).css('margin-left', '-8%')
            return attr.replace(".png", "-showing.png")
        })
    }else{
        $(this).attr("src", function (index, attr) {
            showingPassword = 0
            $('.inpPasswordAdmin').attr('type', 'password')
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
            $('.imgCapslock, .imgCapslockAdmin').css('opacity', '100%')
            isCapsPressed = true
        }
    }else if(tecla.which==20 && isCapsPressed == true){
        if(isShiftPressed == true){
            return
        }else{
            $('.imgCapslock, .imgCapslockAdmin').css('opacity', '0%')
            isCapsPressed = false
        }
    }
});

$(document).on('keydown',function(tecla){
    if(tecla.which==16 && isShiftPressed == false){
        if(isCapsPressed == true){
            return
        }else{        
        $('.imgCapslock, .imgCapslockAdmin').css('opacity', '100%')
        isShiftPressed = true
        }
    }
});

$(document).on('keyup',function(tecla){
    if(tecla.which==16 && isShiftPressed == true){
        if(isCapsPressed == true){
            return
        }else{        
        $('.imgCapslock, .imgCapslockAdmin').css('opacity', '0%')
        isShiftPressed = false
        }
    }
});

$('.container-loginAdmin-content').hide()

$('.sideway-admin-textbottom').on('click', function(){
    if($('.container-login-main').hasClass('container-admin-invert')){
        $('.container-login-main').removeClass('container-admin-invert')
        $('.container-sideway-submain').removeClass('adjusted-border-left')
        $('.container-login-submain').removeClass('adjusted-border-right')
        $('.content-title').text('Iníciar Sessão')
        $('.register-content-main').hide()
        $('.container-login-content').show()
        $('.container-loginAdmin-content').hide()
    }else{
        $('.container-login-main').addClass('container-admin-invert')
        $('.container-sideway-submain').addClass('adjusted-border-left')
        $('.container-login-submain').addClass('adjusted-border-right')
        $('.container-loginAdmin-content').show()
        $('.container-login-content').hide()
        $('.register-content-main').hide()
    }
})

// -- // -- // -- // PAGE FUNCTIONALITY \\ -- \\ -- \\ -- \\