import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // optional but useful
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    username: {
        type: String,
        trim: true // removes extra spaces
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
    }
})

userSchema.pre('save' , async function(next){

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
})

userSchema.methods.comparePassword = async function(possiblePassWord){
    return await bcrypt.compare(possiblePassWord , this.password);
}

const User = mongoose.model('user' , userSchema);
export default User