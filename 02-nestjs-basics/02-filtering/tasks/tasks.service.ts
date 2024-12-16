import { Injectable, BadRequestException  } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";


@Injectable()
export class TasksService {
	private tasks: Task[] = [
		{
			id: "1",
			title: "Task 1",
			description: "First task",
			status: TaskStatus.PENDING,
		},
		{
			id: "2",
			title: "Task 2",
			description: "Second task",
			status: TaskStatus.IN_PROGRESS,
		},
		{
			id: "3",
			title: "Task 3",
			description: "Third task",
			status: TaskStatus.COMPLETED,
		},
		{
			id: "4",
			title: "Task 4",
			description: "Fourth task",
			status: TaskStatus.PENDING,
		},
		{
			id: "5",
			title: "Task 5",
			description: "Fifth task",
			status: TaskStatus.IN_PROGRESS,
		},
	];

	getFilteredTasks(
		status?: TaskStatus,
		page?: number,
		limit?: number,
	): Task[] {
		return this.tasks
	}
	
	getTasks(status: TaskStatus, page: number, limit: number): Task[] {

		
		if (page && (isNaN(page) || page <= 0)) {
			throw new BadRequestException();
		}

		if (limit && (isNaN(limit) || limit <= 0)) {
			throw new BadRequestException();
		}

		let filteredTasks = this.tasks;
		if (status) {
			filteredTasks = this.tasks.filter(task => task.status === status);
		}

		if (page && limit) {
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;
			filteredTasks = filteredTasks.slice(startIndex, endIndex);
		}

		return filteredTasks;
		
	}
}
