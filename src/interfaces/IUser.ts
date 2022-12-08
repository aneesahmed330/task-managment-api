import { Roles } from './../enums/roles';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  role?: Roles;
  createdAt: string;
  updatedAt: string;
}
