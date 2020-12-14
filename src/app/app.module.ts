import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { LoggerModule } from '../domain/logger/logger.module';
import * as morgan from 'morgan';
import { Logger } from '../domain/logger/logger.service';
import { HealthModule } from './modules/health.module';
import { ConfigModule } from 'src/config/config.module';
import { TorreModule } from './modules/torre.module';

@Module({
  imports: [LoggerModule, ConfigModule, HealthModule, TorreModule]
})
export class AppModule implements NestModule {
  constructor(private logger: Logger) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('tiny', { stream: this.logger.stream })).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
