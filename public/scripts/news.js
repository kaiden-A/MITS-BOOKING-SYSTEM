const form = document.querySelector('form');


form.addEventListener('submit' , async (e) =>{

    e.preventDefault();


    const title = form.title.value;
    const description = form.description.value;
    const category = 'booking';

    try{

        const responses = await fetch('/admin/news' , {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({title , description , category})
        })

        const data = await responses.json();

        if(data.error){
            alert(data.error)
        }

        if(data.success){
            location.assign('/admin')
        }

    }catch(err){

        console.log(err);
    }

} )