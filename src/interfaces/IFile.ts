export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  buffer: Buffer;
  size: number;
  mimetype: string;
}

export interface IUploadFileResponse {
  name: string;
  url: string;
  type: string;
  location: string;
}
