import { Document, Types } from "mongoose";
import { IMemory } from "./IMemory";
import { IUser } from "./IUser";

export interface IComment extends Document {
  text: string;
  memory: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}
