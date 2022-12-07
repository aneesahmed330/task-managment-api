export interface registerUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface resetPasswordDto {
  email: string;
  userId?: string;
  code?: number;
}

export interface loginUserDto {
  email: string;
  password: string;
}
