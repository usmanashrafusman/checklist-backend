import { Controller, Post, Body, Res, Get, Param, Headers, Req } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/dtos';

import { RegisterUser } from './dtos/request';
import { UserResponse } from './dtos/response';
import { AuthService } from './auth.service';
import { IUser, Request } from 'src/types';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async createOrLoginUser(@Body("data") body: RegisterUser): Promise<ResponseDto<UserResponse>> {
    const user: ResponseDto<UserResponse> = await this.authService.registerUser(body);
    return user;
  }

  @Get()
  async getLogedInUser(@Req() req: Request): Promise<ResponseDto<IUser>> {
    const user: ResponseDto<IUser> = await this.authService.getUser(req.user);
    return user;
  }

}
