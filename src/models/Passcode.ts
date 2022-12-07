import { IPasscode } from './../interfaces/IPasscode';
import { Schema, model } from 'mongoose';

const LikeSchema = new Schema<IPasscode>(
  {
    code: { type: Number, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    attempts: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'passcodes',
  },
);

const Passcode = model<IPasscode>('Passcode', LikeSchema);
export default Passcode;
