import {Router} from 'express';
import { createSubmission, getSubmissions } from '../controller/submission_controller.js';


const router = Router();


router.get('/list',getSubmissions);
router.post('/create', createSubmission);


export default router;