import mongoose from "mongoose";


const newsSchema = mongoose.Schema({

    title : {
        type: String,
        required : true
    },

    description : {
        type: String,
        required: true
    },
    
    category : {
        type: String,
        enum : ['booking' , 'event' , 'system' , 'general'],
        default : 'general',
        required : true
    }

} , {timestamps : true})


const News = mongoose.model('news' , newsSchema);
export default News;