import { createDivMiddle , createCard , createDivButton , createDivHeader } from "./createCard.js";

const form = document.getElementById('user-input');
const motherCard = document.querySelector('.grid')

form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const userInput = form.name.value.toUpperCase();
    const formatted = userInput.replace(' ' , '%20');

    console.log(formatted)
    try{

        const responses = await fetch(`/api/venues?name=${formatted}`);
        const data = await responses.json();

        console.log(data);

        if(data.success){

            motherCard.innerHTML = "";
            const divHead = createDivHeader(data.success.name , data.success.active);
            const divMiddle = createDivMiddle(data.success.location , data.success.capacity);
            const divButton = createDivButton();

            const card = createCard(divHead , divMiddle , divButton , data.success._id);
            motherCard.appendChild(card);

        }

    }catch(err){
        console.log(err);
    }
})