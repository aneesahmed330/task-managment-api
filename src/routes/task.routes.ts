import { AUTHENTICATE } from './../middlewares/authenticate';
import TaskController from '../controllers/task.controller';
import express from 'express';

const router = express.Router();

router.post('/create-task', AUTHENTICATE, TaskController.createTask);

export default router;
