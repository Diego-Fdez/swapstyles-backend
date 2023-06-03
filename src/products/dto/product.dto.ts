import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(75)
  category: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(75)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(350)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  size: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(350)
  condition: string;

  @IsNotEmpty()
  @IsNumber()
  range: number;

  @IsOptional()
  @IsString()
  @MaxLength(75)
  brand: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  color: string;

  @IsOptional()
  @IsEmpty({ message: 'The field must have no value when it is sent as default.' })
  isPremium: boolean;

  @IsOptional()
  @IsEmpty({ message: 'The field must have no value when it is sent as default.' })
  status: boolean;
}

export class UpdateProductDTO {
  @IsEmpty({ message: 'The field userId must have no value when it is sent as default.' })
  userId: number;

  @IsString()
  @IsOptional()
  @MaxLength(75)
  category: string;

  @IsOptional()
  @IsString()
  @MaxLength(75)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(350)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  size: string;

  @IsOptional()
  @IsString()
  @MaxLength(350)
  condition: string;

  @IsOptional()
  @IsNumber()
  range: number;

  @IsOptional()
  @IsString()
  @MaxLength(75)
  brand: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  color: string;

  @IsEmpty({ message: 'The field isPremium must have no value when it is sent as default.' })
  isPremium: boolean;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
