import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { UtilsService } from "src/utils/utils.service";

import { ERROR_CODES } from 'src/common';
import { Request } from "src/types";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly utilsService: UtilsService) { }
    async use(req: Request, _: Response, next: NextFunction) {
        try {
            const token = req.headers["authorization"] || req.headers["Authorization"] as string;
            if (!token) {
                throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
            }

            const user = this.utilsService.decodeToken(token);
            if (!user) {
                throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
            }
            req.user = user;
            next();
        } catch (error) {
            throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
        }
    }
}
