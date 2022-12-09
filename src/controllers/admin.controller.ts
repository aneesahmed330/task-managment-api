import { IRequest } from './../interfaces/IRequest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import TokenService from '../services/token.services';
import AdminService from '../services/admin.services';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import MailService from '../services/mail.services';
import { Roles } from '../enums';

class AdminController {
  static createAdmin = catchAsync(async (req: Request, res: Response) => {
    try {
      const admin = await AdminService.createAdmin(req.body);
      const token = await TokenService.generateAuthTokens(admin);
      return res.status(200).send({
        user: admin,
        token,
        status: 200,
        msg: 'success',
      });
    } catch (e: any) {
      throw new ApiError(e?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });

  static createUser = catchAsync(async (req: IRequest, res: Response) => {
    try {
      if (req.role !== Roles.ADMIN) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "you don't have access to perform that action!");
      }

      const user = await AdminService.createUser(req.body);
      const token = await TokenService.generateResetToken(user);
      const url = `http://localhost:3000/set-password?token=${token}`;
      const msg = await MailService.accountCreationMail(url, user.email);
      return res.status(200).send({
        data: msg,
        msg: 'success',
        status: 200,
      });
    } catch (e: any) {
      throw new ApiError(e?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
}

export default AdminController;
