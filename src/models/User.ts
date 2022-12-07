import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
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
