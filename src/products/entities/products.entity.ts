import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { ProductInterface } from 'src/interfaces/products.interface';
import { Categories } from 'src/constants';
import { UsersEntity } from 'src/users/entities/users.entity';

// database table
@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity implements ProductInterface {
  @Column({ type: 'enum', enum: Categories })
  category: Categories;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  size: string;

  @Column()
  condition: string;

  @Column()
  range: number;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  color: string;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: true })
  status: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => UsersEntity, (user) => user.products)
  user: UsersEntity;
}
