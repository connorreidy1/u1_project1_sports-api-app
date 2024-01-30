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
    const scheduleContainer = document.querySelector('#schedule-container')
    const leagueID = '501'

    const urlParams = new URLSearchParams(window.location.search)
    const fixtureID= urlParams.get('fixtureID')

    
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

    //get venue name

    const getVenueDetails = async (venueID) => {
        const venueResponse = await axios.get(`${baseURL}venues/${venueID}?api_token=${apiToken}`)
        const venueData = venueResponse.data.data
        return venueData.name
    }

    const fixtureDate = document.querySelector('#fixture-date')
    //loop through each fixture for venue
    for (const fixture of fixtureData.today) {
        const venueName = await getVenueDetails(fixture.venue_id)

        const fixtureContainerDiv = document.createElement('div')
        fixtureContainerDiv.classList.add('fixture-container')

        //separate div for fixtureName
        const fixtureNameDiv = document.createElement('div')
        fixtureNameDiv.classList.add('fixture-name-container')

        const fixtureName = document.createElement('h3')
        fixtureName.innerHTML = fixture.name

        //separate div for date, time, and venueName
        const fixtureDetailsDiv = document.createElement('div')
        fixtureDetailsDiv.classList.add('fixture-details-container')

        fixtureDate.innerHTML = `${formatDate(fixture.starting_at)}`

        const fixtureTime = document.createElement('h4')
        fixtureTime.classList.add('fixture-time')
        fixtureTime.innerHTML = `${formatTime(fixture.starting_at)}`

        const venueNameElement = document.createElement('h4')
        venueNameElement.classList.add('venue-name')
        venueNameElement.innerHTML = venueName

        fixtureNameDiv.appendChild(fixtureName)

        fixtureDetailsDiv.appendChild(venueNameElement)
        fixtureDetailsDiv.appendChild(fixtureTime)

        fixtureContainerDiv.appendChild(fixtureNameDiv)
        fixtureContainerDiv.appendChild(fixtureDetailsDiv)

        scheduleContainer.appendChild(fixtureContainerDiv)
    }

  
})