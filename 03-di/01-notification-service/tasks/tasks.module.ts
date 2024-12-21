import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import { NotificationService } from "../providers/NotificationService";
import { UsersService } from "../users/users.service";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, NotificationService, UsersService ],
})
export class TasksModule {}
