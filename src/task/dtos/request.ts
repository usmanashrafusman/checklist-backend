import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsBoolean } from 'class-validator';
export class Task {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    id: string

    @IsBoolean()
    isDeleted: boolean

    @IsNotEmpty()
    @IsString()
    checklist: string

}

export class TaskLists {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Task)
    data: Task[]
}
