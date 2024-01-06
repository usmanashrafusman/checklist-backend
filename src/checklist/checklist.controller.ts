import { Controller, Post, Body, Req, Get, Query } from '@nestjs/common';
import { ResponseDto } from 'src/dtos';

import { CheckLists } from './dtos/request';
import { CheckListService } from './checklist.service';
import { ICheckList, Request } from 'src/types';
import { timestamp } from 'rxjs';

@Controller("checklist")
export class CheckListController {
  constructor(private readonly checkListService: CheckListService) { }

  @Post()
  async push(@Body() body: CheckLists, @Req() req: Request): Promise<ResponseDto<ICheckList[]>> {
    const userId = req.user.id;
    const checklist: ResponseDto<ICheckList[]> = await this.checkListService.push(body.data, userId);
    return checklist;
  }

  @Get()
  async pull(@Query("minTimestamp") timestamp: number, @Req() req: Request): Promise<ResponseDto<ICheckList[]>> {
    const userId = req.user.id;
    timestamp = Number(timestamp)
    const checklist: ResponseDto<ICheckList[]> = await this.checkListService.pull(timestamp, userId);
    return checklist;
  }

}
