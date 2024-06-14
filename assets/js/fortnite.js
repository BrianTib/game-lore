//dependencies

// const mapButton=document.getElementById('map-search-btn')
// const statButton=document.getElementById('stat-search-btn')
const apiKey1 = 'cf9a481a-5823-4216-ba41-5deccd3e6556'
const apiKey2 = "293db903-eb94-4a7d-adba-85e9cc758ab3"

getNewsData()


// mapButton.addEventListener('click', handleMapButtonClick) 

// function handleMapButtonClick(event){
//   console.log('map button')
// }

// statButton.addEventListener('click', handleStatClick)

// function handleStatClick (event){
//   console.log('stat click')
// }

// check local storage for news data


function getNewsData() {

  const localData = checkLocalStorageForFreshNewsData()

  if (localData) {
    generateCards(localData)
  } else {
    fetchNewsAPIData()
  }

  
}


function fetchNewsAPIData() {
  fetch('https://fortnite-api.com/v2/news', {
    method: "GET",
    headers: {
      Authorization: apiKey2
    }
    }) //replace with new api url
    .then((response)=> {
      if (!response.ok) {
        return {
          data: {
            br: {
              motds: backupMOTDS
            }
          }
        }
      }
    })
    .then((data) => {
      //console.log(data.data.br.motds);
      const motds=data.data.br.motds;
          //looking for specific news
      saveNewsDataToLocalStorage(motds);
      generateCards(motds);
      
    })
}

/*
  {
    dateRetrieved: Date,
    motds: Data
  }
*/

function checkLocalStorageForFreshNewsData() {
  let newsData = localStorage.getItem('fortnite-news-data')
 
  if (!newsData) {
    return
  }

  newsData = JSON.parse(newsData)
  const newsDate = newsData.dateRetrieved
  

  if (Date.now() > newsDate + (24 * 60 * 60 * 1000)) {
    return
  }

  return newsData.motds

}

function saveNewsDataToLocalStorage(motds) {
  localStorage.setItem('fortnite-news-data', JSON.stringify({
    dateRetrieved: Date.now(),
    motds: motds
  }))
}
  
function generateCards(motds){
  let html = ''
  for (const motd of motds) {

    html += `
     <li class="flex bg-zinc-950 h-72 w-48 items-center border-2 border-green-600 rounded-lg max-w-xs overflow-hidden">
         <a href="#" class="group flex flex-col w-full h-full">
             <div class="relative w-full h-full">
                 <img
                     class="object-cover w-full h-full group-hover:h-1/2 transition-all"
                     src="${motd.tileImage}"
                     alt="Fortnite"
                 >
                 <div class="hidden absolute bottom-0 left-0 right-0 h-0 group-hover:flex group-hover:h-1/2 transition-all flex-col justify-between p-4 bg-zinc-950">
                     <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                         ${motd.title}
                     </h5>
                     <p class="mb-4 text-sm text-gray-400">
                         Build, explore, and survive in a blocky, procedurally generated world.
                     </p>
                 </div>
             </div>
         </a>
     </li>`;
  }

  
    const newsSearch=document.getElementById('news-container')
    newsSearch.innerHTML +=html
}






