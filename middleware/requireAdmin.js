import jwt from 'jsonwebtoken';
import User from '../models/users.js';


export const requireAdmin = async (req , res , next) => {

    if (req.path === '/login' || req.path === '/admin/login') {
        return next();
    }

    const token = req.cookies.jwt;

    if(!token){
        return res.redirect('/admin/login')
    }

    try{

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        if(decodedToken.isAdmin){

            const user = await User.findById(decodedToken.id);

            if(!user){
                return res.redirect('/login');
            }

            req.user = user;
            next();
        }else{

           res.redirect('/') 
        }


    }catch(err){

        res.redirect('/admin/login');
    }
}