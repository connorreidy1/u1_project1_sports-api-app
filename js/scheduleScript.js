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
    const fixture1Date= document.querySelector('#fixture1-date')
    const fixture1Time= document.querySelector('#fixture1-time')
    const venue1Name = document.querySelector('#venue1-name')
    const fixture2Name = document.querySelector('#fixture2-name')
    const fixture2Start= document.querySelector('#fixure2-start')
    const venue2Name = document.querySelector('#venue2-name')
    
    const response = await axios.get(`${baseURL}leagues/${leagueID}?api_token=${apiToken}&include=today`)
    const fixtureData = response.data.data


    //Format date and time
    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day:'numeric'}
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', options)
    }
    const formatTime = (timeString) => {
        const options = {hour: 'numeric', minute: 'numeric', hour12: false}
        const time = new Date(timeString)
        return time.toLocaleTimeString('en-US', options)
    }

  
    //Fixture information
    fixture1Name.innerHTML = fixtureData.today[0].name
    fixture1Date.innerHTML = `${formatDate(fixtureData.today[0].starting_at)}`
    fixture1Time.innerHTML = `${formatTime(fixtureData.today[0].starting_at)}`
    fixture2Name.innerHTML = fixtureData.today[1].name
    fixture2Start.innerHTML = `${formatDate(fixtureData.today[1].starting_at)} ${formatTime(fixtureData.today[1].starting_at)}`
})