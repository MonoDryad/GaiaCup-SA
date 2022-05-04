let times = [
     {
          nome: 'DARK TENACITY',
          tag: 'DKT',
          logo: './images/Logos/Sem Fundo/darktenacity.png',
          grupo: 'D',
          vitoria: 1,
          derrota: 3,
     },
     {
          nome: 'PHOENIX WARRIORS GAMING',
          tag: 'PWG',
          logo: './images/Logos/Sem Fundo/PWG.png',
          grupo: 'A',
          vitoria:  0,
          derrota: 2,
     },
     {
          nome: 'Knave Fury Black E-sport',
          tag: 'KFS',
          logo: './images/Logos/Sem Fundo/PHXA.png',
          grupo: 'A',
          vitoria: 1,
          derrota: 3,
     },
     {
          nome: 'Lotus Galaxy',
          tag: 'LG',
          logo: './images/Logos/Sem Fundo/PHXG.png',
          grupo: 'C',
          vitoria: 3,
          derrota: 1,
     },
     {
          nome: 'TEAM SUITS',
          tag: 'TSS',
          logo: './images/Logos/Sem Fundo/SUITS.png',
          grupo: 'D',
          vitoria: 1,
          derrota: 3,
     },
     {
          nome: 'NEO AKIHABARA',
          tag: 'AKH',
          logo: './images/Logos/Sem Fundo/png-akiha.png',
          grupo: 'D',
          vitoria: 4,
          derrota: 0,
     },
     {
          nome: 'NAOKI WHITE',
          tag: 'NKIW',
          logo: './images/Logos/Sem Fundo/KNIWhite.png',
          grupo: 'B',
          vitoria: 1,
          derrota: 3,
     },
     {
          nome: 'Team NoWay',
          tag: 'TNW',
          logo: './images/Logos/Sem Fundo/TNWC.png',
          grupo: 'C',
          vitoria: 0,
          derrota: 4,
     },
     {
          nome: 'ORANGE KINGDOM - OWARI',
          tag: 'OKO',
          logo: './images/Logos/Sem Fundo/okempo.png',
          grupo: 'B',
          vitoria: 3,
          derrota: 1,
     },
     {
          nome: 'ORANGE KINGDOM - UMAYYAD',
          tag: 'OKU',
          logo: './images/Logos/Sem Fundo/okempo.png',
          grupo: 'C',
          vitoria: 3,
          derrota: 1,
     },     {
          nome: 'EIGHT DIVINE WAYS',
          tag: 'EDW',
          logo: './images/Logos/Sem Fundo/EDW.png',
          grupo: 'A',
          vitoria: 4,
          derrota: 0,
     },     {
          nome: 'BLACK DIAMOND E-SPORTS',
          tag: 'BDD',
          logo: './images/Logos/Sem Fundo/logo-black-diamond.png',
          grupo: 'B',
          vitoria: 2,
          derrota: 2,
     },
]

let tempTeamA1
let tempTeamA2
grupoATEMP = times.filter((revistando) => revistando.grupo == 'A').sort((a,b) => {
     if (a.vitoria > b.vitoria) {
          return -1;
        }
        if (a.vitoria < b.vitoria) {
          return 1;
        }
        return 0;
})
for(j=0;j<grupoATEMP.length;j++){
          document.getElementById(`imggrupoA-${j+1}`).setAttribute('src', `${grupoATEMP[j].logo}`)
          document.getElementById(`nomegrupoA-${j+1}`).innerHTML = grupoATEMP[j].nome 
          document.getElementById(`fraggrupoA-${j+1}`).innerHTML = `${grupoATEMP[j].vitoria}/${grupoATEMP[j].derrota}`
}
grupoBTEMP = times.filter((revistando) => revistando.grupo == 'B').sort((a,b) => {
     if (a.vitoria > b.vitoria) {
          return -1;
        }
        if (a.vitoria < b.vitoria) {
          return 1;
        }
        return 0;
})

for(j=0;j<grupoBTEMP.length;j++){
          document.getElementById(`imggrupoB-${j+1}`).setAttribute('src', `${grupoBTEMP[j].logo}`)
          document.getElementById(`nomegrupoB-${j+1}`).innerHTML = grupoBTEMP[j].nome 
          document.getElementById(`fraggrupoB-${j+1}`).innerHTML = `${grupoBTEMP[j].vitoria}/${grupoBTEMP[j].derrota}`
}
grupoCTEMP = times.filter((revistando) => revistando.grupo == 'C').sort((a,b) => {
     if (a.vitoria > b.vitoria) {
          return -1;
        }
        if (a.vitoria < b.vitoria) {
          return 1;
        }
        return 0;
})
for(j=0;j<grupoCTEMP.length;j++){
          document.getElementById(`imggrupoC-${j+1}`).setAttribute('src', `${grupoCTEMP[j].logo}`)
          document.getElementById(`nomegrupoC-${j+1}`).innerHTML = grupoCTEMP[j].nome 
          document.getElementById(`fraggrupoC-${j+1}`).innerHTML = `${grupoCTEMP[j].vitoria}/${grupoCTEMP[j].derrota}`
}
grupoDTEMP = times.filter((revistando) => revistando.grupo == 'D').sort((a,b) => {
     if (a.vitoria > b.vitoria) {
          return -1;
        }
        if (a.vitoria < b.vitoria) {
          return 1;
        }
        return 0;
})
for(j=0;j<grupoDTEMP.length;j++){
          document.getElementById(`imggrupoD-${j+1}`).setAttribute('src', `${grupoDTEMP[j].logo}`)
          document.getElementById(`nomegrupoD-${j+1}`).innerHTML = grupoDTEMP[j].nome 
          document.getElementById(`fraggrupoD-${j+1}`).innerHTML = `${grupoDTEMP[j].vitoria}/${grupoDTEMP[j].derrota}`
}

