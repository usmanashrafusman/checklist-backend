import { Injectable } from '@nestjs/common';
import { RESPONSE_MESSAGES } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ITask } from 'src/types';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) { }

  async push(tasks: ITask[], userId: string) {

    const allDeleted = [];
    const newAdded = [];

    for (let i = 0; i < tasks.length; i++) {
      const task: ITask = tasks[i];

      if (task.isDeleted) {
        const promise = this.prismaService.task.upsert({
          where: {
            id: task.id
          },
          update: {
            id: task.id,
            name: task.name,
            isDeleted: task.isDeleted,
            checklistId: task.checklist,
            userId,
          },
          create: {
            id: task.id,
            name: task.name,
            isDeleted: task.isDeleted,
            checklistId: task.checklist,
            userId,
          }
        })
        allDeleted.push(promise)
      } else {
        newAdded.push({
          id: task.id,
          name: task.name,
          isDeleted: task.isDeleted,
          checklistId: task.checklist,
          userId,
        })
      }
    }
    const isAllAdded = await this.prismaService.task.createMany({
      data: newAdded
    });
    const isAllDeleted = await Promise.all(allDeleted)

    if (isAllAdded && isAllDeleted) {
      return {
        data: tasks,
        messages: [{
          code: 200,
          message: RESPONSE_MESSAGES.CHECKLIST_ADDED
        }]
      };
    }
    return {
      data: null,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.UNKNOWN_ERROR_OCCURED
      }]
    };
  }

  async pull(timeStamp: number, userId: string) {
    const where: Prisma.TaskWhereInput = { userId }
    if (timeStamp) {
      where.updatedAt = {
        gte: new Date(timeStamp)
      }
    }
    const data = await this.prismaService.task.findMany({
      where,
      select: {
        id: true,
        name: true,
        isDeleted: true,
        createdAt: true,
        checklistId: true
      }
    })
    return {
      data: data.map((d) => {
        return {
          ...d,
          checklist: d.checklistId
        }
      }),
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.CHECKLIST_ADDED
      }]
    };
  }
}
