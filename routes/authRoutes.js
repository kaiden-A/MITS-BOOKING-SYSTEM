import { Router } from "express";
import userRoutes from './userRoutes.js';
import {get_login , post_login , get_signUp , post_signUp , delete_user} from '../controller/authController.js'
import {requireAuth} from '../middleware/requireAuth.js'
const router = Router();


router.get('/login' , get_login );
router.post('/login' , post_login);

router.get('/signup' , get_signUp);
router.post('/signup' , post_signUp);

router.get('/logout' , delete_user);

router.use('/' , requireAuth , userRoutes );

export default router;