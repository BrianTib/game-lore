//dependencies
const newsButton= document.getElementById('news-search-btn')
const mapButton=document.getElementById('map-search-btn')
const statButton=document.getElementById('stat-search-btn')
const apiKey ='cf9a481a-5823-4216-ba41-5deccd3e6556'


newsButton.addEventListener('click', handleNewsButtonClick)

function handleNewsButtonClick(event){
  getNewsDataFromAPI()
  console.log('News button')
}


mapButton.addEventListener('click', handleMapButtonClick) 

function handleMapButtonClick(event){
  console.log('map button')
}

statButton.addEventListener('click', handleStatClick)

function handleStatClick (event){
  console.log('stat click')
}

function getNewsDataFromAPI(){
   fetch('https://fortnite-api.com/v2/news', {
    headers: {
      Authorization: apiKey
    }
   }) //replace with new api url
      .then((response) => {
          // Check if the request was successful
          if (response.ok) {
              // Retrieve the JSON information
              // we got from the request
              return response.json()
          }
      })
      // If this next .then() executes, that means we got data from the API
      .then((data) => {
        console.log(data)
          // Do something with the data
      })
}

function getMapDataFromAPI(){
  fetch('') //replace with map api url
     .then((response) => {
         // Check if the request was successful
         if (response.ok) {
             // Retrieve the JSON information
             // we got from the request
             return response.json()
         }
     })
     // If this next .then() executes, that means we got data from the API
     .then((data) => {
         // Do something with the data
     })
}

function getStatsDataFromAPI(){
  fetch('') //replace with own stat api url
     .then((response) => {
         // Check if the request was successful
         if (response.ok) {
             // Retrieve the JSON information
             // we got from the request
             return response.json()
         }
     })
     // If this next .then() executes, that means we got data from the API
     .then((data) => {
         // Do something with the data
     })
}


