import dltReserve from './utils/deleteFunc.js';
document.querySelectorAll('.reschedule').forEach( button => {
    
    button.addEventListener( 'click' , async (e) => {

        const {card , data} = await dltReserve(e , '.card' , 'reserveId' , '/reservations');
        
        if(data.error){
            alert(data.error);
        }

        if(data.success){
            location.assign('/reservations')
        }
})
})