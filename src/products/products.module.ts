import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsEntity } from './entities/products.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, UsersEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
