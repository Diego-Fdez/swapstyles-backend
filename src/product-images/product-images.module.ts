import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesService } from './services/product-images.service';
import { ProductImagesController } from './controllers/product-images.controller';
import { ProductImagesEntity } from './entities/productImages.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImagesEntity, ProductsEntity])],
  providers: [ProductImagesService],
  controllers: [ProductImagesController],
  exports: [TypeOrmModule],
})
export class ProductImagesModule {}
