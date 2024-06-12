


const APIKey=''

// Include the axios library
const axios = require('axios');

// Set the API endpoint and parameters
// const API_ENDPOINT = '';
// const headers = {
// 'TRN-Api-Key': 'code',
// };
// const username = 'Ninja';
// const platform = 'pc';

// // Make the request
// axios.get(${API_ENDPOINT}/${platform}/${username}, { headers })
// .then((response) => {
// const stats = response.data.lifeTimeStats;
// console.log(${username} has ${stats[7].value} total kills);
// })
// .catch((error) => {
// console.error(“errorrrrrr”, error);
// });


$('#search-btn').on('click', function (e) {
  e.preventDefault();
  const character = $('#character-input').val().trim();
  if (character) {
      saveToSearchHistory(character);
      fetchGeo(character);
      $('#character-input').val('');
  }
});


fetch('https://fortnite-api.com/v1/map', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });