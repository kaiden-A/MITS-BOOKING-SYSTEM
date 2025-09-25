import logIn from "./utils/login.js";
const form = document.querySelector('form');
const errorbox = document.querySelector('.error-box');


form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    errorbox.innerHTML = "";

    const email = form.email.value;
    const password = form.password.value;
    const routes = '/login'

    const data = await logIn(routes , email , password);

    if(data.error){
        errorbox.style.display = 'block';
        errorbox.textContent = data.error;
    }

    if(data.success){
        location.assign('/')
    }

})