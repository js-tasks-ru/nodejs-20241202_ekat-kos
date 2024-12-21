import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { NotificationService } from "./providers/NotificationService";

@Module({
	imports: [TasksModule],
	providers:[NotificationService]
})
export class AppModule {}
