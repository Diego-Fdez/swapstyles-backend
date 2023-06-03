import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //method to register a product
  @Post()
  public async registerProduct(@Body() body: CreateProductDTO) {
    return await this.productsService.createProduct(body);
  }

  //method to get all products
  @Get()
  public async getAllProducts(@Res() res: Response) {
    const products = await this.productsService.getAllProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  //method to get a product by id
  @Get(':id')
  public async getProductById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.getProductById(id);
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  //method to update a product
  @Put(':id')
  public async updateProduct(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDTO,
  ) {
    await this.productsService.updateProductById(id, body);
    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
    });
  }

  //method to delete a product
  @Delete(':id')
  public async deleteProduct(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    await this.productsService.deleteProductById(id);
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted successfully',
    });
  }
}
