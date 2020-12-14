import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Exceptions } from 'src/common/exceptions/exceptions.constant';
import { HttpDomainException } from '../exceptions/http.exception';

const codes = ['840', '604', '170', '484', '32'];

@Injectable()
export class CurrencyCodeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next) {
    const sourceCurrency = codes.filter((obj) => obj === req.body.sourceCurrencyCode);
    const destinationCurrency = codes.filter((obj) => obj === req.body.destinationCurrencyCode);
    if (!sourceCurrency.length || !destinationCurrency.length) {
      throw new HttpDomainException({
        message: Exceptions.INVALID_CURRENCY_CODE.MESSAGE,
        code: Exceptions.CODE_400,
        error: Exceptions.INVALID_CURRENCY_CODE.ERROR
      });
    }
    next();
  }
}
