import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum EventTypeEnum {
  POPUP = '팝업',
  BANNER = '배너',
  DETAIL = '상세',
}

export class CreateEventDto {
  @IsEnum(EventTypeEnum)
  @IsNotEmpty()
  type: EventTypeEnum;

  @IsString()
  @IsNotEmpty()
  img_url: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
