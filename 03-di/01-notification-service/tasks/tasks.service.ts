import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationService } from "../providers/NotificationService";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

	constructor(
		private readonly notificationService: NotificationService,
private readonly userService: UsersService,
	) { }
	
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
	 };  
	  this.tasks.push(task);

	  const user = this.userService.getUserById(assignedTo)
	  if (!user) {
		throw new NotFoundException()
	  }
	  
	  const message = `Вы назначены ответственным за задачу: "${title}"`;
	  this.notificationService.sendEmail(user.email, "Новая задача", message);
	  
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
	  const task = this.tasks.find((t) => t.id === id); 
    if (!task) {
		 throw new NotFoundException(`Задача с ID ${id} не найдена`);
	 }
	  
	   Object.assign(task, updateTaskDto);
	  
	  const user = this.userService.getUserById(task.assignedTo)
     const message = `Статус задачи "${task.title}" обновлён на "${task.status}"`;
	  this.notificationService.sendSMS(user.phone, message)
	  
    return task;
  }
}
