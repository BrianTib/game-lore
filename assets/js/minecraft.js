fetch('http://vps-f1e41b99.vps.ovh.ca:3001/api/minecraft/hostile-mobs', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${API_TOKEN}`
    }
    
});

fetch('http://vps-f1e41b99.vps.ovh.ca:3001/api/minecraft/passive-mobs', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${API_TOKEN}`
    }
});



