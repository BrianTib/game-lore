// fetchPokemon function
// this function fetches the pokemon data from the API and displays the pokemon sprite on the page
async function fetchPokemon(event) {
    event.preventDefault(); // prevent the default form submission
    
    try {
        const name = document.getElementById("pokemon-name").value.toLowerCase(); // convert search input to lowercase
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // fetch the searched pokemon data from the API

        // check if the response is ok
        if (!response.ok) {
            throw new Error("Network response was not ok"); // throw an error if the response is not ok
        }

        const data = await response.json(); // convert the response to JSON

        console.log(data); // log the data to the console
        
        // get pokemon name, id, and sprite from the data
        const pokemonName = data.name; // get the pokemon name from the data
        const pokemonId = data.id; // get the pokemon id from the data
        const pokemonSprite = data.sprites.front_default; // get the pokemon sprite from the data

        // set and display the pokemon name
        const nameEl = document.getElementById("pokemon-name-display"); // get the name element
        const nameValueEl = document.getElementById("pokemon-name-value"); // get the name value element
        nameValueEl.textContent = pokemonName; // set the name value element text content to the pokemon name
        nameEl.style.display = "block"; // display the name element

        // set and display the pokemon id
        const idEl = document.getElementById("pokemon-id"); // get the id element
        const idValueEl = document.getElementById("pokemon-id-value"); // get the id value element
        idValueEl.textContent = pokemonId; // set the id value element text content to the pokemon id
        idEl.style.display = "block"; // display the id element
        
        // set and display the pokemon sprite
        const spriteEl = document.getElementById("pokemon-sprite"); // get the sprite element
        spriteEl.src = pokemonSprite; // set the sprite element src to the pokemon sprite
        spriteEl.style.display = "block"; // display the sprite element
    }
    // catch any errors
    catch (error) {
        console.log(error); // log the error to the console
    }
};

// add an event listener to the search button
document.getElementById("search-button").addEventListener("click", fetchPokemon); // when the search button is clicked, call the fetchPokemon function
