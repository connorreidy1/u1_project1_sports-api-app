console.log ('working')


const baseURL = 'https://api.sportmonks.com/v3/football/'
const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
const button = document.querySelector('#submitButton')
const leagueID = '501'



button.addEventListener('click', async (event) => {
    event.preventDefault()
    const leagueName = document.querySelector('#league-name')
    const leagueLogo = document.querySelector('#league-logo')
    const teamLogo = document.querySelector('#team-logo')
    const teamName = document.querySelector('#team-name')
    
//League Name and Logo
    // const response = await axios.get(`${baseURL}leagues/${leagueID}?api_token=${apiToken}`);

    // const leagueData = response.data.data
    // leagueName.innerText = leagueData.name
    // leagueLogo.src = leagueData.image_path

    const teamIDs = ['273', '53', '284', '314', '66', '180', '258', '309', '62', '246', '734', '496' ]

    
    for (const teamID of teamIDs) {
        const response = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}`);
        const teamData = response.data.data

        console.log(`Team Name: ${teamData.name}, Team Logo: ${teamData.image_path}`)

        teamLogo.src = teamData.image_path
        teamName.innerText = teamData.name
    }

    

    // const response = await axios.get(`${baseURL}teams/${aberdeenID}?api_token=${apiToken}`);

    // const teamData = response.data.data
    // teamLogo.src = teamData.image_path
    // teamName.innerText = teamData.name

    

// console.log(response)
})