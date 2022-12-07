import { Document, Types } from 'mongoose';

export interface ILike extends Document {
  memory: Types.ObjectId | string;
  likedBy: Types.ObjectId | string;
  createdAt: string;
  updatedAt: string;
}
