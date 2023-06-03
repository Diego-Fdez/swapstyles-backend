import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { StylePreferencesModule } from './style-preferences/style-preferences.module';
import { CategoriesModule } from './categories/categories.module';
import { ConditionModule } from './condition/condition.module';
import { ProductImagesModule } from './product-images/product-images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    ProductsModule,
    StylePreferencesModule,
    CategoriesModule,
    ConditionModule,
    ProductImagesModule,
  ],
})
export class AppModule {}
