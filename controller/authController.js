import User from '../models/users.js';
import jwt from 'jsonwebtoken';



const maxAge = 1 * 24 * 60 * 60;

const createToken = (id , isAdmin) => {
    return jwt.sign({id , isAdmin} , process.env.JWT_SECRET , {expiresIn  : maxAge});
}

export const get_login = (req , res) => {
    res.render('user/signIn')
}

export const post_login = async (req , res) => {
    
    const {email , password} = req.body;
    const isAdminPath = req.originalUrl === '/admin/login';

    try{

        const user = await User.findOne({email});

        if(!user){
            return res.json({error : 'Invalid Email'})
        }

        const isMatch = await user.comparePassword(password);


        if(!isMatch){
            return res.json({error : 'Incorrect password'})
        }

        const isAdmin = user.email === process.env.ADMIN_EMAIL;

        if(isAdminPath && !isAdmin){
            return res.json({error : 'Your are not an admin'})
        }

        const token = createToken(user._id , isAdmin);

        res.cookie('jwt' , token ,{httpOnly : true , maxAge : maxAge * 1000} )
        res.json({success : `Succesfully Login Hello ${user.username}`});

    }catch(err){
        console.log(err);
        res.json({error : err.message});
    }
    
}

export const get_signUp = (req , res) => {
    res.render('user/signUp')
}

export const post_signUp = async (req , res) => {

    const {email , username , password} = req.body;

    try{


        if(password.length <= 6){
            return res.status(403).json({error : 'Password must be atleast 6 character'})
        }

        const user = await User.create({email , username , password});

        const token = createToken(user._id);

        res.cookie('jwt' , token ,{httpOnly : true , maxAge : maxAge * 1000} )
        res.json({success : user});


    }catch(err){
        console.log(err);

        if(err.code === 11000){
            return res.status(400).json({error : 'Email Already Exist'})
        }

        res.status(500).json({error : err});
    }
}

export const delete_user = (req , res) => {
    res.cookie('jwt' , '' , {maxAge: 1});
    res.redirect('/');
}