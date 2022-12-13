import JWT, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import UserModel from '../models/User';
import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/IRequest';
export const AUTHENTICATE = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    console.log('req.headers.authorization ', req.headers.authorization);
    if (!req.headers.authorization || !req.headers.authorization.startsWith(config.AUTH_HEADER_PREFIX)) {
      Unauthorized(res);
    } else {
      const authToken = req.headers.authorization.split(' ')[1];
      if (!authToken) {
        Unauthorized(res);
      }
      console.log('token', authToken);
      JWT.verify(
        authToken,
        config.jwtSecret,
        {},
        async (err: VerifyErrors | null, decoded: string | JwtPayload | undefined): Promise<void | Response<any, Record<string, any>>> => {
          if (err) {
            if (err instanceof JWT.TokenExpiredError) {
              return Unauthorized(res, 'Token has been expired!, contact admin to create new link to set password ');
            }
            if (err instanceof JWT.JsonWebTokenError) {
              return Unauthorized(res, 'Invalid Token!');
            }

            if (err) {
              return Unauthorized(res, 'Invalid Token!');
            }
            console.log('err', err);
          } else {
            if (!decoded || !decoded.sub) {
              return Unauthorized(res);
            } else {
              let userId;
              let type;
              let role;
              if (typeof decoded === 'object') {
                userId = decoded.sub;
                type = decoded.type;
                role = decoded.role;
              }
              const user = await UserModel.findById(userId);
              if (!user) {
                return Unauthorized(res);
              }

              req.userId = userId as string;
              req.type = type;
              req.role = role;
              next();
            }
          }
        },
      );
    }
  } catch (e: any) {
    console.log('Auth middleware fail: ', e.message);
  }
};

const Unauthorized = (res: Response, msg?: string) => {
  // let msg='';
  return res.status(403).send({
    status: false,
    message: msg || 'Unauthorized',
  });
};
