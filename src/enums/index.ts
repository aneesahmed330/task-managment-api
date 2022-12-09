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
  dayStart = 'day-start',
  dayEnd = 'day-end',
}

export const mimeTypesArray: string[] = Object.values(MimeTypes);
