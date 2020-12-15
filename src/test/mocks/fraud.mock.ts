import * as nock from 'nock';
import { StatusCodes } from 'http-status-codes';
import { torreResponseOk1 } from './torreResponseOk1.mock';

const url = 'https://search.torre.co';

export const torreSearchIsOk1 = () => {
  nock(url)
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/opportunities/_search/')
    .query(() => {
      return true;
    })
    .reply(StatusCodes.OK, torreResponseOk1);
};
