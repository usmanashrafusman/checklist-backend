import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUser {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}