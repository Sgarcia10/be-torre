import { IsString, IsNotEmpty } from 'class-validator';

export class CXResponse {
  @IsString()
  @IsNotEmpty()
  sourceAmount: string;

  @IsString()
  @IsNotEmpty()
  sourceCurrencyCode: string;

  @IsString()
  @IsNotEmpty()
  destinationCurrencyCode: string;

  @IsString()
  @IsNotEmpty()
  destinationAmount: string;
}
