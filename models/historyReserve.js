import mongoose from "mongoose";


const historySchema = mongoose.Schema({

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
} , {timestamps : true});

const history = mongoose.model('history' , historySchema);
export default history;