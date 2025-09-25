import { Router } from "express";
import { post_login , delete_user } from "../controller/authController.js";
import { get_homepage , post_venue , get_active_reservations , get_past_reservations , admin_get_login , get_venue, update_status_venues , get_venue_inventory, post_news, get_news, delete_news} from "../controller/adminController.js";
import { requireAdmin } from '../middleware/requireAdmin.js';
const router = Router();



router.get('/' , requireAdmin , get_homepage);

router.get('/login' , admin_get_login);
router.post('/login' ,post_login);

router.get('/logout'  , delete_user);

router.get('/venues' , requireAdmin , get_venue)
router.post('/venues' , requireAdmin , post_venue);
router.put('/venues/:id' , requireAdmin , update_status_venues)

router.get('/past/reservations' , requireAdmin , get_past_reservations);
router.get('/active/reservations', requireAdmin , get_active_reservations);
router.get('/venues/inventories' , requireAdmin , get_venue_inventory)

router.get('/news' , requireAdmin , get_news );
router.post('/news' , requireAdmin , post_news);
router.delete('/news/:id' , requireAdmin , delete_news)

export default router;