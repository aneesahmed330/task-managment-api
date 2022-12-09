import { IRequest } from './../interfaces/IRequest';
import { Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import ProjectService from '../services/project.services';

class AdminController {
  static createProject = catchAsync(async (req: IRequest, res: Response) => {
    try {
      const project = await ProjectService.createProject(req.body, req.userId || '');
      return res.status(200).send({
        project,
        status: 200,
        msg: 'success',
      });
    } catch (err) {
      const e = err as ApiError;
      throw new ApiError(e?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });

  static getProjects = catchAsync(async (_req: IRequest, res: Response) => {
    try {
      const projects = await ProjectService.getProjects();

      return res.status(200).send({
        projects,
        msg: 'success',
        status: 200,
      });
    } catch (err) {
      const e = err as ApiError;
      throw new ApiError(e?.statusCode || httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
}

export default AdminController;
