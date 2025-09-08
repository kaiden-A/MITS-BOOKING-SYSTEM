import mongoose from "mongoose";



const reserveSchema = mongoose.Schema({

    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' , 
        required: true
    },

    venueId : {
        type: mongoose.Schema.Types.ObjectId, ref: 'venue',
        required: true
    },

    date : {
        type: Date,
        required: true
    },

    slot : {
        type: String,
        required:   [/^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time range format"]
    },

    reason : {
        type: String,
    }
})


reserveSchema.index(
    {venueId : 1 , date : 1 , slot: 1},
    {unique :  true}
)

const reserveVenue = mongoose.model('reserve' , reserveSchema);

export default reserveVenue;
