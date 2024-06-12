

const apiKey =''


$(document).ready(function() {
  const apiKey = '';  //  get API key

  // Function to fetch character facts
  function fetchCharacterFacts(character) {
      $.ajax({
          url: `https://api.fortnitetracker.com/v1/profile/account/${character}`,
          method: 'GET',
          headers: {
              'TRN-Api-Key': apiKey
          },
          success: function(data) {
              console.log(data);
              displayCharacterFacts(data);
          }
        })
  }
  })  