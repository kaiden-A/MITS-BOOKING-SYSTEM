import { Router } from "express";
import { check_availablity , search_bookings, search_venues , check_reservations} from "../controller/api.js";

const router = Router();


router.get('/availability' , check_availablity);

router.get('/bookings' , search_bookings)

router.get('/venues' ,  search_venues);

router.get('/check' , check_reservations)


export default router;