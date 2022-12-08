import { IRequest } from './../interfaces/IRequest';
import UserService from '../services/user.services';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import TokenService from '../services/token.services';
import tokenTypes from '../config/token';

class UserController {
  static setPassword = catchAsync(async (req: IRequest, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const user = await UserService.setPassword(req.body, req.userId || '');
      let token;
      if (user) {
        token = await TokenService.generateAuthTokens(user);
      }
      return res.status(200).send({
        data: 'User password has been set!',
        token,
        msg: 'success',
        status: 200,
      });
    } catch (e: any) {
      throw new ApiError(e?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
  static loginUser = catchAsync(async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const user = await UserService.loginUser(req.body);

      const token = await TokenService.generateAuthTokens(user);
      return res.send({
        AccessToken: token,
        status: 200,
        msg: 'User logged in successfully !',
      });
      
    } catch (e: any) {
      throw new ApiError(e?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
  static sendOtp = catchAsync(async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const msg = await UserService.sendOtp(req.body);
      return res.status(200).send({
        data: msg,
        msg: 'success',
        status: 200,
      });
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
  static verifyOtp = catchAsync(async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { data, token } = await UserService.verifyOtp(req.body);
      return res.status(200).send({
        data,
        msg: 'success!',
        resetPasswordToken: token || '',
      });
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
  static resetPassword = catchAsync(async (req: IRequest, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      if (req.type === tokenTypes.RESETPASSWORD) {
        const { msg, status } = await UserService.resetPassword(req.body, req.userId || '');
        return res.send({
          msg,
          status,
        });
      } else {
        return res.status(400).send({
          msg: 'Either Token expire or  Invalid!',
          status: 400,
        });
      }
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
}

export default UserController;
