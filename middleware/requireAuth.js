import jwt from 'jsonwebtoken';
import User from '../models/users.js';


export const requireAuth = async (req , res , next) => {

    const token = req.cookies.jwt;

    try{

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id);

        req.user = user;
        next();

    }catch(err){
        res.redirect('/login');
    }
}