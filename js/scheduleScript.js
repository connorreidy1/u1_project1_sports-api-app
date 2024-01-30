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
    const teamDetailsContainer = document.querySelector('#schedule-container')
    const leagueID = '501'

    const urlParams = new URLSearchParams(window.location.search)
    const fixtureID= urlParams.get('fixtureID')

    const fixture1Name = document.querySelector('#fixture1-name')
    const fixture1Start= document.querySelector('#fixure1-start')
    const venue1Name = document.querySelector('#venue1-name')
    const fixture2Name = document.querySelector('#fixture2-name')
    const fixture2Start= document.querySelector('#fixure2-start')
    const venue2Name = document.querySelector('#venue2-name')
    
    const response = await axios.get(`${baseURL}leagues/${leagueID}?api_token=${apiToken}&include=today`)
    const fixtureData = response.data.data

    console.log(fixtureData)
    //Fixture information
    fixture1Name.innerHTML = fixtureData.today[0].name
    fixture1Start.innerHTML = fixtureData.today[0].starting_at
    fixture2Name.innerHTML = fixtureData.today[1].name
    fixture2Start.innerHTML = fixtureData.today[1].starting_at

    // teamLogo.src = detailedTeamData.image_path
    // const name = detailedTeamData.name
    // teamName.innerHTML = name
    // const stadium = detailedTeamData.venue.name
    // teamStadium.innerHTML = stadium
    // const city = detailedTeamData.venue.city_name
    // const country = detailedTeamData.country.name
    // teamLocation.innerHTML = `${city}, ${country}`
})