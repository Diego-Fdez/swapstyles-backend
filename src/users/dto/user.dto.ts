import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(75)
  email: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  location: string;

  @IsOptional()
  @IsBoolean()
  @IsEmpty({ message: 'The field must have no value when it is sent as default.' })
  isVerified: boolean;

  @IsOptional()
  @IsNumber()
  @MaxLength(2)
  @IsEmpty({ message: 'The field must have no value when it is sent as default.' })
  rating: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  profilePicture: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  userName: string;

  @IsOptional()
  @IsEmpty({ message: 'The email field must have no value when it is sent as default.' })
  email: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  location: string;

  @IsOptional()
  @IsEmpty({ message: 'isVerified field must have no value when it is sent as default.' })
  isVerified: boolean;

  @IsOptional()
  @IsEmpty({ message: 'rating field must have no value when it is sent as default.' })
  rating: number;

  @IsOptional()
  @IsEmpty({ message: 'the profilePicture field must have no value when it is sent as default.' })
  profilePicture: string;
}
