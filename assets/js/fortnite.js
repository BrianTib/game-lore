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
    method: "GET",
    headers: {
      Authorization: apiKey
    }
   }) //replace with new api url
    .then((response)=> response.json())
    .then((data) => {
        //console.log(data.data.br.motds);
        const motds=data.data.br.motds;
        for (const messageOfTheDay of motds){
              //looking for specific news 
          generateCard(messageOfTheDay);
        }         
      }
    )}
  
function generateCard(data){
  console.log(data);

  const html = `
    <li class="flex bg-zinc-950 h-72 w-48 items-center border-2 border-green-600 rounded-lg max-w-xs overflow-hidden">
        <a href="#" class="group flex flex-col w-full h-full">
            <div class="relative w-full h-full">
                <img
                    class="object-cover w-full h-full group-hover:h-1/2 transition-all"
                    src="${data.tileImage}"
                    alt="Fortnite"
                >
                <div class="hidden absolute bottom-0 left-0 right-0 h-0 group-hover:flex group-hover:h-1/2 transition-all flex-col justify-between p-4 bg-zinc-950">
                    <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        ${data.title}
                    </h5>
                    <p class="mb-4 text-sm text-gray-400">
                        Build, explore, and survive in a blocky, procedurally generated world.
                    </p>
                </div>
            </div>
        </a>
    </li>`;
  
    const newsSearch=document.getElementById('news-search')
    newsSearch.innerHTML +=html
}

//newsSerach.innerhtml+=html


//           // Check if the request was successful
//           // if (response.ok) {
          //     // Retrieve the JSON information
          //     // we got from the request
          //     return response.json() {
                
        
      
      // If this next .then() executes, that means we got data from the API
//       .then((data) => {
//         console.log(data)
//           // Do something with the data
//       })
// }



function getMapDataFromAPI(){
  // fetch('') //replace with map api url
  //    .then((response) => {
  //        // Check if the request was successful
  //        if (response.ok) {
  //            // Retrieve the JSON information
  //            // we got from the request
  //            return response.json()
  //        }
  //    })
  //    // If this next .then() executes, that means we got data from the API
  //    .then((data) => {
  //        // Do something with the data
  //    })
}

function getStatsDataFromAPI(){
  // fetch('') //replace with own stat api url
  //    .then((response) => {
  //        // Check if the request was successful
  //        if (response.ok) {
  //            // Retrieve the JSON information
  //            // we got from the request
  //            return response.json()
  //        }
  //    })
  //    // If this next .then() executes, that means we got data from the API
  //    .then((data) => {
  //        // Do something with the data
  //    })
}


