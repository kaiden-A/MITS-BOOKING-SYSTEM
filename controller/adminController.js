import Venue from "../models/venue.js";
import reserveVenue from "../models/reserveVenue.js";
import HistoryReserve from '../models/historyReserve.js';
import venue from "../models/venue.js";
import User from '../models/users.js'

export const get_homepage = async (req , res) => {
    const venues = await Venue.find();

    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Active = Today reservations
    const reserve = await reserveVenue.find({
        date: { $gte: today, $lt: tomorrow }
    })
    .populate('venueId', 'name active') // get name + status
    .populate('userId', 'username email');  // get name + email

    // Past = Yesterday reservations
    const history = await HistoryReserve.find({
        date: { $gte: yesterday, $lt: today }
    })
    .populate('venueId', 'name active')
    .populate('userId', 'username email');

    const users = await User.find({}, 'username email'); // only return name+email
    const news = [];

    res.render('adminHome', {
        venues,
        reserve,
        history,
        users,
        news
    });
};


export const admin_get_login = (req , res) => {

    res.render('adminLogin')
}


export const get_venue = (req , res) => {

    res.render('createVenue')
}

export const post_venue = async (req , res) => {
    
    try{

        const {name , location , capacity , active} = req.body;

        const venue = await Venue.create({name , location , capacity , active});

        res.json({success : venue});

    }catch(err){
        console.log(err);
        res.json({error : err});
    }

}

export const update_status_venues = async (req , res) => {

    const venueId = req.params.id;
    const {active} = req.body;

    try{

        const updatedDocument = await Venue.findByIdAndUpdate(venueId , {active : active} , {new : true});

        if(!updatedDocument){
            return res.status(404).json({error : "Updating The venue status has fail"})
        }

        res.json({success : updatedDocument})
    }catch(err){
        console.log(err);
    }
}

export const get_past_reservations =  async (req , res) => {

    try{

        const history = await HistoryReserve.find().populate('userId' , 'username email').populate('venueId' , "name")

        const result = history.map(venue => {

            const date = new Date(venue.date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"


            return {

                name : venue.venueId.name,
                date : customDateString,
                slot : venue.slot,
                username : venue.userId.username,
                reason : venue.reason

            }
        })

        res.render('data' , { venues : result , title : 'Past Reservations Data' , noData : 'no past data' , script : 'past.js'});

    }catch(err){

        console.log(err);
    }

}

export const get_active_reservations = async (req , res) => {


        
    try{

        const reserve = await reserveVenue.find().sort({date : -1}).populate('userId' , 'username').populate('venueId' , 'name');

        const result = reserve.map( venue => {

            const date = new Date(venue.date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"

            return {

                name : venue.venueId.name,
                date : customDateString,
                slot : venue.slot,
                username : venue.userId.username,
                reason : venue.reason

            }
        })

        res.render('data' , { venues : result , title : 'Active Reservations Data' , noData : 'no active data' , script : 'active.js'});

    }catch(err){
        console.log(err);
    }

}

export const get_venue_inventory = async (req , res) => {

    const venue = await Venue.find();


    res.render('inventory' ,  {venues : venue})
}