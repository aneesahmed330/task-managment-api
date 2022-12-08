import { IUser } from './../interfaces/IUser';
import { createAdminDto, createAdminUserDto } from './../dto/user.dto';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import UserModel from '../models/User';
import { Roles } from '../enums/roles';

class AdminService {
  static createAdmin = async (body: createAdminDto): Promise<IUser> => {
    if (!!(await UserModel.findOne({ email: body.email }))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken!');
    }
    console.log('admin created!');
    body.role = Roles.ADMIN;
    return await UserModel.create(body);
  };
  static createUser = async (body: createAdminUserDto): Promise<IUser> => {
    try {
      const _user = await UserModel.findOne({ email: body.email });
      if (_user) {
        return _user;
      } else {
        console.log('admin user created!');
        body.role = Roles.USER;
        return await UserModel.create(body);
      }
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  };
}

export default AdminService;
