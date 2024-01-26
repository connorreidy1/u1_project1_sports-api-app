console.log ('working')

const apiKey = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
const button = document.querySelector('#submitButton')

const getTeam = async () => {
    const team = await axios.get(`https://api.sportmonks.com/football/v3?api_token=OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy`)
}

button.addEventListener('click', async (event) => {
    event.preventDefault()
    
})