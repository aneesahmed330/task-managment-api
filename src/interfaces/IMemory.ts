import { Document, Types } from 'mongoose';
import { IUser } from './IUser';

export interface IMemory extends Document {
  title: string;
  description?: string;
  tags?: string[];
  images?: string[];
  createdBy: Types.ObjectId | IUser;
  memory?: Types.ObjectId | string;
  createdAt: string;
  updatedAt: string;
}
