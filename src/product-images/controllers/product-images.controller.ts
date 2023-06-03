import { Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductImagesService } from '../services/product-images.service';
import { CreateProductImagesDTO, UpdateProductImagesDTO } from '../dto/productImages.dto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productsImagesService: ProductImagesService) {}

  //method to create a new product image
  @Post()
  public async createProductImage(@Body() body: CreateProductImagesDTO) {
    return await this.productsImagesService.createProductImages(body);
  }

  //method to update a product image
  @Put(':id')
  public async updateProductImage(
    @Res() res: Response,
    @Body() body: UpdateProductImagesDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.productsImagesService.updateProductImages(body, id);
    return res.status(HttpStatus.OK).json({
      message: 'Product Image updated successfully',
    });
  }
}
