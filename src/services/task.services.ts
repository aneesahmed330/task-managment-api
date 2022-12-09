import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import moment from 'moment';
import TaskModel from '../models/Task';
import { taskType } from '../enums';
class TaskService {
  static createTask = async (body: any, userId: string) => {
    body.userId = userId;
    body.date = moment().format('YYYY-MM-DD');
    body.time = moment().format('HH:mm:ss');

    const tasks = await TaskModel.find({ date: body.date });

    if (tasks.length === 0 && body.type === taskType.dayStart.toString()) {
      return await TaskModel.create(body);
    }

    // check if checkIn / checkOut already exist?
    const _res = tasks.filter((t) => t.type === body.type);

    if (_res.length > 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Already entered');
    }


    if (body.type === taskType.dayEnd.toString()) {
      console.log('hhhh');
      const startEntry = tasks.filter((t) => t.type === taskType.dayStart);
      console.log('startEntry', startEntry);
      if (startEntry.length > 0) {
        return await TaskModel.create(body);
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Kindly Add the day start activity!');
      }
    } else {
      return await TaskModel.create(body);
    }
  };
}

export default TaskService;
