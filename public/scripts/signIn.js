const form = document.querySelector('form');
const errorbox = document.querySelector('.error-box');


form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    errorbox.innerHTML = "";

    const email = form.email.value;
    const password = form.password.value;


    const response = await fetch('/login' , {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify({email  , password})
    })

    const data = await response.json();


    if(data.error){
        errorbox.style.display = 'block';
        errorbox.textContent = data.error;
    }

    if(data.success){
        location.assign('/')
    }

})