

//routes = /admin/news or /reservations
//dataset = venueId or newsId
//closest = .card or .news-card

export default async function dltData( event , closest , dataset , routes){

    const card = event.target.closest(closest);
    const id = card.dataset[dataset];


    try{

        const responses = await fetch(`${routes}/${id}` , {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
        })

        const data = await responses.json();

        return {card , data};

    }catch(err){

        console.log(err)
    }


}