
const form = document.querySelector('form');
const header = document.querySelector('.content-header');
const motherCard = document.querySelector('.content-container');


form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const date = form.date.value;
    const venueId = form.venue.value;

    const selectedIndex = document.getElementById('search-venue').selectedIndex;

    const venueName = form.venue[selectedIndex].textContent 
    createHeader(venueName , date);

    try{

        const responses = await fetch(`/api/check?venueId=${venueId}&date=${date}`);

        const data = await responses.json();
        motherCard.innerHTML = "";

        data.mappedSlot.forEach( data => {

            const isOccupied = data.occupied !== null;
            const div = createContent(data , isOccupied);

            motherCard.appendChild(div);
        })

    }catch(err){

        console.log(err);
    }
})


function createHeader(venue , date){

    header.innerHTML = "";

    const h2 = document.createElement('h2');
    h2.className = 'venue'
    h2.textContent = venue;

    const newDate = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const customDateString = newDate.toLocaleDateString('en-GB', options); // "23 September 2025"

    const p = document.createElement('p');
    p.className = 'date';
    p.textContent = customDateString;


    header.appendChild(h2);
    header.appendChild(p);
}

function createContent(slot , isOccupied){
    
    const div = document.createElement('div');
    div.className = 'content-card';
    
    const divTime = document.createElement('div');
    divTime.className = 'time-slot';

    const divPic = document.createElement('div');
    divPic.className = 'pic';

    const pTime = document.createElement('p');
    pTime.textContent = slot.time;

    const pPic = document.createElement('p');

    if(isOccupied){
        div.className += ' full';
        divTime.className += ' p-full';

        pPic.textContent = slot.occupied.userId.username;
    }else{
        div.className += ' null';
        divTime.className += ' p-null';

        pPic.textContent = 'Not Being Reserved/Used';

    }

    divTime.appendChild(pTime);
    divPic.appendChild(pPic);

    div.appendChild(divTime);
    div.appendChild(divPic);

    return div;
}