import { CXRequest } from 'src/common/dtos/request/cx.request.dto';

export const CXRequestTest: CXRequest = {
  sourceAmount: '100',
  sourceCurrencyCode: '484',
  destinationCurrencyCode: '840'
};

export const SourceCurrencyCodeError: CXRequest = {
  sourceAmount: '100',
  sourceCurrencyCode: '4841',
  destinationCurrencyCode: '840'
};

export const DestinationCurrencyCodeError: CXRequest = {
  sourceAmount: '100',
  sourceCurrencyCode: '484',
  destinationCurrencyCode: '8402'
};
