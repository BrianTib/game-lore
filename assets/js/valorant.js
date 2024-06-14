const API_TOKEN = '0750c9ae-87ea-4916-b65c-7de0ffc9f69a';
const CACHE_AGE = 5 * 60 * 1000; // 5 minutes

async function testRequest() {
    const request = await fetch('http://vps-f1e41b99.vps.ovh.ca:3001/api/minecraft/hostile-mobs', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });

    console.log(request.ok, request);
    const response = await request.json();
    console.log(response);
}

$(document).ready(() => {
    testRequest();
});