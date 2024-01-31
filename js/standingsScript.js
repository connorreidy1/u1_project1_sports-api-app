document.addEventListener('DOMContentLoaded', async () => {
    const baseURL = 'https://api.sportmonks.com/v3/football/'
    const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
    const leagueLogo = document.querySelector('#league-logo')
    const teamsContainer = document.querySelector('#teams-container')
//LANDING PAGE
    //League Logo
    const leagueID = '501'
    const responseLeague = await axios.get(`${baseURL}leagues/${leagueID}?api_token=${apiToken}`)
    const leagueData = responseLeague.data.data

    leagueLogo.src = leagueData.image_path
})


document.addEventListener('DOMContentLoaded', async () => {
    const baseURL = 'https://api.sportmonks.com/v3/football/'
    const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
    const standingsContainer = document.querySelector('#standings-container')
    const seasonID = '21787'


    const urlParams = new URLSearchParams(window.location.search)
    const fixtureID= urlParams.get('seasonID')


    const response = await axios.get(`${baseURL}standings/seasons/${seasonID}?api_token=${apiToken}`)
    const standingsData = response.data.data


    for (const standing of standingsData) {
        const teamID = standing.participant_id
        const position = standing.position
        const points = standing.points


        const responseTeam = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}`)
        const teamData = responseTeam.data.data

        const teamName = teamData.name
        const teamLogo = teamData.image_path


        const teamContainer = document.createElement('div')
        teamContainer.classList.add('team-container')
        const positionElement = document.createElement('p')
        positionElement.classList.add('position-container')
        const pointsElement = document.createElement('p')
        pointsElement.classList.add('points-container')
        const teamNameElement = document.createElement('p')
        teamNameElement.classList.add('teamName-container')
        const teamLogoElement = document.createElement('img')
        teamLogoElement.classList.add('teamLogo-container')

        positionElement.textContent = position
        pointsElement.textContent = points
        teamNameElement.textContent = teamName
        teamLogoElement.src = teamLogo

        teamContainer.appendChild(positionElement)
        teamContainer.appendChild(teamLogoElement)
        teamContainer.appendChild(teamNameElement)
        teamContainer.appendChild(pointsElement)
        

        standingsContainer.appendChild(teamContainer)

        //    console.log(`Team ID: ${teamID}, Position: ${position}, Points: ${points}, Name: ${teamName}, Image Path: ${teamLogo}`)
    } 
    
})