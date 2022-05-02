function chamarEquipe(time){
     let timeParaMostrar = teams.filter((team) => team.tagDaOrg == time)
     console.log(timeParaMostrar[0])

     document.getElementById('logomodal').setAttribute('src', `${timeParaMostrar[0].logoDaOrg}`)
     document.getElementById('nomemodal').innerHTML = timeParaMostrar[0].nomeDaOrg
     document.getElementById('tagmodal').innerHTML = timeParaMostrar[0].tagDaOrg + ` - Pontuação: ${calculateAllPoints(timeParaMostrar[0].jogadores[0].elo) + calculateAllPoints(timeParaMostrar[0].jogadores[1].elo) + calculateAllPoints(timeParaMostrar[0].jogadores[2].elo) + calculateAllPoints(timeParaMostrar[0].jogadores[3].elo) + calculateAllPoints(timeParaMostrar[0].jogadores[4].elo)}`

     for(i = 1; i <= 5;){
          document.getElementById(`imgjogadormodal-${i}`).setAttribute('src', `${timeParaMostrar[0].jogadores[i-1].icon}`)
          document.getElementById(`nomejogadormodal-${i}`).innerHTML = timeParaMostrar[0].jogadores[i-1].username + ' - Rota: ' + timeParaMostrar[0].jogadores[i-1].rota
          document.getElementById(`invocadorjogadormodal-${i}`).innerHTML = `<a href="https://leagueofgraphs.com/summoner/br/${timeParaMostrar[0].jogadores[i-1].invocador}">${timeParaMostrar[0].jogadores[i-1].invocador}</a>` + ' - ' + timeParaMostrar[0].jogadores[i-1].elo
          i++
     }

     if(timeParaMostrar[0].reservas.length > 0){
          for(i = 0; i < timeParaMostrar[0].reservas.length;){
               document.getElementById(`imgreservamodal-${i+1}`).setAttribute('src', `${timeParaMostrar[0].reservas[i].icon}`)
               document.getElementById(`nomereservamodal-${i+1}`).innerHTML = timeParaMostrar[0].reservas[i].username + ' - Rota: ' + timeParaMostrar[0].reservas[i].rota
               document.getElementById(`invocadorreservamodal-${i+1}`).innerHTML = `<a href="https://leagueofgraphs.com/summoner/br/${timeParaMostrar[0].reservas[i].invocador}>${timeParaMostrar[0].reservas[i].invocador}</a>` + ' - ' + timeParaMostrar[0].reservas[i].elo
               i++
          }
     }

     if(timeParaMostrar[0].staff.length > 0){
          for(i = 0; i < timeParaMostrar[0].staff.length;){
               document.getElementById(`imgstaffmodal-${i+1}`).setAttribute('src', `${timeParaMostrar[0].staff[i].icon}`)
               document.getElementById(`nomestaffmodal-${i+1}`).innerHTML = timeParaMostrar[0].staff[i].username
               document.getElementById(`routestaffmodal-${i+1}`).innerHTML = timeParaMostrar[0].staff[i].rota
               i++
          }
     }

     document.getElementById('GaiaModal').style.display = 'block'
}

function clearN(){
     for(i = 1; i <= 5;){
          document.getElementById(`imgjogadormodal-${i}`).setAttribute('src', '')
          document.getElementById(`nomejogadormodal-${i}`).innerHTML = null
          document.getElementById(`invocadorjogadormodal-${i}`).innerHTML = null
          i++
     }

     for(i = 1; i <= 4;){
          document.getElementById(`imgreservamodal-${i}`).setAttribute('src', '')
          document.getElementById(`nomereservamodal-${i}`).innerHTML = null
          document.getElementById(`invocadorreservamodal-${i}`).innerHTML = null
          document.getElementById(`imgstaffmodal-${i}`).setAttribute('src', '')
          document.getElementById(`nomestaffmodal-${i}`).innerHTML = null
          i++
     }

     document.getElementById('GaiaModal').style.display = 'none'
}