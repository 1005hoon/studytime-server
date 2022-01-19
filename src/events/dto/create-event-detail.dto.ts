import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateEventDetailDto {
  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value))
  eventId: number;

  @IsString()
  type: string;

  @IsString()
  url1: string;

  @IsString()
  urlButtonName1: string;

  @IsString()
  url2: string;

  @IsString()
  urlButtonName2: string;

  @IsString()
  description: string;
}
