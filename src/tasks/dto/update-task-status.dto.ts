import { IsEnum } from 'class-validator';
import TaskStatus from '../models/taskStatus.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
