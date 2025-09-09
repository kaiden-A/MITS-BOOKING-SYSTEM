import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import cookieParser from 'cookie-parser';
import startCronFunction from './controller/deleteReservation.js';
import apiRoutes from './routes/api.js'




dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const dbUri = process.env.DB_URI ;

const adminPath = "/admin";

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('view engine' , 'ejs');


mongoose.connect(dbUri)
        .then(() => {
                console.log('SUCCESFULLY CONNECTED TO DATABASE')
                app.listen(PORT , () => {console.log('APP IS LISTENING AT PORT ' + PORT)})
        })
        .catch((err) => {console.log(err.message)});


//startCronFunction();

app.use(adminPath , adminRoutes);
app.use('/api' , apiRoutes)
app.use('/' , authRoutes);


