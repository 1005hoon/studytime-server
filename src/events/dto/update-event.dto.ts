import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  name: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  inProgress: boolean;

  isDeleted?: number;
}
