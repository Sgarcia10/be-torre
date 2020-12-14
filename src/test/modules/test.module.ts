import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/domain/logger/logger.module';
import { VisaClient } from 'src/client/visa.client';
import { CurrencyExchangeService } from 'src/core/services/currencyExchange.service';
import { CurrencyExchangeController } from 'src/app/controllers/currencyExchange.controller';
import { CurrencyCodeMiddleware } from 'src/domain/middlewares/currencyCodes.middleware';
import { BuildBasicAuth } from 'src/domain/util/buildBasicAuth';

@Module({
  providers: [CurrencyExchangeService, VisaClient, BuildBasicAuth],
  imports: [ConfigModule, LoggerModule, HttpModule],
  controllers: [CurrencyExchangeController]
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrencyCodeMiddleware).forRoutes(CurrencyExchangeController);
  }
}
