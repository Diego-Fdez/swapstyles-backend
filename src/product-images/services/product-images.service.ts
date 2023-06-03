import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImagesEntity } from '../entities/productImages.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { CreateProductImagesDTO, UpdateProductImagesDTO } from '../dto/productImages.dto';
import { throwHttpException } from 'src/utils/error.manager';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImagesEntity)
    private readonly productImagesRepository: Repository<ProductImagesEntity>,
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  //function to insert productImages into database for a product
  public async createProductImages(body: CreateProductImagesDTO) {
    try {
      //search for product in database
      const productFound = await this.productsRepository.findOne({
        where: { id: body.productId },
      });

      //if product not found, throw error
      if (!productFound) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      //create new productImages and save them in database
      const newImages = this.productImagesRepository.create(body);
      const savedImages = await this.productImagesRepository.save(newImages);

      //add productImages to products
      productFound.productImages = savedImages;
      return await this.productsRepository.save(productFound);
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to update productImages in database
  public async updateProductImages(body: UpdateProductImagesDTO, id: number) {
    try {
      //find productImages by id and update it
      const productImages = await this.productImagesRepository.update({ id }, body);

      //if no productImages is found
      if (productImages.affected === 0) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return;
    } catch (error) {
      throwHttpException(error);
    }
  }
}
