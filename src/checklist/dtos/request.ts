import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsBoolean } from 'class-validator';

export class CheckList {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    id: string

    @IsBoolean()
    isDeleted: boolean
}

export class CheckLists {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckList)
    data: CheckList[]
}
