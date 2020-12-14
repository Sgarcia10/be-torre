import { Body, Controller, HttpStatus, Post, Headers } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CXRequest } from 'src/common/dtos/request/cx.request.dto';
import { CXResponse } from 'src/common/dtos/response/cx.response.dto';
import { AppRoutes } from 'src/common/routes/app.route';
import { CurrencyExchangeService } from 'src/core/services/currencyExchange.service';

@ApiTags('Currency Exchange')
@Controller(AppRoutes.version + AppRoutes.currency_exchange)
export class CurrencyExchangeController {
  constructor(private CXService: CurrencyExchangeService) {}

  @Post()
  @ApiOkResponse({ status: HttpStatus.OK })
  async currencyExchange(@Headers('x-country') country: string, @Body() body: CXRequest): Promise<CXResponse> {
    return this.CXService.currencyExchange(body);
  }
}
