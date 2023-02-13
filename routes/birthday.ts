import express from 'express';
import { createBirthday, getAllBirthdays } from '../controllers/birthday.controller';
const router = express.Router();

router.post('/create_birthday', createBirthday);
router.get('/get_all_birthdays', getAllBirthdays);

export default router;
