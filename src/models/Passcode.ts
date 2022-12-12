import { IPasscode } from './../interfaces/IPasscode';
import { Schema, model, SchemaTypes } from 'mongoose';

const pascodeSchema = new Schema<IPasscode>(
  {
    code: { type: Number, required: true },
    email: { type: String, required: true },
    userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
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

const Passcode = model<IPasscode>('Passcode', pascodeSchema);
export default Passcode;
