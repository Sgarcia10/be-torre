import { IsString, IsNotEmpty } from 'class-validator';

export class CXRequest {
  @IsString()
  @IsNotEmpty()
  sourceAmount: string;

  @IsString()
  @IsNotEmpty()
  sourceCurrencyCode: string;

  @IsString()
  @IsNotEmpty()
  destinationCurrencyCode: string;
}
