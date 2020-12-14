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
      return TorreJobsToJobsMapper.map(data);
    } catch (error) {
      console.log(error.response?.data ?? error);

      throw new HttpDomainException({ message: 'Can not get data from torre' });
    }
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
