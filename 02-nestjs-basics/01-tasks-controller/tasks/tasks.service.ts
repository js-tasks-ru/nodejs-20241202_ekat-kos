import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus,CreateTaskDto } from "./task.model";


@Injectable()
export class TasksService {
  private tasks: Task[] = [];

	getAllTasks(): Task[] {
		
	  return this.tasks
  }

	getTaskById(id: string): Task {

		const taskById = this.tasks.find(item => item.id == id)
		
		if (!taskById) {
			throw new NotFoundException()
		}

		return taskById
  }

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description, status } = createTaskDto;

		const newTask: Task = {
			id: `${this.tasks.length + 1}`,
			title,
			description,
			status,
		};

		this.tasks.push(newTask);
		return newTask;
	}



	updateTask(id: string, update: Task): Task {
  
		const taskById = this.tasks.find(task => task.id === id);

		if (!taskById) {
			throw new NotFoundException()
		}

		const updateTask = Object.assign(taskById, update);
		return updateTask;
  }

	deleteTask(id: string): Task {

		const taskIndex = this.tasks.findIndex(task => task.id === id);

		const [deletedTask] = this.tasks.splice(taskIndex, 1);
		return deletedTask;
	  
	}

}

