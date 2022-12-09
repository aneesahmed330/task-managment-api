import { Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  createdBy: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}
