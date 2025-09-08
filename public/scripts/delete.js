
document.querySelectorAll('.delete').forEach( button => {
    
    button.addEventListener( 'click' , async (e) => {


        try{

                const card = e.target.closest('.card');


                const reserveId = card.dataset.reserveId;

                const responses  = await fetch(`/reservations/${reserveId}` , {
                    method: 'DELETE',
                    headers: {'Content-Type' : 'application/json'}
                })

                const data = await responses.json();

                if(data.error){
                    alert(data.error);
                }

                if(data.success){
                    card.remove();
                }
        }catch(err){

            console.log(err);
        }
    })
})