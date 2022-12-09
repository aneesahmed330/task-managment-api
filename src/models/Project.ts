import { IProject } from './../interfaces/IProject';
import { Schema, model, SchemaTypes } from 'mongoose';

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Project = model<IProject>('User', projectSchema);
export default Project;
