export enum MimeTypes {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
}

export enum Roles {
  ADMIN = 1,
  USER = 2,
}

export enum taskType {
  checkIn = 'check-in',
  checkOut = 'check-out',
}

export const mimeTypesArray: string[] = Object.values(MimeTypes);
