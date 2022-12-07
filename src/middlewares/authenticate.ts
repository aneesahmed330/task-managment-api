import JWT, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import UserModel from '../models/User';
import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/IRequest';
export const AUTHENTICATE = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    // console.log('req.headers.authorization ', req.headers.authorization);
    if (!req.headers.authorization || !req.headers.authorization.startsWith(config.AUTH_HEADER_PREFIX)) {
      Unauthorized(res);
    } else {
      const authToken = req.headers.authorization.split(' ')[1];
      JWT.verify(
        authToken,
        config.jwtSecret,
        {},
        async (err: VerifyErrors | null, decoded: string | JwtPayload | undefined): Promise<void | Response<any, Record<string, any>>> => {
          if (err) {
            return Unauthorized(res);
          } else {
            if (!decoded || !decoded.sub) {
              return Unauthorized(res);
            } else {
              let userId;
              let type;
              if (typeof decoded === 'object') {
                userId = decoded.sub;
                type = decoded.type;
              }
              const user = await UserModel.findById(userId);
              if (!user) {
                return Unauthorized(res);
              }

              req.userId = userId as string;
              req.type = type;
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

const Unauthorized = (res: Response) => {
  return res.status(403).send({
    status: false,
    message: 'Unauthorized',
  });
};
