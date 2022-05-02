function detectPointsPerElo(eloUsuario){
    switch(eloUsuario){
        case 'Ferro':
            case 'Bronze':
                return `[I] ${eloUsuario} - 1,0p`
        case 'Prata':
            return `[I] ${eloUsuario} - 2,0p`
        case 'Ouro 4':
            case 'Ouro 3':
                return `[I] ${eloUsuario} - 3,5p`
        case 'Ouro 2':
            case 'Ouro 1':
                return `[I] ${eloUsuario} - 4,0p`
        case 'Platina 4':
            case 'Platina 3':
                return `[I] ${eloUsuario} - 5,0p`
        case 'Platina 2':
            case 'Platina 1':
                return `[I] ${eloUsuario} - 6,0p`
        case 'Diamante 4':
            case 'Diamante 3':
                return `[I] ${eloUsuario} - 7,5p`
        case 'Diamante 2':
            case 'Diamante 1':
                return `[I] ${eloUsuario} - 8,5p`
        default:
            return `${eloUsuario} - Não permitido - QUARTA EDIÇÃO`
    }
}

function calculateAllPoints(pontuacao){

    switch(pontuacao){
        case '[I] Ferro - 1,0p':
            case '[I] Bronze - 1,0p':
                return 1.0
        case '[I] Prata - 2,0p':
            return 2.0
        case '[I] Ouro 4 - 3,5p':
            case '[I] Ouro 3 - 3,5p':
                return 3.5
        case '[I] Ouro 2 - 4,0p':
            case '[I] Ouro 1 - 4,0p':
                return 4.0
        case '[I] Platina 4 - 5,0p':
            case '[I] Platina 3 - 5,0p':
                return 5.0
        case `[I] Platina 2 - 6,0p`:
            case `[I] Platina 1 - 6,0p`:
                return 6.0
        case '[I] Diamante 4 - 7,5p':
            case '[I] Diamante 3 - 7,5p':
                return 7.5
        case '[I] Diamante 2 - 8,5p':
            case '[I] Diamante 1 - 8,5p':
                return 8.5
        default:
            return `TIME IRREGULAR!`
    }
}