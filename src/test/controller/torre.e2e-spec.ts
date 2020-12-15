import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/domain/logger/logger.module';
import { TorreModule } from 'src/app/modules/torre.module';
import * as nock from 'nock';
import { torreSearchIsOk1 } from '../mocks/fraud.mock';
import { JobsResponse } from 'src/common/dtos/response/jobs.dto';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TorreModule, ConfigModule, LoggerModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    torreSearchIsOk1();
    const expectedJobsSalaries: JobsResponse = {
      currency: 'USD',
      mean: 75336.10815939278,
      total: 1581,
      salaries: [
        {
          currency: 'COP',
          periodicity: 'hourly',
          amount: 19500.5,
          total: 300
        },
        {
          currency: 'COP',
          periodicity: 'hourly',
          amount: 39000.5,
          total: 256
        },
        {
          currency: 'COP',
          periodicity: 'hourly',
          amount: 78000.5,
          total: 135
        },
        {
          currency: 'COP',
          periodicity: 'hourly',
          amount: 156000.5,
          total: 444
        },
        {
          currency: 'COP',
          periodicity: 'hourly',
          amount: 312000.5,
          total: 413
        },
        {
          currency: 'COP',
          periodicity: 'hourly',
          amount: 416000,
          total: 33
        }
      ]
    };
    const query = '?language=javascript&currency=USD';
    return request(app.getHttpServer())
      .get('/torre' + query)
      .expect(200)
      .expect(expectedJobsSalaries);
  });
});
