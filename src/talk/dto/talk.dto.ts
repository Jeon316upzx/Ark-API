import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Speaker } from '../schema/speaker.schema';

import { Type } from 'class-transformer';
import { CreateAttendeeDto } from './attendee.dto';

export class CreateTalkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  speakers: Speaker[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  attendees?: CreateAttendeeDto[];

  @IsDate()
  @Type(() => Date)
  startTime?: Date;
}
