const API_TOKEN = "0750c9ae-87ea-4916-b65c-7de0ffc9f69a";

$("#hostile-mobs-form").on("submit", function(event) {
    event.preventDefault();
    const mobName = $("#hostile-mobs-input").val();

    fetch('http://vps-f1e41b99.vps.ovh.ca:3001/api/minecraft/hostile-mobs', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function (data) {
        const mobObject = JSON.parse(data);

        for (const mob of mobObject) {
            if (mob.name === mobName) {
                displayHostileMobData(mob);
            }
        }
    });
});

function displayHostileMobData(mob) {
    console.log(mob);
    const hostileMobSectionEl = $("#hostile-mob-data");

    hostileMobSectionEl.removeClass("hidden");
    hostileMobSectionEl.html(`
        <div class="bg-slate-100 bg-opacity-50 rounded-lg p-2 text-black">
            <ul>
                <p>Name: ${mob.name}</p>
                <p>Health: ${mob.health}</p>
                <p>Attack Damage: ${mob.attack_damage}</p>
                <p>Description: "${mob.description}"</p>
            </ul>
        </div>
    `);
}


$("#passive-mobs-form").on("submit", function(event) {
    event.preventDefault();
    const mobName = $("#passive-mobs-input").val();

  
    fetch('http://vps-f1e41b99.vps.ovh.ca:3001/api/minecraft/passive-mobs', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function (data) {
        const mobObject = JSON.parse(data);

        for (const mob of mobObject) {
            if (mob.name === mobName) {
                displayPassiveMobData(mob);
            }
        }
    });
});

function displayPassiveMobData(mob) {
    console.log(mob);
    const passiveMobSectionEl = $("#passive-mob-data");

    passiveMobSectionEl.removeClass("hidden");
    passiveMobSectionEl.html(`
        <div class="bg-slate-100 bg-opacity-50 rounded-lg p-2 text-black">
            <ul>
                <p>Name: ${mob.name}</p>
                <p>Health: ${mob.health}</p>
                <p>Attack Damage: ${mob.attack_damage}</p>
                <p>Description: "${mob.description}"</p>
            </ul>
        </div>
    `);
}