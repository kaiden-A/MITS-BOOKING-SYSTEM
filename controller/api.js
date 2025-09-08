import { timeSlot } from "./timeSlot.js";
import reserveVenue from "../models/reserveVenue.js";
import Venue from "../models/venue.js";
import HistoryReserve from '../models/historyReserve.js'

export const check_availablity = async  (req , res) => {

    const {venueId , date} = req.query;


    try{

        const allTimeSlot = [...timeSlot];

        const reserve = await reserveVenue.find({venueId , date});

        if(reserve.length === 0){
            return res.json({availableSlot : allTimeSlot})
        }

        const bookedTime = reserve.map(r => r.slot);
        console.log(bookedTime);

        const availableSlot = allTimeSlot.filter(slot => !bookedTime.includes(slot));
        
        res.json({availableSlot});
        

    }catch(err){

        console.log(err);
        res.json({error : err});
    }

}


//HOW TO USE SEARCH_BOOKINGS API

//venue=BILIK%20SEMINAR
//sort=date (ascending order)(default) sort=-date (descending order)
//status=active (take from reservations db) status=past (take from History db)

export const search_bookings = async (req , res) => {


    const checkStatus = {
        'active' : true,
        'past' : false
    }

    const checkSort ={
        'date' : 1 ,
        '-date' : -1
    }

    const {
        venue,
        sort,
        status,
    } = req.query;

    const isActive = checkStatus[status] ?? false;
    const howSort = checkSort[sort] ?? 1;

    const venueName = await Venue.findOne({name : venue});

    if(!venueName){
        res.json({error : `${venue} is not registerd as a Venue`})
    }

    if(isActive){

        const venueActive = await reserveVenue.find({venueId : venueName._id}).sort({date : howSort }).populate('venueId' , 'name').populate( 'userId' , 'username')
        

        const result = venueActive.map( venue => {

            const date = new Date(venue.date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"

            return {

                name : venue.venueId.name,
                user : venue.userId.username,
                date : customDateString,
                slot : venue.slot,
                reason : venue.reason
            }
        })
        
        console.log(result);
        return res.json({venue : result})

    }else{

        const history = await HistoryReserve.find({venueId : venueName._id}).sort({date : howSort}).populate('venueId' , 'name').populate('userId' , 'username');

        const result =  history.map( venue => {

            const date = new Date(venue.date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"


            return {

                name : venue.venueId.name,
                user : venue.userId.username,
                date : customDateString,
                slot : venue.slot,
                reason : venue.reason
            }
        })

        console.log(result);
        res.json({venue : result});


    }

}

// /api/venues?name=BILIK%20SEMINAR
export const search_venues = async (req , res) => {

    const {name} = req.query;

    try{

        if(!name){
            const allVenue = await Venue.find();
            return res.json({allVenue});
        }
        
        const venue = await Venue.findOne({name});
        
        if(!venue){
            res.json({error :  `${name} doesn't Exist`})
        }

        res.json({success : venue});

    }catch(err){

        console.log(err);
    }

}
