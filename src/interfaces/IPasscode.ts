import { Document } from 'mongoose';

export interface IPasscode extends Document {
  code: number;
  email: string;
  userId: string;
  attempts: number;
}
