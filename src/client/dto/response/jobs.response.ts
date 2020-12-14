export class TorreJobsResponse {
  aggregators: JobsAggregators;
  offset: number;
  results: Array<any>;
  size: number;
  total: number;
}

export class JobsAggregators {
  remote: Array<JobsAggregator>;
  organization: Array<JobsAggregator>;
  skill: Array<JobsAggregator>;
  compensationrange: Array<JobsAggregator>;
  type: Array<JobsAggregator>;
  status: Array<JobsAggregator>;
}

export class JobsAggregator {
  total: number;
  value: string;
}
