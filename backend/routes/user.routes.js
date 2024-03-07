import express from 'express';
import {getUsersForSidebar} from '../controllers/user.controller.js'
import isAuthorized from '../middleware/isAuthorized.js';
const router = express.Router();

router.get('/', isAuthorized, getUsersForSidebar);

export default router;