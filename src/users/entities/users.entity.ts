import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { UserInterface } from 'src/interfaces/user.interface';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { StylePreferencesEntity } from 'src/style-preferences/entities/style-preferences.entity';

// database table
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements UserInterface {
  @Column()
  sub: string;

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

  @Column({ default: false })
  isPremium: boolean;

  @OneToMany(() => ProductsEntity, (product) => product.user)
  products: ProductsEntity[];

  @OneToOne(() => StylePreferencesEntity)
  @JoinColumn()
  userPreferences: StylePreferencesEntity;
}
