import { Roles } from './../enums/roles';
import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    imageUrl: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: Roles.USER,
      enum: Object.values(Roles),
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

userSchema.static('isEmailTaken', async function isEmailTaken(email) {
  const user = await this.findOne({ email });
  return !!user;
});

const User = model<IUser>('User', userSchema);
export default User;
