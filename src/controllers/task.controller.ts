import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { Response, Request } from 'express';
import { IRequest } from './../interfaces/IRequest';
import catchAsync from '../utils/catchAsync';
import TaskService from '../services/task.services';

class TaskController {
  static createTask = catchAsync(async (req: IRequest, res: Response) => {
    try {
      const task = await TaskService.createTask(req.body, req.userId || '');
      res.send({
        task,
        status: 200,
      });
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (e as Error).message);
    }
  });
  static getUserTask = catchAsync(async (req: IRequest, res: Response) => {
    try {
      const tasks = await TaskService.getUserTask(req.userId || '');
      res.send({
        tasks,
        status: 200,
      });
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (e as Error).message);
    }
  });

  static getActivity = catchAsync(async (_req: Request, res: Response) => {
    try {
      const data = await TaskService.getActivity();
      res.send({
        data,
        msg: 'success',
        status: 200,
      });
    } catch (e: any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
    }
  });
}

export default TaskController;
