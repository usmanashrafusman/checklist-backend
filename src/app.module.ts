import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Imports, Controllers, Services } from './app.imports';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: Imports,
  controllers: Controllers,
  providers: Services,
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({ path: '/auth', method: RequestMethod.POST, }).forRoutes('/');
  }
}