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
    const teamDetailsContainer = document.querySelector('#team-details-container')

    const urlParams = new URLSearchParams(window.location.search)
    const teamID= urlParams.get('teamID')

    const teamName = document.querySelector('#team-name')
    const teamStadium = document.querySelector('#team-stadium')
    const teamLocation = document.querySelector('#team-location')

    const detailedResponse = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}&include=players;country;venue;statistics;latest;`)
    const detailedTeamData = detailedResponse.data.data

    //Team information
    const name = detailedTeamData.name
    teamName.innerHTML = name
    const stadium = detailedTeamData.venue.name
    teamStadium.innerHTML = stadium
    const city = detailedTeamData.venue.city_name
    const country = detailedTeamData.country.name
    teamLocation.innerHTML = `${city}, ${country}`

    console.log('Detailed Team Information:', detailedTeamData)


    const players = detailedTeamData.players
            
            if (players && Array.isArray(players)) {
                const getPlayerInfo = async (playerID) => {
                    const playerResponse = await axios.get(`${baseURL}players/${playerID}?api_token=${apiToken}&include=position;detailedPosition;statistics;latest;teams;`)
                    const playerData = playerResponse.data.data

                    const playerName = playerData.display_name
                    const playerImage = playerData.image_path
                    const jerseyNumber = playerData.statistics[0].jersey_number
                    const positionName = playerData.position.name
    

                    console.log(playerData)
                    console.log(`Player ID: ${playerID}, Player Name: ${playerName}, Image: ${playerImage}, Jersey Number: ${jerseyNumber} Position: ${positionName}`)
                } 
                for (const player of players) {
                    await getPlayerInfo(player.player_id)
                }
            } 
})