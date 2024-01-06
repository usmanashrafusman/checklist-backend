import { Module } from '@nestjs/common';

import { CheckListController } from './checklist.controller';
import { CheckListService } from './checklist.service';
@Module({
    imports: [],
    providers: [CheckListService],
    controllers: [CheckListController]
})

export class CheckListModule { };