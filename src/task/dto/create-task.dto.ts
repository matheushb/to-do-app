import { ApiProperty } from '@nestjs/swagger';
import { Situation } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsEnum(Situation)
  situation?: Situation;

  @ApiProperty()
  @IsString()
  deadline?: Date;

  @ApiProperty()
  @IsString()
  user_id: string;
}
