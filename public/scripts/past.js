
const form = document.getElementById('user-input-form');
const selection = document.getElementById('sort-selection');
const card = document.getElementById('mother');

form.addEventListener('submit' , async (e) => {

    e.preventDefault();
    
    const userInput = form.userInput.value.toUpperCase();
    const formated = userInput.replace(' ' , '%20');

    const sort = selection.value || 'date';

    console.log(formated)
    console.log(sort);


    try{

        const response = await fetch(`/api/bookings?venue=${formated}&status=past&sort=${sort}`);

        const data = await response.json();
        console.log(data);

        card.innerHTML = "";

        if(data.error){
            displayError(data.error)
        }

        if(data.venue.length === 0){

            displayError(`There's No Data For ${userInput}`)

        }else{
            data.venue.forEach(venue => {
                const div = createCard(venue)
                card.appendChild(div);
            })
        }

    }catch(err){

        console.log(err);
    }


})

function createCard(venue){

    const obj = [

        {class : "name", content : venue.name , element : 'p'},
        {class : "date", content : venue.date ,  element: 'p'},
        {class : "slot", content : venue.slot , element: 'p'},
        {class : 'divider' , content: null , element: 'hr'},
        {class : "teacher", content :`Supervisor : ${venue.user}` , element : 'p'},
        {class : "reason", content : `Reason : ${venue.reason}` , element : 'p'}
    ]

   const div = document.createElement('div');
   div.className = 'card';

    obj.forEach( (item , index) => {

        const p = document.createElement(item.element);
        p.className = item.class;
        p.textContent = item.content;

        div.appendChild(p);

    })

    return div
}

function displayError(content){

    const h1 = document.createElement('h1');
    h1.textContent = content;
    
    card.appendChild(h1);
    
}