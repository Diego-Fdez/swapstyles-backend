import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { throwHttpException } from 'src/utils/error.manager';
import { UsersEntity } from 'src/users/entities/users.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
  ) {}

  //function to create a new product
  public async createProduct(body: CreateProductDTO): Promise<ProductsEntity> {
    try {
      //check if the user exists in the database
      const userExist = await this.userRepository.findOne({
        where: {
          id: body.userId,
        },
      });

      //if the user does not exist, throw an error
      if (!userExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      //if the user exists and !isPremium
      if (!userExist.isPremium) {
        //check if the user has made 2 products in the same month
        const last2Insertions = await this.productRepository.query(
          `SELECT created_at FROM products WHERE user_id = ${body.userId} ORDER BY created_at DESC LIMIT 2`,
        );

        //You get the last 2 dates
        const lastInsertionDate = last2Insertions[0]?.created_at;
        const secondLastInsertionDate = last2Insertions[1]?.created_at;

        //if dates are not null
        if (lastInsertionDate & secondLastInsertionDate) {
          //check if the 2 dates are in the same month
          const isSameMonth = lastInsertionDate.getMonth() === secondLastInsertionDate.getMonth();

          if (isSameMonth) {
            //calculate the number of days until the next month
            const currentDate = new Date();
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const daysUntilNextMonth = endOfMonth.getDate() - currentDate.getDate();

            //if the user has made 2 products in the same month, throw an error
            throw new HttpException(
              `You are not yet a premium user, you must wait ${daysUntilNextMonth} days to make your next publication`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }

      //if the user exists and isPremium
      if (userExist.isPremium) body.isPremium = true;

      //if the user exists, create a new product
      return await this.productRepository.save(body);
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to get all products order by date
  public async getAllProducts(): Promise<ProductsEntity[]> {
    try {
      const products: ProductsEntity[] = await this.productRepository
        .createQueryBuilder('product')
        .select(['product', 'user.userName', 'user.isVerified', 'user.rating'])
        .leftJoin('product.user', 'user')
        .getMany();

      //if no products are found
      if (products.length === 0)
        throw new HttpException('There are no products in the database', HttpStatus.NOT_FOUND);

      return products;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to get a product by id
  public async getProductById(id: number): Promise<ProductsEntity> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .select(['product', 'user.userName', 'user.isVerified', 'user.rating'])
        .leftJoin('product.user', 'user')
        .where({ id })
        .getOne();

      //if no product is found
      if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      return product;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to update a product by id
  public async updateProductById(id: number, body: UpdateProductDTO): Promise<ProductsEntity> {
    try {
      //find product by id and update it
      const product = await this.productRepository.update({ id }, body);

      //if no user is found
      if (product.affected === 0) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to delete a product by id
  public async deleteProductById(id: number): Promise<ProductsEntity> {
    try {
      //find product by id and delete it
      const product = await this.productRepository.delete({ id });

      //if no user is found
      if (product.affected === 0) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return;
    } catch (error) {
      throwHttpException(error);
    }
  }
}
