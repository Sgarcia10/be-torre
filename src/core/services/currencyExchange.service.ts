import { Injectable, Inject } from '@nestjs/common';
import { VisaClient } from 'src/client/visa.client';
import { CXRequest } from 'src/common/dtos/request/cx.request.dto';
import { CXResponse } from 'src/common/dtos/response/cx.response.dto';
import { Logger } from '../../domain/logger/logger.service';

@Injectable()
export class CurrencyExchangeService {
  @Inject()
  private logger: Logger;

  constructor(private visaClient: VisaClient) {}

  onModuleInit() {
    this.logger.setContext(CurrencyExchangeService.name);
  }

  async currencyExchange(cx: CXRequest): Promise<CXResponse> {
    const cExchange = await this.visaClient.visaCX(cx);

    const cExchangeResponse = new CXResponse();
    cExchangeResponse.destinationAmount = cExchange.destinationAmount;
    cExchangeResponse.destinationCurrencyCode = cx.destinationCurrencyCode;
    cExchangeResponse.sourceAmount = cx.sourceAmount;
    cExchangeResponse.sourceCurrencyCode = cx.sourceCurrencyCode;

    return cExchangeResponse;
  }
}
