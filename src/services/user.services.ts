import { setPasswordDto, loginUserDto, resetPasswordDto } from './../dto/user.dto';
import { IUser } from './../interfaces/IUser';
import httpStatus from 'http-status';
import UserModel from '../models/User';
import ApiError from '../utils/ApiError';
import PassCodeModel from '../models/Passcode';
import { unHashPassword, hashPassword } from '../utils/hash.password';
import Helper from '../utils/helper';
import MailService from './mail.services';
import TokenService from './token.services';

class UserService {
  static setPassword = async (body: setPasswordDto, userId: string): Promise<IUser | null> => {
    const _hashPassword = await hashPassword(body.password);
    return await UserModel.findByIdAndUpdate(userId, { password: _hashPassword }, { new: true });
  };

  static loginUser = async (body: loginUserDto): Promise<IUser | null> => {
    const user = await UserModel.findOne({ email: body.email });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'email or password is incorrect!');
    }

    if (user.password) {
      const valid = await unHashPassword(body.password, user.password);
      if (!valid) {
        throw new ApiError(httpStatus.NOT_FOUND, 'email or password is incorrect!');
      }
      return user;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Kindly set your password , using the link sent in the email');
    }
  };

  static sendOtp = async (body: resetPasswordDto): Promise<string> => {
    try {
      const user = await UserModel.findOne({ email: body.email });
      if (user) {
        await PassCodeModel.remove({ email: body.email });

        const code = Helper.codeGenerator();
        body.code = code;
        body.userId = user._id;
        const passcode = await PassCodeModel.create(body);
        return await MailService.sendPasswordResetMail(passcode.code, passcode.email);
      } else {
        return "User with that email doesn't exist!";
      }
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  };

  static verifyOtp = async (body: any) => {
    try {
      const passcode = await PassCodeModel.findOne({ email: body.email });
      if (passcode) {
        if (passcode?.code === body.code) {
          let token = '';
          const _user = await UserModel.findOne({ _id: passcode.userId });
          if (_user) {
            token = await TokenService.generateResetToken(_user);
          }
          await PassCodeModel.deleteOne({ _id: passcode._id });
          return {
            data: 'Otp verified successfully!',
            token,
          };
        } else {
          const updatedPasscode = await PassCodeModel.findByIdAndUpdate(
            passcode._id,
            {
              $inc: { attempts: 1 },
            },
            { new: true },
          );
          if (updatedPasscode?.attempts === 3) {
            await PassCodeModel.deleteMany({ email: updatedPasscode.email });
            return {
              data: 'Passcode expires, try to generate new One!',
            };
          } else {
            return {
              data: `Invalid passcode , please try again!`,
            };
          }
        }
      } else {
        return {
          data: "Passcode doesn't exist, try to generate new One!",
        };
      }
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  };

  static resetPassword = async (body: any, userId: string) => {
    try {
      const password = await hashPassword(body.password);
      const user = await UserModel.findByIdAndUpdate(
        userId,
        {
          password,
        },
        { new: true },
      );
      if (user) {
        return { msg: 'password change successfully', status: 200 };
      } else {
        return { msg: 'something went wrong!', status: 500 };
      }
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  };
}

export default UserService;
