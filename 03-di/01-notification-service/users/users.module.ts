import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { NotificationService } from "providers/NotificationService";

@Module({
  exports: [UsersService],
  providers: [UsersService,  NotificationService ],
})
export class UsersModule {}
