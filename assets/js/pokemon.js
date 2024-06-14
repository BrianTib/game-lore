// capitalizeFirstLetter function
// this function capitalizes the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1); // capitalize the first letter of the string
}

$(document).ready(function() {
    // setupCollapsible function
    // this function sets up the collapsible sections
    function setupCollapsible() {
        $(".collapsible").on("click", function() {
            $(this).toggleClass("active");
            const content = $(this).next();
            if (content.css("display") === "block") {
                content.css("display", "none");
            } else {
                // close a collapsible section when another is clicked
                $(".content").css("display", "none");
                content.css("display", "block");
            }
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
            ab: $("#group-ab"),
            cd: $("#group-cd"),
            eg: $("#group-eg"),
            hj: $("#group-hj"),
            km: $("#group-km"),
            np: $("#group-np"),
            qs: $("#group-qs"),
            tv: $("#group-tv"),
            wz: $("#group-wz"),
        };

        const groupedPokemon = {
            ab: [],
            cd: [],
            eg: [],
            hj: [],
            km: [],
            np: [],
            qs: [],
            tv: [],
            wz: [],
        };
        
        // populate the collapsible sections with the Pokémon names
        pokemonList.forEach(pokemonName => {
            const name = capitalizeFirstLetter(pokemonName.name);

            if (name.match(/^[A-Ba-b]/)) groupedPokemon.ab.push(name);
            else if (name.match(/^[C-Dc-d]/)) groupedPokemon.cd.push(name);
            else if (name.match(/^[E-Ge-g]/)) groupedPokemon.eg.push(name);
            else if (name.match(/^[H-Jh-j]/)) groupedPokemon.hj.push(name);
            else if (name.match(/^[K-Mk-m]/)) groupedPokemon.km.push(name);
            else if (name.match(/^[N-Pn-p]/)) groupedPokemon.np.push(name);
            else if (name.match(/^[Q-Sq-s]/)) groupedPokemon.qs.push(name);
            else if (name.match(/^[T-Vt-v]/)) groupedPokemon.tv.push(name);
            else if (name.match(/^[W-Zw-z]/)) groupedPokemon.wz.push(name);
        });

        // sort the groupedPokemon arrays and append to the groups
        Object.keys(groupedPokemon).forEach(groupKey => {
            groupedPokemon[groupKey].sort().forEach(name => {
                const pElement = $("<p>")
                    .attr("id", "collapsible-search")
                    .addClass("pokemon-link")
                    .text(name)
                    .on("click", function() {
                        // Close the collapsible section when a p element is clicked
                        const content = $(this).parent();
                        content.css("display", "none");
                        content.prev().removeClass("active");
                    });
                groups[groupKey].append(pElement);
            });
        });
    }

    // initialize collapsible sections and populate Pokémon names
    setupCollapsible();
    populatePokemonNames();
});

// fetchAbilityDescription function
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
        const name = $("#pokemon-name").val().toLowerCase(); // convert search input to lowercase
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
        const searchHeaderEl = $("#search-result-header");
        searchHeaderEl.text(`Search result for ${pokemonName}:`);
        searchHeaderEl.css("display", "block");

        // set and display the pokemon id
        const idEl = $("#pokemon-id");
        const idValueEl = $("#pokemon-id-value");
        idValueEl.text(pokemonId);
        idEl.css("display", "block");

        // set and display the pokemon name
        const nameEl = $("#pokemon-name-display");
        const nameValueEl = $("#pokemon-name-value");
        nameValueEl.text(pokemonName);
        nameEl.css("display", "block");
        
        // set and display the pokemon sprite
        const spriteEl = $("#pokemon-sprite");
        spriteEl.attr("src", pokemonSprite);
        spriteEl.css("display", "block");

        // set and display the pokemon type
        const typeEl = $("#pokemon-type");
        const typeValueEl = $("#pokemon-type-value");
        typeValueEl.text(pokemonType);
        typeEl.css("display", "block");

        // fetch and display the flavor text
        const flavorTexts = await fetchFlavorText(name);
        const flavorTextEl = $("#pokemon-flavor-text");
        const flavorTextValueEl = $("#pokemon-flavor-text-value");
        flavorTextValueEl.html(flavorTexts.map(text => `<p>${text}</p>`).join(''));
        flavorTextEl.css("display", "block");

        // set and display the pokemon stats
        const statsEl = $("#pokemon-stats");
        const statsValueEl = $("#pokemon-stats-value");
        statsValueEl.text(pokemonStats);
        statsEl.css("display", "block");

        // set and display the pokemon height
        const heightEl = $("#pokemon-height");
        const heightValueEl = $("#pokemon-height-value");
        heightValueEl.text(pokemonHeight + " m");
        heightEl.css("display", "block");

        // set and display the pokemon weight
        const weightEl = $("#pokemon-weight");
        const weightValueEl = $("#pokemon-weight-value");
        weightValueEl.text(pokemonWeight + " kg");
        weightEl.css("display", "block");

        // set and display the pokemon abilities
        const abilitiesEl = $("#pokemon-abilities");
        const abilitiesValueEl = $("#pokemon-abilities-value");
        abilitiesValueEl.text(pokemonAbilities);
        abilitiesEl.css("display", "block");

        // set and display the pokemon hidden abilities
        const hiddenAbilitiesEl = $("#pokemon-hidden-abilities");
        const hiddenAbilitiesValueEl = $("#pokemon-hidden-abilities-value");
        hiddenAbilitiesValueEl.text(pokemonHiddenAbilities);
        hiddenAbilitiesEl.css("display", "block");

        // fetch and display the game versions
        // if no game versions are found, display "No game versions found."
        const gameVersions = await fetchPokemonGameVersions(name);
        const gameVersionsEl = $("#pokemon-versions");
        const gameVersionsValueEl = $("#pokemon-versions-value");
        gameVersionsValueEl.text(gameVersions.length > 0 ? gameVersions.join(', ') : "No game versions found.");
        gameVersionsEl.css("display", "block");
        

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
        const evolutionEl = $("#pokemon-evolution");
        const evolutionValueEl = $("#pokemon-evolution-value");
        // set and display the pokemon evolution chain with links
        evolutionValueEl.html(evolutionChain.map(name => `<a href="#" class="pokemon-link">${capitalizeFirstLetter(name)}</a>`).join(' -> ')); // display the evolution chain names as links
        evolutionEl.css("display", "block");
    }
    // catch any errors
    catch (error) {
        console.log(error); // log the error to the console
    }
};

// delegation for dynamic links on collapsible sections
$(document).on("click", "#collapsible-search", function(event) {
    const pokemonName = $(this).text().toLowerCase();
    $("#pokemon-name").val(pokemonName);
    fetchPokemon(event);
});

// delegation for dynamic links on evolution chain
$("#pokemon-evolution-value").on("click", ".pokemon-link", function(event) {
    const pokemonName = $(this).text().toLowerCase();
    $("#pokemon-name").val(pokemonName);
    fetchPokemon(event);
});

// add an event listener to the search button
$("#search-button").on("click", fetchPokemon); // when the search button is clicked, call the fetchPokemon function
