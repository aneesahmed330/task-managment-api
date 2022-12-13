import { AUTHENTICATE } from './../middlewares/authenticate';
import TaskController from '../controllers/task.controller';
import express from 'express';

const router = express.Router();

router.post('/create-task', AUTHENTICATE, TaskController.createTask);
router.get('/get-tasks', AUTHENTICATE, TaskController.getUserTask);

export default router;
