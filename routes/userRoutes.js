import { Router } from "express";
import { get_homepage  , post_reserve , delete_reserve , get_reserve_form } from '../controller/reserveController.js';

const router = Router();


router.get('/' ,get_homepage );

router.get('/reservations' , get_reserve_form);
router.post('/reservations' , post_reserve); 

router.delete('/reservations/:reserveId', delete_reserve) ;


export default router;