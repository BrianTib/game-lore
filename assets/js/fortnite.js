
const characterButton= document.getElementById('character-search-btn')
const mapButton=document.getElementById('map-search-btn')
const statButton=document.getElementById('stat-search-btn')

characterButton.addEventListener('click', handleCharacterButtonClick)

function handleCharacterButtonClick(event){
  console.log('character button')
}


mapButton.addEventListener('click', handleMapButtonClick)

function handleMapButtonClick(event){
  console.log('map button')
}

statButton.addEventListener('click', handleStatClick)

function handleStatClick (event){
  console.log('stat click')
}
// const apiKey =''


// $(document).ready(function() {
//   const apiKey = '';  //  get API key

//   // Function to fetch character facts
//   function fetchCharacterFacts(character) {
//       $.ajax({
//           url: `https://api.fortnitetracker.com/v1/profile/account/${character}`,
//           method: 'GET',
//           headers: {
//               'TRN-Api-Key': apiKey
//           },
//           success: function(data) {
//               console.log(data);
//               displayCharacterFacts(data);
//           }
//         })
//   }
//   })  