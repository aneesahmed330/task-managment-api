import { Roles } from 'enums/roles';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import ApiError from '../utils/ApiError';
import tokenTypes from '../config/token';
import { IUser } from '../interfaces/IUser';
import httpStatus from 'http-status';

class TokenService {
  static generateToken = (userId: string, type: any, role: Roles, secret = config.jwtSecret, expireTime: { expiresIn: string | number }) => {
    try {
      const payload = {
        sub: userId,
        role: role,
        type: type,
        iat: moment().unix(),
      };
      return jwt.sign(payload, secret, expireTime);
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  static generateAuthTokens = async (user: IUser) => {
    try {
      const accessToken = this.generateToken(user?.id, tokenTypes.ACCESS, user.role || 2, config.jwtSecret, {
        expiresIn: config.jwt.accessExpirationTime,
      });
      return accessToken;
    } catch (error: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static generateResetToken = async (user: IUser) => {
    try {
      const resetToken = this.generateToken(user?._id, tokenTypes.RESETPASSWORD, user.role || 2, config.jwtSecret, {
        expiresIn: config.jwt.resetExpirationTime,
      });
      return resetToken;
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  };
}

export default TokenService;
