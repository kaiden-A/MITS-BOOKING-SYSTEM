import reserveVenue from "../models/reserveVenue.js";
import User from '../models/users.js';
import Venue from '../models/venue.js';
import { timeSlot } from "./timeSlot.js";

export const get_homepage = async (req , res) => {

    const currentUser = req.user;


    try{
        const currentUser = req.user;

        const user = await User.findById(currentUser._id);

        const userReserveVenue = await reserveVenue.find({userId : currentUser._id}).populate("venueId" , "name");

        const result = userReserveVenue.map(reserve => {

            return{
                reserveId : reserve._id,
                venuedId : reserve.venueId._id,
                date : reserve.date,
                name : reserve.venueId.name,
                slot : reserve.slot,
                reason : reserve.reason
            }

        })

                                    
        res.render('homepage',  {user , reserve : result} )
       
        
    }catch(err){
        console.log(err);
    }

}

export const get_reserve_form = async (req , res) => {


    try{

        const currentUser = req.user;
        const user = await User.findById(currentUser._id);


        const venue = await Venue.find({active : true});

        res.render('form' , {venues: venue , user})

    }catch(err){

        console.log(err);
    }
    
}

export const post_reserve = async (req , res) => {

    

    try{

        const userId = req.user._id;
        const { venueId , date, slots , reason} = req.body;
        const reservations = slots.map(slot => ({userId , venueId , date, slot , reason}))

        const reserve = await reserveVenue.insertMany(reservations);
        res.json({success: reserve});
        
    }catch(err){
        console.log(err);

        if(err.code === 11000){

            const match = err.message.match(/slot: "([^"]+)"/);
            const slot = match ? match[1] : "unknown";


            return res.status(403).json({error : `This Booking slot ${slot} is Already taken`})
        }

        res.status(500).json({error : "Server Error"});
    }



}

export const delete_reserve = async (req , res) => {

    const reserveId = req.params.reserveId;

    try{

        const deletedVenue = await reserveVenue.findByIdAndDelete(reserveId);

        if(!deletedVenue){
            return res.status(403).json({error : "Deleting the venue fail"})
        }

        res.json({success : "Sucessfully deleted the reserve venue"})



    }catch(err){
        console.log(err);

        res.status(500).json({error : "Server Error"});
    }

}


export const get_check_reservations = async (req , res) => {

    const currentUser = req.user;
    const user = await User.findById(currentUser._id);
    const venue = await Venue.find({active : true});

    res.render('check' , {venue , user});
    
}
