//Page Header
document.addEventListener('DOMContentLoaded', async () => {
    const baseURL = 'https://api.sportmonks.com/v3/football/'
    const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
    const leagueLogo = document.querySelector('#league-logo')
    const teamsContainer = document.querySelector('#teams-container')

    //League Logo
    const leagueID = '501'
    const responseLeague = await axios.get(`${baseURL}leagues/${leagueID}?api_token=${apiToken}`)
    const leagueData = responseLeague.data.data

    leagueLogo.src = leagueData.image_path
})

//Retrieve team information
document.addEventListener('DOMContentLoaded', async () => {
    const baseURL = 'https://api.sportmonks.com/v3/football/'
    const apiToken = 'OPYT85RqlYZMUrcBDn4xvkSfa8bXHN2ITuEQpH1GLJQNw6D52mkB4joVSvBy'
    const teamDetailsContainer = document.querySelector('#team-details-container')

    //teamID name in url
    const urlParams = new URLSearchParams(window.location.search)
    const teamID= urlParams.get('teamID')

    const teamLogo = document.querySelector('#team-logo')
    const teamName = document.querySelector('#team-name')
    const teamStadium = document.querySelector('#team-stadium')
    const teamLocation = document.querySelector('#team-location')

    const detailedResponse = await axios.get(`${baseURL}teams/${teamID}?api_token=${apiToken}&include=players;country;venue;statistics;latest;`)
    const detailedTeamData = detailedResponse.data.data

    //Team information
    teamLogo.src = detailedTeamData.image_path
    const name = detailedTeamData.name
    teamName.innerHTML = name
    const stadium = detailedTeamData.venue.name
    teamStadium.innerHTML = stadium
    const city = detailedTeamData.venue.city_name
    const country = detailedTeamData.country.name
    teamLocation.innerHTML = `${city}, ${country}`

    console.log('Detailed Team Information:', detailedTeamData)

//getting data for each player
    const players = detailedTeamData.players
    const playersContainer = document.querySelector('#individual-team-container')
            
    //if players variable is there and it is an array, then look at data
    if (players && Array.isArray(players)) {
        const getPlayerInfo = async (playerID) => {
            const playerResponse = await axios.get(`${baseURL}players/${playerID}?api_token=${apiToken}&include=position;detailedPosition;statistics;latest;teams;`)
            const playerData = playerResponse.data.data

            const playerSection = document.createElement('section')
            playerSection.classList.add('player-container')

            const playerImage = document.createElement('img')
            playerImage.classList.add('player-image')
            playerImage.alt = 'Player Image'
            playerImage.src = playerData.image_path

            const playerName = document.createElement('h3')
            playerName.classList.add('player-name')
            playerName.innerText = playerData.display_name

            const jerseyNumber = document.createElement('h3')
            jerseyNumber.classList.add('jersey-number')
            const jerseyNumberValue = playerData.statistics[0].jersey_number

            //check if jersey_number is not null and a valid number.
            //make null responses "n/a"
            if (jerseyNumberValue !== null && !isNaN(jerseyNumberValue)) {
                jerseyNumber.innerText = `#${jerseyNumberValue}`
            } else {
                jerseyNumber.innerText = 'n/a'
            }
            
            //create elements and append to section
            const positionName = document.createElement('h3')
            positionName.classList.add('position-name')
            const positionNameParts = playerData.position.name.split('')
            const firstName = positionNameParts[0]
            positionName.innerText = firstName

            playerSection.appendChild(playerImage)
            playerSection.appendChild(playerName)
            playerSection.appendChild(jerseyNumber)
            playerSection.appendChild(positionName)

            playersContainer.appendChild(playerSection)
            

            console.log(playerData)
            console.log(`Player ID: ${playerID}, Player Name: ${playerName}, Image: ${playerImage}, Jersey Number: ${jerseyNumber} Position: ${positionName}`)
        } 
        for (const player of players) {
            await getPlayerInfo(player.player_id)
        }
    } 
})