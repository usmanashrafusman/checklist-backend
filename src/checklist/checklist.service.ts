import { Injectable } from '@nestjs/common';
import { RESPONSE_MESSAGES } from 'src/common';
import { CheckList } from './dtos/request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CheckListService {
  constructor(private readonly prismaService: PrismaService) { }

  async push(checklists: CheckList[], userId: string) {
    const allDeleted = [];
    const newAdded = [];

    for (let i = 0; i < checklists.length; i++) {
      const checkList: CheckList = checklists[i];
      if (checkList.isDeleted) {
        const promise = this.prismaService.checkList.upsert({
          where: {
            id: checkList.id
          },
          update: {
            ...checkList
          },
          create: {
            ...checkList,
            userId
          }
        })
        allDeleted.push(promise)
      } else {
        newAdded.push({ ...checkList, userId })
      }
    }

    const isAllAdded = await this.prismaService.checkList.createMany({
      data: newAdded
    });

    const isAllDeleted = await Promise.all(allDeleted);

    if (isAllAdded && isAllDeleted) {
      return {
        data: checklists,
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
    const where: Prisma.CheckListWhereInput = {userId}
    if (timeStamp) {
      where.updatedAt = {
        gte: new Date(timeStamp)
      }
    }
    const data = await this.prismaService.checkList.findMany({
      where,
      select: {
        id: true,
        name: true,
        isDeleted: true,
        createdAt: true
      }
    })
    return {
      data,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.CHECKLIST_ADDED
      }]
    };
  }
}
