import { Injectable, HttpService } from '@nestjs/common';
import { CXRequest } from 'src/common/dtos/request/cx.request.dto';
import { ConfigService } from 'src/config/config.service';
import { VisaCXResponse } from './dto/response/visa.response.dto';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { BuildBasicAuth } from 'src/domain/util/buildBasicAuth';

@Injectable()
export class VisaClient {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async visaCX(cx: CXRequest): Promise<VisaCXResponse> {
    const httpsAgent = new https.Agent({
      cert: fs.readFileSync(path.resolve('certificate/cert.pem')),
      key: fs.readFileSync(path.resolve('certificate/key.pem'))
    });
    const url = this.configService.visaUrl;
    const visaCXPath = this.configService.visaForeignExchagePath;
    const basicAuthVisa = BuildBasicAuth.basicAuth(this.configService.visaUserId, this.configService.visaPassword);

    return await this.httpService
      .post(url + visaCXPath, cx, {
        httpsAgent,
        headers: { Authorization: basicAuthVisa }
      })
      .toPromise()
      .then((response) => {
        return response.data;
      });
  }
}
