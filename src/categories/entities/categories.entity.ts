import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { CategoriesInterface } from 'src/interfaces/categories.interface';

@Entity({ name: 'categories' })
export class CategoriesEntity extends BaseEntity implements CategoriesInterface {
  @Column()
  description: string;
}
