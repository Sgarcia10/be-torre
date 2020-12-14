import * as nock from 'nock';
import { StatusCodes } from 'http-status-codes';
import { VisaResponse } from '../response/visa.response';

const url = 'https://localhost';

export const visaClientMock = () => {
  nock(url).post('/forexrates/v1/foreignexchangerates').reply(StatusCodes.OK, VisaResponse);
};

export const visaClientErrorMock = () => {
  nock(url).post('/forexrates/v1/foreignexchangerates').reply(StatusCodes.BAD_REQUEST);
};
