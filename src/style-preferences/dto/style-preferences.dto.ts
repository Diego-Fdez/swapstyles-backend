import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStylePreferencesDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  preference1: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  preference2: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  preference3: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  preference4: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  preference5: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  preference6: string;
}

export class UpdateStylePreferencesDTO {
  @IsEmpty({ message: 'userId should be empty' })
  userId: number;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  preference1: string;

  @IsString()
  @MaxLength(70)
  preference2: string;

  @IsString()
  @MaxLength(70)
  preference3: string;

  @IsString()
  @MaxLength(70)
  preference4: string;

  @IsString()
  @MaxLength(70)
  preference5: string;

  @IsString()
  @MaxLength(70)
  preference6: string;
}
