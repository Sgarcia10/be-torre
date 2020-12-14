import { JobsAggregator, TorreJobsResponse } from 'src/client/dto/response/jobs.response';
import { JobsResponse, SalaryResponse } from 'src/common/dtos/response/jobs.dto';

export class TorreJobsToJobsMapper {
  static map(torreJobs: TorreJobsResponse): JobsResponse {
    return {
      mean: 0,
      salaries: torreJobs.aggregators.compensationrange.map(this.mapCompensationRangeToSalary)
    };
  }

  static mapCompensationRangeToSalary(rangeAggregator: JobsAggregator): SalaryResponse {
    const [currency, rangePerPeriod] = rangeAggregator.value.split('$ ');
    const [range, periodicity] = rangePerPeriod.split('/');
    const [rangeInitialStr, rangeFinalStr] = range.split('-');
    const rangeInitial = Number(rangeInitialStr.replace('>', ''));
    const rangeFinal = Number(rangeFinalStr?.replace('>', ''));
    return {
      currency,
      periodicity,
      rangeInitial,
      rangeFinal,
      total: rangeAggregator.total
    };
  }
}
