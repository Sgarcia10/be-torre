import { PipeTransform, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { HttpDomainException } from '../exceptions/http.exception';

@Injectable()
export class ParseDatePipe implements PipeTransform<string> {
  format: string;
  constructor(format?: string) {
    this.format = format;
  }
  transform(value: string) {
    const momentDate = moment(value, this.format, this.format !== undefined);
    if (momentDate.isValid()) {
      return momentDate.toDate();
    } else {
      const message = 'invalid date';
      const error = this.format ? 'date should be formatted ' + this.format : undefined;
      throw new HttpDomainException({ message, error });
    }
  }
}
