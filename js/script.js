console.log ('working')

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

    //Team Logos and Names
    const teamIDs = ['273', '53', '284', '314', '66', '180', '258', '309', '62', '246', '734', '496']

    for (const teamID of teamIDs) {
        const response = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}`);
        const teamData = response.data.data

        console.log(`Team Name: ${teamData.name}, Team Logo: ${teamData.image_path}`)

        const teamSection = document.createElement('section')
        teamSection.classList.add('team-container')

        const teamLogo = document.createElement('img')
        teamLogo.classList.add('team-logo')
        teamLogo.alt = 'TeamLogo'
        teamLogo.src = teamData.image_path

        const teamName = document.createElement('h2')
        teamName.classList.add('team-name')
        teamName.innerText = teamData.name;

        teamSection.appendChild(teamLogo)
        teamSection.appendChild(teamName)

        //click event listenre for each team container
        teamSection.addEventListener('click', async () => {
            const detailedResponse = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}&include=players;country;venue;statistics;latest;`)
            const detailedTeamData = detailedResponse.data.data
            
            console.log(detailedTeamData)
        })

        teamsContainer.appendChild(teamSection)
    }
})



//onclick Get Team information
// document.addEventListener('click', async () => {
//     const baseURL = 'https://api.sportmonks.com/v3/football/'
//     const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
//     const individualTeamsContainer = document.querySelector('#individual-team-container')

//     const individulTeamIDs = ['273', '53', '284', '314', '66', '180', '258', '309', '62', '246', '734', '496']

   

//     for (const individualTeamID of individualTeamIDs) {
//         const responseTeam = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}&include=players;venue;coaches;statistics;latest;`)
//         const individualTeamData = responseTeam.data.data

//         console.log()
//     }


// })