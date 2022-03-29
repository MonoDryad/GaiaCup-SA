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