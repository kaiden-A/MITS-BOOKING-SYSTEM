export function createCard(divHeader , divMiddle , divButton , id){

    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.dataset.venueId = id;

    divCard.appendChild(divHeader);
    divCard.appendChild(divMiddle);
    divCard.appendChild(divButton);

    return divCard;
}

export function createDivHeader(name , active){

    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const span = document.createElement('span');

    div.className = 'head-card';
    
    if(active){
        span.className = 'active';
        span.textContent = 'Active'
    }else{
        span.className = 'disable';
        span.textContent = 'Disable';
    }

    h2.textContent = name
    p.textContent = `Status : `;
    p.appendChild(span);

    div.appendChild(h2);
    div.appendChild(p);

    return div;
}

export function createDivMiddle(locate , capac){

    const div = document.createElement('div');
    const location = document.createElement('p');
    const capacity = document.createElement('p');

    div.className = 'location-capacity';
    location.className = 'location';
    capacity.className = 'capacity';


    location.textContent = `Location : ${locate}`;
    capacity.textContent = `Capacity : ${capac}`;

    div.appendChild(location);
    div.appendChild(capacity);

    return div;
}

export function createDivButton(){

    const div = document.createElement('div');
    const activeBtn = document.createElement('button');
    const disableBtn = document.createElement('button');

    div.className = 'all-button';
    activeBtn.className = 'active-btn';
    disableBtn.className = 'disable-btn';

    activeBtn.textContent = 'ACTIVATE';
    disableBtn.textContent  = 'DISABLED';

    div.appendChild(disableBtn);
    div.appendChild(activeBtn)
     
    return div;
}