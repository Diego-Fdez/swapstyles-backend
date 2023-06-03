import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductImagesDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(350)
  image1: string;

  @IsOptional()
  @IsString()
  @MaxLength(350)
  image2: string;

  @IsOptional()
  @IsString()
  @MaxLength(350)
  image3: string;
}

export class UpdateProductImagesDTO {
  @IsEmpty({ message: 'productId should be empty' })
  productId: number;

  @IsOptional()
  @IsString()
  @MaxLength(350)
  image1: string;

  @IsString()
  @MaxLength(350)
  image2: string;

  @IsString()
  @MaxLength(350)
  image3: string;
}
