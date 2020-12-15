import { Injectable, Inject } from '@nestjs/common';
import { TorreJobsRequest } from 'src/client/dto/request/jobs.request';
import { TorreClient } from 'src/client/torre.client';
import { TorreParams } from 'src/common/dtos/request/torreParams.dto';
import { JobsResponse } from 'src/common/dtos/response/jobs.dto';
import { TorreTypeParam } from 'src/domain/enums/torreType.enum';
import { HttpDomainException } from 'src/domain/exceptions/http.exception';
import { TorreJobsToJobsMapper } from 'src/domain/utils/torreJobsToJobs.mapper';
import { Logger } from '../../domain/logger/logger.service';

@Injectable()
export class TorreService {
  @Inject()
  private logger: Logger;

  constructor(private torreClient: TorreClient) {}

  onModuleInit() {
    this.logger.setContext(TorreService.name);
  }

  async getJobs(params: TorreParams): Promise<JobsResponse> {
    const body = this.buildBody(params);
    try {
      const { data } = await this.torreClient.getJobs(body, params.currency);
      const jobs = TorreJobsToJobsMapper.map(data);
      jobs.currency = params.currency;
      jobs.total = this.calculateTotal(jobs);
      jobs.mean = this.calculateMean(jobs);
      return jobs;
    } catch (error) {
      console.log(error.response?.data ?? error);

      throw new HttpDomainException({ message: 'Can not get data from torre' });
    }
  }

  calculateTotal(jobs: JobsResponse): number {
    return jobs.salaries
      .map((s) => s.total)
      .reduce((a, b) => {
        return a + b;
      });
  }

  calculateMean(jobs: JobsResponse): number {
    return jobs.salaries
      .map((s) => {
        return (s.amount * s.total) / (2 * jobs.total);
      })
      .reduce((a, b) => {
        return a + b;
      });
  }

  buildBody(params: TorreParams): TorreJobsRequest {
    const { language, remote, type } = params;
    if (!language) throw new HttpDomainException({ message: 'Invalid language' });
    const t = new TorreJobsRequest();
    t['skill/role'].text = language;
    if (remote) {
      t.remote.term = true;
    } else {
      delete t.remote;
    }

    if (type) {
      t.type.code = TorreTypeParam[type];
    } else {
      delete t.type;
    }

    return t;
  }
}
