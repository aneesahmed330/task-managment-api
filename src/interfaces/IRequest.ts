import { IFile } from './IFile';
import { Request } from 'express';

export interface IRequest extends Request {
  userId?: string;
  type?: string;
  files?: IFile[];
}
