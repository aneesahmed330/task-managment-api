import { AUTHENTICATE } from './../middlewares/authenticate';
import express from 'express';
import validate from '../middlewares/validate';
import UserValidator from '../validations/user.validation';
import UserController from '../controllers/user.controller';

const router = express.Router();

//! register user
router.post('/register', validate(UserValidator.registerUser), UserController.registerUser);

//! login user
router.post('/login', validate(UserValidator.loginUser), UserController.loginUser);

//! send OTP
router.post('/send-otp', UserController.sendOtp);

//!  verify OTP
router.post('/verify-otp', UserController.verifyOtp);

//! change password
router.patch('/reset-password', AUTHENTICATE, UserController.resetPassword);

export default router;
