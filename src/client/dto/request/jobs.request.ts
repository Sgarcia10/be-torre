export class TorreJobsRequest {
  'skill/role' = {
    text: '',
    experience: 'potential-to-develop'
  };
  remote = {
    term: true
  };
  type = { code: '' };
}

export class TorreJobsRequestAnd {
  and: Record<string, any>[];

  constructor(t: TorreJobsRequest) {
    this.and = [];
    Object.keys(t).forEach((k) => {
      const j = {};
      j[k] = t[k];
      this.and.push(j);
    });
  }
}
