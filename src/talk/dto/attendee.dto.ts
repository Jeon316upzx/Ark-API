import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAttendeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
