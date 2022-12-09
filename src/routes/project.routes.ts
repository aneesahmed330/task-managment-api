import express from 'express';
import validate from '../middlewares/validate';
import { AUTHENTICATE } from '../middlewares/authenticate';
import ProjectValidator from '../validations/project.validation';
import ProjectController from '../controllers/project.controller';

const router = express.Router();

router.post('/create-project', AUTHENTICATE, validate(ProjectValidator.createProject), ProjectController.createProject);
router.get('/get-projects', AUTHENTICATE, ProjectController.getProjects);

export default router;
