import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/domain/logger/logger.module';
import { VisaClient } from 'src/client/visa.client';
import { CurrencyExchangeService } from 'src/core/services/torre.service';
import { TorreController } from 'src/app/controllers/torre.controller';
import { CurrencyCodeMiddleware } from 'src/domain/middlewares/currencyCodes.middleware';
import { BuildBasicAuth } from 'src/domain/util/buildBasicAuth';

@Module({
  providers: [CurrencyExchangeService, VisaClient, BuildBasicAuth],
  imports: [ConfigModule, LoggerModule, HttpModule],
  controllers: [TorreController]
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrencyCodeMiddleware).forRoutes(TorreController);
  }
}
