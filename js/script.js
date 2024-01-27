console.log ('working')


const baseURL = 'https://api.sportmonks.com/v3/football/'
const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
const button = document.querySelector('#submitButton')
const leagueID = '501'



button.addEventListener('click', async (event) => {
    event.preventDefault()
    const leagueName = document.querySelector('#league-name')
    const leagueLogo = document.querySelector('#league-logo')

    

    const response = await axios.get(`${baseURL}leagues/${leagueID}?api_token=${apiToken}`);


    const leagueData = response.data.data;


    leagueName.innerText = leagueData.name;
    leagueLogo.src = leagueData.image_path;


console.log(response)
})