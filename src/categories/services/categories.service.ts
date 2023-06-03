import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';
import { CreateCategoriesDTO } from '../dto/categories.dto';
import { throwHttpException } from 'src/utils/error.manager';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  //function to create a category
  public async createCategory(body: CreateCategoriesDTO) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { description: body.description },
      });

      //if the category already exists, throw an error
      if (category)
        throw new HttpException(
          `Category ${body.description} already exists`,
          HttpStatus.BAD_REQUEST,
        );

      //if the category does not exist, create it
      const newCategory = await this.categoriesRepository.save(body);
      return newCategory;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to get all categories
  public async getAllCategories(): Promise<CategoriesEntity[]> {
    try {
      const categories: CategoriesEntity[] = await this.categoriesRepository.find();

      //if there are no categories, throw an error
      if (categories.length === 0)
        throw new HttpException('No categories found', HttpStatus.NOT_FOUND);

      return categories;
    } catch (error) {
      throwHttpException(error);
    }
  }
}
