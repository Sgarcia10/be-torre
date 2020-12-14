import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { visaClientErrorMock, visaClientMock } from '../mocks/visa.mock';
import { TestModule } from '../modules/test.module';
import { CXRequestTest, DestinationCurrencyCodeError, SourceCurrencyCodeError } from '../request/cx.request';
import * as request from 'supertest';
import { VisaResponse } from '../response/visa.response';
import * as nock from 'nock';

describe('HealthService', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(10000);
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule]
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await app.close();
  });

  describe('post', () => {
    it('should return the object response of currency code from visa', async () => {
      visaClientMock();

      await request(app.getHttpServer()).post('/v1.0/cx').send(CXRequestTest).set({ 'x-country': 'PE' }).expect(201, {
        destinationAmount: VisaResponse.destinationAmount,
        destinationCurrencyCode: CXRequestTest.destinationCurrencyCode,
        sourceAmount: CXRequestTest.sourceAmount,
        sourceCurrencyCode: CXRequestTest.sourceCurrencyCode
      });
    });

    it('should return error for the currency code by sourceCurrencyCode', async () => {
      visaClientMock();

      await request(app.getHttpServer())
        .post('/v1.0/cx')
        .send(SourceCurrencyCodeError)
        .set({ 'x-country': 'PE' })
        .expect(400, {
          statusCode: 400,
          message: 'invalid_currency_code'
        });
    });

    it('should return error for the currency code by destinationCurrencyCode', async () => {
      visaClientMock();

      await request(app.getHttpServer())
        .post('/v1.0/cx')
        .send(DestinationCurrencyCodeError)
        .set({ 'x-country': 'PE' })
        .expect(400, {
          statusCode: 400,
          message: 'invalid_currency_code'
        });
    });

    it('should return error visa client', async () => {
      visaClientErrorMock();

      await request(app.getHttpServer()).post('/v1.0/cx').send(CXRequestTest).set({ 'x-country': 'PE' }).expect(500, {
        statusCode: 500,
        message: 'Internal server error'
      });
    });
  });
});
