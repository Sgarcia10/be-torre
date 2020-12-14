import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { AxiosResponse } from 'axios';
import { TorreJobsResponse } from './dto/response/jobs.response';
import { TorreJobsRequest } from './dto/request/jobs.request';

@Injectable()
export class TorreClient {
  constructor(private configService: ConfigService, private httpService: HttpService) {}

  getJobs(body: TorreJobsRequest, currencyCode: string): Promise<AxiosResponse<TorreJobsResponse>> {
    const currencySuffix = '$';
    const currency = currencyCode + currencySuffix;
    const page = 0;
    const periodicity = 'hourly';
    const size = 0;
    const aggregate = true;
    const offset = 0;
    const url = this.configService.torreSearchUrl;
    const jobsPath = this.configService.torreJobsPath;
    const params = {
      currency,
      page,
      periodicity,
      size,
      aggregate,
      offset
    };

    return this.httpService
      .post<TorreJobsResponse>(url + jobsPath, body, {
        params
      })
      .toPromise();
  }
}
