import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateConditionsDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  description: string;
}
