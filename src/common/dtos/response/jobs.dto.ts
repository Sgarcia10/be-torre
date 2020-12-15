export class JobsResponse {
  mean: number;
  total: number;
  currency: string;
  salaries: Array<SalaryResponse>;
}

export class SalaryResponse {
  total: number;
  rangeInitial: number;
  rangeFinal: number;
  currency: string;
  periodicity: string;
}
