

const form = document.querySelector('form');


form.addEventListener('submit' , async (e) => {

    e.preventDefault();

    const oldPassword  = form.old.value;
    const newPassword = form.new.value;
    const isCorrect = newPassword === form.confirm.value;

    if(!isCorrect){
        return alert('Please enter your new password again');
    }


    try{

        const response = await fetch('/user', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({oldPassword , newPassword})
        })

        const data = await response.json();
        console.log(data)
        
        if(data.error){
            alert(data.error);
        }

        if(data.success){
            location.assign('/')

        }

    }catch(err){

        console.log(err);
    }
})