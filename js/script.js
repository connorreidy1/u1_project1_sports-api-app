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

        // console.log(`Team Name: ${teamData.name}, Team Logo: ${teamData.image_path}`)

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

        teamsContainer.appendChild(teamSection)

          //click event listener for get data for each team
          teamSection.addEventListener('click', async () => {
            const detailedResponse = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}&include=players;country;venue;statistics;latest;`)
            const detailedTeamData = detailedResponse.data.data

            window.location.href = `team.html?teamID=${teamID}`
            
            console.log('Detailed Team Information:', detailedTeamData)

            //getting data for each player
            // const players = detailedTeamData.players
            
            // if (players && Array.isArray(players)) {
            //     const getPlayerInfo = async (playerID) => {
            //         const playerResponse = await axios.get(`${baseURL}players/${playerID}?api_token=${apiToken}&include=position;detailedPosition;statistics;latest;teams;`)
            //         const playerData = playerResponse.data.data

            //         const playerName = playerData.display_name
            //         const playerImage = playerData.image_path
            //         const jerseyNumber = playerData.statistics[0].jersey_number
            //         const positionName = playerData.position.name
    

            //         console.log(playerData)
            //         console.log(`Player ID: ${playerID}, Player Name: ${playerName}, Image: ${playerImage}, Jersey Number: ${jerseyNumber} Position: ${positionName}`)
            //     } 
            //     for (const player of players) {
            //         await getPlayerInfo(player.player_id)
            //     }
            // } 
        
        })   
      
        }
    })



    // const playerIDs = detailedResponse.data.data.map(player => player.player_id)

    // const getPlayerInfo = async (playerID) => {
    //     const playerResponse = await axios.get(`${baseURL}players/${playerID}?api_token=${apiToken}`)
    //     const playerData = playerResponse.data.data
        
    //     console.log(`Player ID: ${playerID}, Player Name: ${playerData.fullname}`)
    // }
    // for (const playerID of playerIDs) {
    //     await getPlayerInfo(playerID)
    // }