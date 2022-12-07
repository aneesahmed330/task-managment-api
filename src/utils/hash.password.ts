import bcrypt from 'bcrypt';

export const hashPassword = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(pass, salt);
  return hashPass;
};

export const unHashPassword = async (reqPass: string, userPass: string) => {
  const valid = await bcrypt.compare(reqPass, userPass);
  return valid;
};
