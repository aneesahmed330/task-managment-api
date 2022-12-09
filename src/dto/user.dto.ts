import { Roles } from './../enums';
export interface createAdminDto {
  name?: string;
  email: string;
  password: string;
  imageUrl: string;
  role?: Roles.ADMIN;
}

export interface createAdminUserDto {
  email: string;
  role?: Roles.USER;
}

export interface setPasswordDto {
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
