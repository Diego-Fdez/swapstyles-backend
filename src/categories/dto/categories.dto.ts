import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriesDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(75)
  description: string;
}
