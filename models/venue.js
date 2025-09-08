import mongoose from "mongoose";


const venueSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    location : {
        type: String
    },

    capacity : {
        type: Number
    },

    active:{
        type: Boolean,
        required: true
    }
})

const venue = mongoose.model( 'venue' , venueSchema);

export default venue;