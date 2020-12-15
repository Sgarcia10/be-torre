export class JobsResponse {
  mean: number;
  total: number;
  currency: string;
  salaries: Array<SalaryResponse>;
}

export class SalaryResponse {
  total: number;
  amount: number;
  currency: string;
  periodicity: string;
}
