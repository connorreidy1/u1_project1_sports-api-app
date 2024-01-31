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
    const dateRange = '2024-01-29/2024-02-04'

    const urlParams = new URLSearchParams(window.location.search)

    
    // const response = await axios.get(`${baseURL}fixtures/between/${dateRange}?api_token=${apiToken}&include=participants;venue`)
    // const fixtureData = response.data.data

    //Define start date
    const startDate = new Date('2024-01-29')
    const numberofRanges = 5

    //create date ranges in 7 day increments
    const dateRanges = Array.from({length: numberofRanges}, (_, index) => {
        const start = new Date(startDate)
        start.setDate(startDate.getDate() + index * 7)
        const end = new Date(start)
        end.setDate(start.getDate() + 7)
        return `${start.toISOString().split('T')[0]}/${end.toISOString().split('T')[0]}`
    })

    //function to get fixtures for a date range
    const getFixturesForDateRange = async (dateRange) => {
        const response = await axios.get(`${baseURL}fixtures/between/${dateRange}?api_token=${apiToken}&include=participants;venue`);
    const fixtureData = response.data.data;

    console.log("Fixture Data:", fixtureData); 

    fixtureData.forEach((fixture) => {
        renderFixtureDetails(fixture);
        })
    }
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

    //Get fixture details
    function renderFixtureDetails(fixture) {
        const fixtureName = fixture.name
        const participant1Img = fixture.participants[0].image_path
        const participant2Img = fixture.participants[1].image_path
        const fixtureDate = `${formatDate(fixture.starting_at)}`
        const fixtureTime = `${formatTime(fixture.starting_at)}`
        const venueName = fixture.venue.name
        
        //FixtureContainer
        const fixtureContainer = document.createElement('div')
        fixtureContainer.classList.add('fixture-container')

        //Participants Container
        const participantsContainer = document.createElement('div')
        participantsContainer.classList.add('participants-container')

        const participant1ImgElement = document.createElement('img')
        participant1ImgElement.classList.add('participant1-logo')
        participant1ImgElement.src = participant1Img

        const fixtureNameElement = document.createElement('h3')
        fixtureNameElement.classList.add('fixture-name')
        fixtureNameElement.textContent = fixtureName

        const participant2ImgElement = document.createElement('img')
        participant2ImgElement.classList.add('participant2-logo')
        participant2ImgElement.src = participant2Img
        
        //Details Container
        const detailsContainer = document.createElement('div')
        detailsContainer.classList.add('details-container')

        const fixtureDateElement = document.createElement('h4')
        fixtureDateElement.classList.add('fixture-date')
        fixtureDateElement.textContent = fixtureDate

        const fixtureTimeElement = document.createElement('h4')
        fixtureTimeElement.classList.add('fixture-time')
        fixtureTimeElement.textContent = fixtureTime

        const venueNameElement = document.createElement('h4')
        venueNameElement.classList.add('venue-name')
        venueNameElement.textContent = venueName
       
        
        //Append participants
        participantsContainer.appendChild(participant1ImgElement)
        participantsContainer.appendChild(fixtureNameElement)
        participantsContainer.appendChild(participant2ImgElement)
        //Append details
        detailsContainer.appendChild(fixtureDateElement)
        detailsContainer.appendChild(fixtureTimeElement)
        detailsContainer.appendChild(venueNameElement)

        //Append to fixtureContainer
        fixtureContainer.appendChild(participantsContainer)
        fixtureContainer.appendChild(detailsContainer)

        //Append to scheduleContainer
        scheduleContainer.appendChild(fixtureContainer)
        
    //   console.log(`${fixtureName}, ${participant1Img}, ${participant2Img}, ${fixtureDate}, ${fixtureTime}, ${venueName}`)
    }
    dateRanges.forEach(getFixturesForDateRange)
})
