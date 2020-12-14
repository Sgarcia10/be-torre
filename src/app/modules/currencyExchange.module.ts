import { HttpModule, Module } from '@nestjs/common';
import { VisaClient } from 'src/client/visa.client';
import { CurrencyExchangeService } from 'src/core/services/currencyExchange.service';
import { LoggerModule } from 'src/domain/logger/logger.module';
import { BuildBasicAuth } from 'src/domain/util/buildBasicAuth';
import { CurrencyExchangeController } from '../controllers/currencyExchange.controller';

@Module({
  providers: [CurrencyExchangeService, VisaClient, BuildBasicAuth],
  imports: [LoggerModule, HttpModule],
  controllers: [CurrencyExchangeController]
})
export class CurrencyExchangeModule {}
