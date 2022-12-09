import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { Response } from 'express';
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
}

export default TaskController;
