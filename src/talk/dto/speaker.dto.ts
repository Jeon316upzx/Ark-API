import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SpeakerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
