import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module";
import { UtilsModule } from "./utils/utils.module";

//Services Imports
import { AppService } from "./app.service";

//Controller Imports
import { AppController } from "./app.controller";

//Configuration of ENV variables
import configuration from "./configuration";
import { PrismaModule } from './prisma/prisma.module';
import { CheckListModule } from './checklist/checklist.module';
import { TaskModule } from './task/task.module';

export const Imports = [PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
}), AuthModule, CheckListModule, TaskModule, UtilsModule]

export const Controllers = [AppController]
export const Services = [AppService]