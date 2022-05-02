$('.divNoAccount').hide()

let contaUsuário
try{
  contaUsuário = JSON.parse(localStorage.getItem('ContaConectada'))
  JSON.parse(localStorage.getItem('ContaConectada')).isConnected
}catch{
  $('.divNoAccount').show()
  $('.administration , .mainContainerAcademy, .titulotitulo').hide()
}

if(contaUsuário.isAdmin == true){
    $('.administration').show()
}else{
    $('.administration').hide()
}

$('.salvarVideo').on('click', function(){
    let videos = JSON.parse(localStorage.getItem('videos')) || []

    let novoVideo = {
        titulo: null,
        dificuldade: null,
        url: null,
        thumbnail: null,
        personagem: null,
        descricao: null,
    }

    novoVideo.titulo = $('.newVideoName').val()
    novoVideo.dificuldade = $('.selectDifficult option:selected').text()
    novoVideo.url = $('.ulrVideo').val()
    novoVideo.thumbnail = $('.getThumbnail').val()
    novoVideo.personagem = $('.getCharacter').val()
    novoVideo.descricao = $('.getDescricao').val()

    videos.push(novoVideo)
    localStorage.setItem('videos', JSON.stringify(videos))
    location.reload(true)
})

$(document).ready(function(){
    if(JSON.parse(localStorage.getItem('videos')).length == 0){
        $('.NoVideos').show()
    }else{
        $('.NoVideos').hide()
    }

    let videos = JSON.parse(localStorage.getItem('videos'))
    for(let i = 0; i < videos.length; i++){
        $('.videosFirstRow').append(
            `
            <div class="videos video-${i}" onclick="chamarVideo(${i})" style="cursor: pointer">
                <img width="100%" height="120vh" class="thumbnail thumbnail-${i}" src="${videos[i].thumbnail}">
                <h4 class="titulo titulo-${i}">${videos[i].titulo}</h4>
                <label class="difficult difficult-${videos[i].dificuldade}">Dificuldade: ${videos[i].dificuldade}</label>
                <p>Personagem: ${videos[i].personagem}</p>
            </div>
            `
        )
    }
})

function chamarVideo(video){
    let allVideos = JSON.parse(localStorage.getItem('videos'))

    console.log('video: ', video)

    $('.videosToWatch').append(`
    <button type="button" class="removeIt openVideo-${video}" data-bs-toggle="modal" data-bs-target="#openVideo-${video}"></button>
    <div class="modal fade" id="openVideo-${video}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-fullscreen-lg-down">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Video: ${allVideos[video].titulo}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body videosBody">
                    <div class="videoPlayer">
                        <video id="videoPlayer${video}" preload="auto" min-width="86%" width="86%" max-width="86%" controls>
                            <source src="${allVideos[video].url}" type="video/mp4">
                        </video>
                    </div>
                    <div class="vr"></div>
                    <div class="videoInformation">
                        <h4>Personagem: ${allVideos[video].personagem} </h4>
                        <h6>Dificuldade: ${allVideos[video].dificuldade} </h6>
                        <h6 class="timeIsImportant${video}"></h6>
                        <hr>
                        <h4 style="text-align: center">Descrição</h4>
                        <p class="descricaoVideo">${allVideos[video].descricao}</p>
                    </div>
                </div>
                <div class="modal-footer videosFooter">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="stopVideo(${video}); proximoVideo(${video})">Próximo video</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="stopVideo(${video})">Fechar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="stopVideo(${video}); anteriorVideo(${video})">Video anterior</button>
                </div>
            </div>
        </div>
    </div>
    `)

    let getVideo = document.getElementById(`videoPlayer${video}`)
    getVideo.addEventListener('loadeddata', function() {
        if(getVideo.readyState > 0) {
            let minutes = parseInt(getVideo.duration / 60, 10);
            let seconds = getVideo.duration % 60;
    
            $(`.timeIsImportant${video}`).text(`Tempo: ${minutes}:${seconds}`)
        }
    });



    $(`.openVideo-${video}`).trigger('click')
}

function stopVideo(video){
    $(`.videoPlayer${video}`).trigger('pause')
}

function proximoVideo(video){
    let newVideo = video - 1
    if(newVideo == -1){
        newVideo = 0
    }
    chamarVideo(newVideo)
}

function anteriorVideo(video){
    let allVideos = JSON.parse(localStorage.getItem('videos'))

    let newVideo = video + 1
    if(newVideo > allVideos.length){
        newVideo = allVideos.length
    }
    chamarVideo(newVideo)
}