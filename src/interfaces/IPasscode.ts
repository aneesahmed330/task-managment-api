import { Document, Types } from 'mongoose';

export interface IPasscode extends Document {
  code: number;
  email: string;
  userId: string | Types.ObjectId;
  attempts: number;
}
