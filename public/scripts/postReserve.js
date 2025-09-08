
const form = document.querySelector('form');


form.addEventListener('submit' , async (e) => {

    const slots = [];
    e.preventDefault();

    const venueId = form.venue.value;
    const date = form.date.value;
    const select = form.time;
    const reason = form.reason.value;

    for( let option of select.options){

        if(option.selected){
            slots.push(option.value);
        }
    }

    try{
        
        const responses = await fetch('/reservations' , {

            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({venueId , date , slots , reason})
        });

        const data = await responses.json();


        if(data.error){
            alert(data.error);
        }

        if(data.success){
            location.assign('/');
        }



    }catch(err){
        console.log(err);
    }

})