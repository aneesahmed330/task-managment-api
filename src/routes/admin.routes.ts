import { AUTHENTICATE } from './../middlewares/authenticate';
import AdminController from '../controllers/admin.controller';
import express from 'express';
import validate from '../middlewares/validate';
import AdminValidator from '../validations/admin.validation';

const router = express.Router();

router.post('/create-admin', validate(AdminValidator.createAdmin), AdminController.createAdmin);
router.post('/create-user', AUTHENTICATE ,validate(AdminValidator.createAdminUser), AdminController.createUser);

export default router;
