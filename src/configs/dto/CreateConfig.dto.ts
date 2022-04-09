import { IsString, IsEnum } from 'class-validator';
import { Provider } from 'src/types';

export class CreateConfigDto {
  @IsString()
  key_name: string;

  @IsString()
  value: string;

  @IsString()
  account_name: string;

  @IsEnum(Provider)
  provider_name: string;
}
