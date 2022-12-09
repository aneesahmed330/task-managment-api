import { taskType } from './../enums';
import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  type: taskType;
  date: Date;
  createdAt: string;
  updatedAt: string;
}
