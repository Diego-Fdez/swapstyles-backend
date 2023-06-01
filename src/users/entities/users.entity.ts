import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { UserInterface } from 'src/interfaces/user.interface';
import { ProductsEntity } from 'src/products/entities/products.entity';

// database table
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements UserInterface {
  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  location: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  rating: number;

  @Column()
  profilePicture: string;

  @OneToMany(() => ProductsEntity, (product) => product.user)
  products: ProductsEntity[];
}
