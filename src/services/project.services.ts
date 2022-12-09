import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import ProjectModel from '../models/Project';
import { IProject } from 'interfaces/IProject';
import { createProjectDto } from './../dto/project.dto';

class ProjectService {
  static createProject = async (body: createProjectDto, userId: string): Promise<IProject> => {
    try {
      body.createdBy = userId;
      return await ProjectModel.create(body);
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (e as Error).message);
    }
  };

  static getProjects = async (): Promise<IProject[]> => {
    try {
      return await ProjectModel.find({});
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (e as Error).message);
    }
  };
}

export default ProjectService;
