const API_TOKEN = '0750c9ae-87ea-4916-b65c-7de0ffc9f69a';
const CACHE_AGE = 5 * 60 * 1000; // 5 minutes

async function testRequest() {
    const request = await fetch('http://localhost:3000/api/valorant/agents', {
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
    //testRequest();
});