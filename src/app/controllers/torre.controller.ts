import { Controller, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TorreParams } from 'src/common/dtos/request/torreParams.dto';
import { JobsResponse } from 'src/common/dtos/response/jobs.dto';
import { TorreService } from 'src/core/services/torre.service';

@ApiTags('Currency Exchange')
@Controller('')
export class TorreController {
  constructor(private torreService: TorreService) {}

  @Get()
  @ApiOkResponse({ status: HttpStatus.OK })
  async currencyExchange(@Query() params: TorreParams): Promise<JobsResponse> {
    return this.torreService.getJobs(params);
  }
}
