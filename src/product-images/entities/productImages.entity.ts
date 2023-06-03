import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { ProductImagesInterface } from 'src/interfaces/productImages.interface';

// database table
@Entity({ name: 'product_images' })
export class ProductImagesEntity extends BaseEntity implements ProductImagesInterface {
  @Column({ nullable: false })
  image1: string;

  @Column({ nullable: true })
  image2: string;

  @Column({ nullable: true })
  image3: string;

  @Column()
  productId: number;
}
