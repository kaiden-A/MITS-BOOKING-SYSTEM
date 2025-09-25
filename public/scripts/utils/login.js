

export default async function logIn(routes , email , password){


    try{

        const responses = await fetch(routes , {
            method: 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({email , password})
        })

        const data = await responses.json();

        return data;

    }catch(err){

        console.log(err)
    }
}