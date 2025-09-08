const motherCard = document.querySelector('.grid')
import { createCard , createDivButton , createDivHeader , createDivMiddle } from "./createCard.js";

motherCard.addEventListener('click', async (e) => {
    if (e.target.classList.contains('disable-btn')) {

        const active = false;

        await getResponse(active, e);
        await renderData();
    }

    if (e.target.classList.contains('active-btn')) {

        const active = true

        await getResponse(active, e);
        await renderData();
    }
});

async function renderData(){

    const responses = await fetch('/api/venues');
    const venues = await responses.json();
        
    motherCard.innerHTML = "";

    venues.allVenue.forEach( venue => {

        const divHead = createDivHeader(venue.name , venue.active);
        const divMiddle = createDivMiddle(venue.location , venue.capacity);
        const divButton = createDivButton();

        const card = createCard(divHead , divMiddle , divButton , venue._id);
        motherCard.appendChild(card);

    })
        



}


async function getResponse(active , e){

    const card = e.target.closest('.card');
    const venueId = card.dataset.venueId;

    const responses = await fetch(`/admin/venues/${venueId}` , {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({active})
    })

    const data = await responses.json();

    return data;
    
}