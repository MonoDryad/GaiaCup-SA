localStorage.setItem('Cadastro', '1')

function callTestUsers(){
    const allUsers = JSON.parse(localStorage.getItem('contas')) || []

    let users = [
        {
            username: 'Dryad',
            email: 'rair2544@gmail.com',
            senha: '12345',
            invocador: 'Mono Dryad',
            codigo: 901,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5035.png',
            isAdmin: false,
            team: null,
            badge: `<span class="badge bg-info text-dark">User</span>`
        },        
        {
            username: 'Jubilante',
            email: 'jubilante@gmail.com',
            senha: '12345',
            invocador: 'Jubilante',
            codigo: 902,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon5175.png',
            isAdmin: false,
            team: null,
            badge: `<span class="badge bg-info text-dark">User</span>`
        },        
        {
            username: 'Hifonio',
            email: 'hifonio@gmail.com',
            senha: '12345',
            invocador: 'Hifonio',
            codigo: 903,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4075.png',
            isAdmin: false,
            team: null,
            badge: `<span class="badge bg-info text-dark">User</span>`
        },        
        {
            username: '2noé',
            email: '2noé@gmail.com',
            senha: '2noé',
            invocador: '2noé',
            rota: 'Topo',
            codigo: 600,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon1386.png',
            isAdmin: false,
            team: 'Equipe 7 Gaming',
            badge: `<span class="badge bg-info text-dark">User</span>`
        },
        {
            username: 'Divine Itachi',
            email: 'DivineItachi@gmail.com',
            senha: 'DivineItachi',
            invocador: 'Divine Itachi',
            rota: 'Meio',
            codigo: 602,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4902.png',
            isAdmin: false,
            team: 'Equipe 7 Gaming',
            badge: `<span class="badge bg-info text-dark">User</span>`
        },
        {
            username: 'Lee Gumayusi',
            email: 'LeeGumayusi@gmail.com',
            senha: 'LeeGumayusi',
            invocador: 'Lee Gumayusi',
            rota: 'Atirador',
            codigo: 603,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon709.png',
            isAdmin: false,
            team: 'Equipe 7 Gaming',
            badge: `<span class="badge bg-info text-dark">User</span>`
        },
        {
            username: 'E7Jorgerous',
            email: 'E7Jorgerous@gmail.com',
            senha: 'E7Jorgerous',
            invocador: 'E7 Jorgerous',
            rota: 'Suporte',
            codigo: 604,
            isConnected: false,
            icon: 'https://raw.communitydragon.org/12.5/game/assets/ux/summonericons/profileicon4860.png',
            isAdmin: false,
            team: 'Equipe 7 Gaming',
            badge: `<span class="badge bg-info text-dark">User</span>`
        },
    ]

    for(let i = 0;i < users.length;i++){
        allUsers.push(users[i])
    }

    localStorage.setItem('contas', JSON.stringify(allUsers))
}