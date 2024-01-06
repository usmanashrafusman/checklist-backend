import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/utils/utils.service';
import { RESPONSE_MESSAGES, ERROR_CODES } from 'src/common';
import { RegisterUser } from './dtos/request';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from 'src/types';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private utilsService: UtilsService, private configService: ConfigService) { }

  async registerUser(body: RegisterUser) {
    const isExist = await this.prismaService.user.findFirst({ where: { username: body.username } });

    if (isExist) {
      const isValidPassword = await this.utilsService.comparePassword(body.password, isExist.password);
      if (!isValidPassword) {
        throw new BadRequestException(ERROR_CODES.INVALID_PASSWORD);
      };
      const user = {
        id: isExist.id,
        username: isExist.username
      }
      const token = this.utilsService.generateToken(user);
      return {
        data: { token, user },
        messages: [{
          code: 200,
          message: RESPONSE_MESSAGES.LOGIN_SUCCESSFUL
        }]
      };
    }

    const hashPassword = await this.utilsService.generateHash(body.password);
    const user = await this.prismaService.user.create({
      data: {
        password: hashPassword,
        username: body.username
      },
      select: {
        id: true,
        username: true
      }
    })
    const token = this.utilsService.generateToken(user);
    return {
      data: { token, user },
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.LOGIN_SUCCESSFUL
      }]
    };
  }

  async getUser(user: IUser) {
    return {
      data: user,
      messages: [{
        code: 200,
        message: RESPONSE_MESSAGES.USER_IS_AUTHENTICATED
      }]
    };
  }
}