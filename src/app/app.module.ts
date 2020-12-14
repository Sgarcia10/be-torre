import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { LoggerModule } from '../domain/logger/logger.module';
import * as morgan from 'morgan';
import { Logger } from '../domain/logger/logger.service';
import { HealthModule } from './modules/health.module';
import { ConfigModule } from 'src/config/config.module';
import { CurrencyExchangeModule } from './modules/currencyExchange.module';
import { CurrencyCodeMiddleware } from 'src/domain/middlewares/currencyCodes.middleware';
import { CurrencyExchangeController } from './controllers/currencyExchange.controller';

@Module({
  imports: [LoggerModule, ConfigModule, HealthModule, CurrencyExchangeModule]
})
export class AppModule implements NestModule {
  constructor(private logger: Logger) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('tiny', { stream: this.logger.stream })).forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(CurrencyCodeMiddleware).forRoutes(CurrencyExchangeController);
  }
}
