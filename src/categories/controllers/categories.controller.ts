import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoriesDTO } from '../dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //method to create a new category
  @Post()
  async createCategory(@Res() res: Response, @Body() body: CreateCategoriesDTO) {
    const category = await this.categoriesService.createCategory(body);
    return res.status(HttpStatus.OK).json({
      category,
    });
  }

  //method to get all categories
  @Get()
  async getCategories(@Res() res: Response) {
    const categories = await this.categoriesService.getAllCategories();
    return res.status(HttpStatus.OK).json({
      categories,
    });
  }
}
