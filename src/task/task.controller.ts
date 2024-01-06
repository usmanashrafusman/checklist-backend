import { Controller, Post, Body, Req, Get, Query } from '@nestjs/common';
import { ResponseDto } from 'src/dtos';

import { TaskLists } from './dtos/request';
import { TaskService } from './task.service';
import { ITask, Request } from 'src/types';

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async push(@Body() body: TaskLists, @Req() req: Request): Promise<ResponseDto<ITask[]>> {
    const userId = req.user.id;
    const tasks: ResponseDto<ITask[]> = await this.taskService.push(body.data, userId);
    return tasks;
  }

  @Get()
  async pull(@Query("minTimestamp") timestamp: number, @Req() req: Request): Promise<ResponseDto<ITask[]>> {
    const userId = req.user.id;
    timestamp = Number(timestamp)
    const tasks: ResponseDto<ITask[]> = await this.taskService.pull(timestamp, userId);
    return tasks;
  }

}
