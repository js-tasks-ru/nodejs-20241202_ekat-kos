import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty({ message: 'Title is required' })
	title: string;

	@IsString()
	@IsNotEmpty({ message: 'Description is required' })
	description: string;

	@IsEnum(TaskStatus, {
		message: 'Status must be one of this: in_progress, completed, pending',
	})
	status: TaskStatus;
}
