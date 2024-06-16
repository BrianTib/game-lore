const API_TOKEN = 'MDc1MGM5YWUtODdlYS00OTE2LWI2NWMtN2RlMGZmYzlmNjlh';
const baseURL = 'http://vps-f1e41b99.vps.ovh.ca:3001/api/valorant';

// Dependencies
const agentNameMenu = $('#agent-info');
const agentNamesListContainer = $('#agent-name-dropdown');
const agentNamesListEl = agentNamesListContainer.find('ul');

async function getAgentNames() {
    // Check if we have the agents names cached
    const cachedAgents = getFromLocalStorage('agentNames');
    if (cachedAgents) { return cachedAgents; }

    // Get the agent names from the API
    const request = await fetch(baseURL + '/agents', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${atob(API_TOKEN)}`
        }
    });

    // If the request has failed, stop here
    if (!request.ok) { return; }
    const agents = await request.json();
    // Save the agent names to localStorage
    setLocalStorage('agentNames', agents, 20 * 60 * 1000);
    
    return agents;
}

async function getAgentData(agentName) {
    // Check if there is data about this agent in the cache
    const cachedAgent = getFromLocalStorage('agent_' + agentName);
    if (cachedAgent) { return cachedAgent; }

    // Get the agent names from the API
    const request = await fetch(baseURL + `/agents?agent=${agentName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${atob(API_TOKEN)}`
        }
    });

    // If the request has failed, stop here
    if (!request.ok) { return; }
    const agentData = await request.json();

    // Save the agent's data to localStorage
    setLocalStorage('agent_' + agentName, agentData, 30 * 60 * 1000);
    return agentData;
}

async function getRoleData(roleName) {
    // Check if there is data about this role in the cache
    const cachedRole = getFromLocalStorage('role_' + roleName);
    if (cachedRole) { return cachedRole; }

    console.log(baseURL + `/roles?role=${roleName}`);

    // Get the role names from the API
    const request = await fetch(baseURL + `/roles?role=${roleName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${atob(API_TOKEN)}`
        }
    });

    // If the request has failed, stop here
    if (!request.ok) { return; }
    const roleData = await request.json();

    // Save the role's data to localStorage
    setLocalStorage('role_' + roleName, roleData, 30 * 60 * 1000);
    return roleData;
}

async function updateAgentCardByName(agentName) {
    const agentData = await getAgentData(agentName);
    if (!agentData) { return; }

    const roleData = await getRoleData(agentData.role);
    if (!roleData) { return; }

    // Load the agent card so that we can get slightly
    // faster loading by looking inside the card
    // and not the entire DOM
    const agentCard = $('#agent-card');

    const [
        agentNameEl,
        agentArtworkEl,
        agentArtworkContainer,
        agentIconEl,
        agentRoleEl,
        agentRoleIconEl,
        agentCountryEl,
        agentNumberEl,
        agentVoiceActorEl,
        agentDescriptionEl,
    ] = [
        agentCard.find('#agent-name'),
        agentCard.find('#agent-artwork'),
        agentCard.find('#agent-artwork-container'),
        agentCard.find('#agent-icon'),
        agentCard.find('#agent-role'),
        agentCard.find('#agent-role-icon'),
        agentCard.find('#agent-country'),
        agentCard.find('#agent-number'),
        agentCard.find('#agent-voice-actor'),
        agentCard.find('#agent-description')
    ];

    // Update the card values
    agentNameEl.text(agentName);
    agentArtworkEl.attr('src', 'http://' + agentData.artwork);
    agentIconEl.attr('src', 'http://' + agentData.icon);
    agentRoleEl.text(agentData.role);
    agentRoleIconEl.attr('src', 'http://' + roleData.icon);
    agentCountryEl.text(agentData.origin);
    agentNumberEl.text('#' + agentData.number);
    agentVoiceActorEl.text(agentData.voiceActor);
    agentDescriptionEl.text(agentData.lore);

    // Update the color of the artwork holder
    agentArtworkContainer.attr('class', 
        "w-[300px] bg-gradient-to-b rounded-xl rounded-r-none " +
        `from-[${agentData.color}55] to-black/[0.4] border-2 border-solid ` +
        `border-[${agentData.color}] border-r-0`
    );
}

function agentSelectedFromDropdown() {
    const agentName = $(this).text().trim();
    if (!agentName) { return; }

    // Clicking the menu allows for the flowbite element's default behavior
    // of hiding the menu again
    agentNameMenu.trigger('click');
    updateAgentCardByName(agentName);
}

agentNamesListEl.on('click', 'li', agentSelectedFromDropdown);

$(document).ready(async () => {
    const agentNames = await getAgentNames();
    if (!agentNames) { return window.location.assign("index.html"); }
    
    agentNamesListEl.empty();

    for (const agentName of agentNames) {
        const agentNameItem = $(
            `<li class="block px-4 py-2 hover:bg-zinc-700">
                 ${agentName}
            </li>`
        );

        agentNamesListEl.append(agentNameItem);
    }

    // Set an initial value for the cards
    updateAgentCardByName(agentNames[0]);
});

/* UTILITY FUNCTIONS */
// Save data to localStorage using a TTL system
function setLocalStorage(key, value, ttl) {
    const data = {
        value: value,
        timestamp: Date.now(),
        // time-to-live in milliseconds
        ttl 
    };

    localStorage.setItem('valorant_' + key, JSON.stringify(data));
}

// Get data from localStorage using the ttl cache system
function getFromLocalStorage(key) {
    // Attempt to get the data from local storage
    const data = JSON.parse(localStorage.getItem('valorant_' + key));
    if (!data) { return null; }
    
    // If there is data...
    const currentTime = Date.now();
    const expiryTime = data.timestamp + data.ttl;

    // Check if the data hasn't expired
    // If it hasn't, return the data
    if (currentTime < expiryTime) { return data.value; }
    
    // Data has expired, remove it from localStorage
    localStorage.removeItem('valorant_' + key);
    return null;
}