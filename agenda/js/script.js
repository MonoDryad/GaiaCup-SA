const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const dias = []
const data = new Date()
let mes = data.getMonth()
let ano = data.getFullYear()

diasEmMeses = new Date(mes, ano, 0).getDate()

for(let i = 1; i <= diasEmMeses; i++)
{
    dias.push(i)
}

document.getElementById('dia-do-mes').innerHTML = meses[data.getMonth()]
document.getElementById('ano-atual').innerHTML = data.getFullYear()

for(let i = 0; i < diasEmMeses; i++)
{
    document.getElementById('lblDias').innerHTML += dias[i] + " "
} 

document.querySelector('#Q000').addEventListener('change', quartoSelecionado)
let quartos = document.querySelector('#Q000')

function quartoSelecionado()
{
    let artos = quartos.value
    let ewf = JSON.parse(localStorage.getItem('Contas', 0))
    switch(artos)
    {
        
        case 'Q101':
            document.getElementById('lblQuartoInformativo').innerHTML = "Quarto 101A"
            document.getElementById('lblInformacaoInformativo').innerHTML = "Quarto localizado no primeiro andar, primeira porta - Número 101A"
            document.getElementById('lblDatasInformativo').innerHTML = "12/03/2022 - 23/05/2022"
            document.getElementById('lblNomeCInformativo').innerHTML = ewf[0].nome + " " + ewf[0].sobrenome
            document.getElementById('lblTeleInformativo').innerHTML = ewf[0].telefone
            document.getElementById('lblEmailInformativo').innerHTML = ewf[0].email

        case 'Q102':
            document.getElementById('lblQuartoInformativo').innerHTML = "Quarto 102B"
            document.getElementById('lblInformacaoInformativo').innerHTML = "Quarto localizado no primeiro andar, segunda porta - Número 102B"
            document.getElementById('lblDatasInformativo').innerHTML = "12/03/2022 - 23/05/2022"
            document.getElementById('lblNomeCInformativo').innerHTML = ewf[4].nome + " " + ewf[4].sobrenome
            document.getElementById('lblTeleInformativo').innerHTML = ewf[4].telefone
            document.getElementById('lblEmailInformativo').innerHTML = ewf[4].email
            break        
        case 'Q201':
            document.getElementById('lblQuartoInformativo').innerHTML = "Quarto 201A"
            document.getElementById('lblInformacaoInformativo').innerHTML = "Quarto localizado no segundo andar, primeira porta - Número 201A"
            document.getElementById('lblDatasInformativo').innerHTML = "12/03/2022 - 23/05/2022"
            document.getElementById('lblNomeCInformativo').innerHTML = ewf[6].nome + " " + ewf[6].sobrenome
            document.getElementById('lblTeleInformativo').innerHTML = ewf[6].telefone
            document.getElementById('lblEmailInformativo').innerHTML = ewf[6].email
            break
        case 'Q202':
            document.getElementById('lblQuartoInformativo').innerHTML = "Quarto 202B"
            document.getElementById('lblInformacaoInformativo').innerHTML = "Quarto localizado no segundo andar, segunda porta - Número 202B"
            document.getElementById('lblDatasInformativo').innerHTML = "12/03/2022 - 23/05/2022"
            document.getElementById('lblNomeCInformativo').innerHTML = ewf[5].nome + " " + ewf[5].sobrenome
            document.getElementById('lblTeleInformativo').innerHTML = ewf[5].telefone
            document.getElementById('lblEmailInformativo').innerHTML = ewf[5].email
            break
        default:
            console.log('b')
    }
}