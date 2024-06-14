// capitalizeFirstLetter function
// this function capitalizes the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1); // capitalize the first letter of the string
}

document.addEventListener("DOMContentLoaded", function() {
    // setupCollapsible function
    // this function sets up the collapsible sections
    function setupCollapsible() {
        const collapsibles = document.querySelectorAll(".collapsible");
        collapsibles.forEach(collapsible => {
            collapsible.addEventListener("click", function() {
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    // close a collapsible section when another is clicked
                    document.querySelectorAll(".content").forEach(otherContent => {
                        otherContent.style.display = "none";
                    });
                    content.style.display = "block";
                }
            });
        });
    }

    // populatePokemonNames function
    // this function fetches the pokemon names from the API and populates the collapsible sections with the names
    async function populatePokemonNames() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await response.json();
        const pokemonList = data.results;

        // group the Pokémon names by the first letter of their name
        const groups = {
            ab: document.getElementById("group-ab"),
            cd: document.getElementById("group-cd"),
            eg: document.getElementById("group-eg"),
            hj: document.getElementById("group-hj"),
            km: document.getElementById("group-km"),
            np: document.getElementById("group-np"),
            qs: document.getElementById("group-qs"),
            tv: document.getElementById("group-tv"),
            wz: document.getElementById("group-wz"),
        };

        // populate the collapsible sections with the Pokémon names
        pokemonList.forEach(pokemonName => {
            const name = capitalizeFirstLetter(pokemonName.name);
            let group;
            if (name.match(/^[A-Ba-b]/)) group = groups.ab;
            else if (name.match(/^[C-Dc-d]/)) group = groups.cd;
            else if (name.match(/^[E-Ge-g]/)) group = groups.eg;
            else if (name.match(/^[H-Jh-j]/)) group = groups.hj;
            else if (name.match(/^[K-Mk-m]/)) group = groups.km;
            else if (name.match(/^[N-Pn-p]/)) group = groups.np;
            else if (name.match(/^[Q-Sq-s]/)) group = groups.qs;
            else if (name.match(/^[T-Vt-v]/)) group = groups.tv;
            else if (name.match(/^[W-Zw-z]/)) group = groups.wz;

            const pElement = document.createElement("p");
            pElement.setAttribute("id", "collapsible-search");
            pElement.classList.add("pokemon-link");
            pElement.textContent = name;
            pElement.addEventListener("click", function() {
                // Close the collapsible section when a p element is clicked
                const content = this.parentElement;
                content.style.display = "none";
                content.previousElementSibling.classList.remove("active");
            });
            group.appendChild(pElement);
        });
    }

    // initialize collapsible sections and populate Pokémon names
    setupCollapsible();
    populatePokemonNames();
});

// fetchAbilityDescriotion function
async function fetchAbilityDescription(url) {
    const response = await fetch(url);

    // check if the response is ok
    if (!response.ok) {
        throw new Error("Ability network response was not ok");
    }

    const data = await response.json(); // convert the response to JSON
    // english description
    const descriptionEntry = data.effect_entries.find(entry => entry.language.name === "en");

    // return the effect of the ability or "No description available." if the effect is not found
    return descriptionEntry ? descriptionEntry.effect : "No description available.";
}

// fetchPokemonGameVersions function
async function fetchPokemonGameVersions(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    
    const response = await fetch(url);
    
    // check if the response is ok
    if (!response.ok) {
        throw new Error(`Error: Unable to fetch data for ${pokemonName}`);
    }
    
    const data = await response.json(); // convert the response to JSON
    const gameIndices = data.game_indices || [];
    
    // return version names
    const gameVersions = gameIndices.map(index => capitalizeFirstLetter(index.version.name));
    return gameVersions;
}

// getFlavorText function
async function fetchFlavorText(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Error: Unable to fetch flavor text for ${pokemonName}`);
    }
    
    const data = await response.json();

    const flavorTextEntries = data.flavor_text_entries.filter(entry => entry.language.name === "en").slice(0, 1);
    
    // return flavor text
    const flavorTexts = flavorTextEntries.map(entry => entry.flavor_text.replace(/\n|\f/g, ' '));
    return flavorTexts;
}

// fetchEvolutionChain function
// function to fetch the evolution chain names
function fetchEvolutionChain(chain) {
    let evolutions = [];
    let current = chain; // set the current chain to the chain

    while (current) {
        evolutions.push(current.species.name); // push the current species name to the evolutions array
        if (current.evolves_to.length > 0) {
            current = current.evolves_to[0];
        } else {
            current = null;
        }
    }
    return evolutions;
}

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
        
        // get pokemon details from data
        const pokemonName = capitalizeFirstLetter(data.name); // get the pokemon name from the data
        const pokemonId = data.id; // get the pokemon id from the data
        const pokemonSprite = data.sprites.front_default; // get the pokemon sprite from the data
        const pokemonType = data.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name)).join(', ');
        const pokemonStats = data.stats.map(statInfo => `${capitalizeFirstLetter(statInfo.stat.name)}: ${statInfo.base_stat}`).join(', ');
        const pokemonHeight = data.height / 10; // height in meters, originally in decimeters
        const pokemonWeight = data.weight / 10; // weight in kilograms, originally in hectograms

        // fetch ability descriptions
        const abilityDescrip = await Promise.all(data.abilities.map(async abilityInfo => {

            const name = capitalizeFirstLetter(abilityInfo.ability.name); // get the ability name from the ability info
            const description = await fetchAbilityDescription(abilityInfo.ability.url); // get the ability description from the ability info

            return `${name} - ${description}`; // return the ability name and description
        }));

        // filter abilities to display the description 
        const pokemonAbilities = abilityDescrip.filter((_, index) => !data.abilities[index].is_hidden).join(', ');
        // filter hidden abilities to display the description
        const pokemonHiddenAbilities = abilityDescrip.filter((_, index) => data.abilities[index].is_hidden).join(', ');

        // display the search result header
        const searchHeaderEl = document.getElementById("search-result-header");
        searchHeaderEl.textContent = `Search result for ${pokemonName}:`;
        searchHeaderEl.style.display = "block";

        // set and display the pokemon id
        const idEl = document.getElementById("pokemon-id");
        const idValueEl = document.getElementById("pokemon-id-value");
        idValueEl.textContent = pokemonId;
        idEl.style.display = "block";

        // set and display the pokemon name
        const nameEl = document.getElementById("pokemon-name-display");
        const nameValueEl = document.getElementById("pokemon-name-value");
        nameValueEl.textContent = pokemonName;
        nameEl.style.display = "block";
        
        // set and display the pokemon sprite
        const spriteEl = document.getElementById("pokemon-sprite");
        spriteEl.src = pokemonSprite;
        spriteEl.style.display = "block";

        // set and display the pokemon type
        const typeEl = document.getElementById("pokemon-type");
        const typeValueEl = document.getElementById("pokemon-type-value");
        typeValueEl.textContent = pokemonType;
        typeEl.style.display = "block";

        // fetch and display the flavor text
        const flavorTexts = await fetchFlavorText(name);
        const flavorTextEl = document.getElementById("pokemon-flavor-text");
        const flavorTextValueEl = document.getElementById("pokemon-flavor-text-value");
        flavorTextValueEl.innerHTML = flavorTexts.map(text => `<p>${text}</p>`).join('');
        flavorTextEl.style.display = "block";

        // set and display the pokemon stats
        const statsEl = document.getElementById("pokemon-stats");
        const statsValueEl = document.getElementById("pokemon-stats-value");
        statsValueEl.textContent = pokemonStats;
        statsEl.style.display = "block";

        // set and display the pokemon height
        const heightEl = document.getElementById("pokemon-height");
        const heightValueEl = document.getElementById("pokemon-height-value");
        heightValueEl.textContent = pokemonHeight + " m";
        heightEl.style.display = "block";

        // set and display the pokemon weight
        const weightEl = document.getElementById("pokemon-weight");
        const weightValueEl = document.getElementById("pokemon-weight-value");
        weightValueEl.textContent = pokemonWeight + " kg";
        weightEl.style.display = "block";

        // set and display the pokemon abilities
        const abilitiesEl = document.getElementById("pokemon-abilities");
        const abilitiesValueEl = document.getElementById("pokemon-abilities-value");
        abilitiesValueEl.textContent = pokemonAbilities;
        abilitiesEl.style.display = "block";

        // set and display the pokemon hidden abilities
        const hiddenAbilitiesEl = document.getElementById("pokemon-hidden-abilities");
        const hiddenAbilitiesValueEl = document.getElementById("pokemon-hidden-abilities-value");
        hiddenAbilitiesValueEl.textContent = pokemonHiddenAbilities;
        hiddenAbilitiesEl.style.display = "block";

        // fetch and display the game versions
        const gameVersions = await fetchPokemonGameVersions(name);
        const gameVersionsEl = document.getElementById("pokemon-versions");
        const gameVersionsValueEl = document.getElementById("pokemon-versions-value");
        gameVersionsValueEl.textContent = gameVersions.join(', ');
        gameVersionsEl.style.display = "block";

        // fetch and display the pokemon evolution chain
        const speciesResponse = await fetch(data.species.url); // fetch the species data to get the evolution chain URL
        // check if the response is ok
        if (!speciesResponse.ok) {
            throw new Error("Species network response was not ok");
        }

        const speciesData = await speciesResponse.json(); // convert the response to JSON
        
        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url); // fetch the evolution chain data
        // check if the response is ok
        if (!evolutionChainResponse.ok) {
            throw new Error("Evolution chain network response was not ok");
        }

        const evolutionChainData = await evolutionChainResponse.json(); // convert the response to JSON
        const evolutionChain = fetchEvolutionChain(evolutionChainData.chain); // get the evolution chain names
        const evolutionEl = document.getElementById("pokemon-evolution");
        const evolutionValueEl = document.getElementById("pokemon-evolution-value");
        // set and display the pokemon evolution chain with links
        evolutionValueEl.innerHTML = evolutionChain.map(name => `<a href="#" class="pokemon-link">${capitalizeFirstLetter(name)}</a>`).join(' -> '); // display the evolution chain names as links
        evolutionEl.style.display = "block";
    }
    // catch any errors
    catch (error) {
        console.log(error); // log the error to the console
    }
};

// delegation for dynamic links on collapsible sections
document.addEventListener("click", function(event) {
    // check if the clicked element is a collapsible search link
    if (event.target.id === "collapsible-search") {
        const pokemonName = event.target.textContent.toLowerCase();
        document.getElementById("pokemon-name").value = pokemonName;
        fetchPokemon(event);
    }
});

// delegation for dynamic links on evolution chain
document.getElementById("pokemon-evolution-value").addEventListener("click", function(event) {
    // check if the clicked element is a pokemon link
    if (event.target.classList.contains("pokemon-link")) {
        const pokemonName = event.target.textContent.toLowerCase();
        document.getElementById("pokemon-name").value = pokemonName;
        fetchPokemon(event);
    }
});

// add an event listener to the search button
document.getElementById("search-button").addEventListener("click", fetchPokemon); // when the search button is clicked, call the fetchPokemon function
