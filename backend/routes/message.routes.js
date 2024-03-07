import express from 'express';
import {sendMessage, getMessage} from '../controllers/message.controller.js'
const router = express.Router();


router.get('/getMessage/:id', getMessage);
router.post('/sendMessage/:id', sendMessage);

export default router;