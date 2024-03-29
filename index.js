function getParks(stateCode, results) {
    const apiKey = 'SjvhrUMyYtndcXmAmaPBIl3DlaOl9ligOHOckRiU'; 
    fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${stateCode}&limit=${results}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#errorMessage').text(`Uh oh. Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.resultsList').empty();
    for (let i=0; i<responseJson.data.length; i++) {
        $('.resultsList').append(`
            <li><h3>Park Name: ${responseJson.data[i].fullName}</h3>
            <p>States: ${responseJson.data[i].states}</p>
            <p>Description: ${responseJson.data[i].description}</p>
            <p>Website URL: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
            </li>`)};

    $('section').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchPark = $('#parkSearch').val();
        const maxResults = $('#max-results').val();
        getParks(searchPark,maxResults);
    });
}

$(watchForm);