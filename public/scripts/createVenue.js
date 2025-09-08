
const form = document.getElementById('venue-form');

form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const name = form.name.value.toUpperCase();
    const locate = form.location.value.toUpperCase();
    const capacity = form.capacity.value;
    const active = true;

    const responses = await fetch('/admin/venues' , {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({name , location : locate , capacity , active})
    })

    const data = await responses.json();

    if(data.error){
        alert(data.error)
    }

    if(data.success){
        location.assign('/admin')
    }

})