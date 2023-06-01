import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { StylePreferencesInterface } from 'src/interfaces/style-preferences.interface';

// database table
@Entity({ name: 'style_preferences' })
export class StylePreferencesEntity extends BaseEntity implements StylePreferencesInterface {
  @Column()
  preference1: string;

  @Column({ nullable: true })
  preference2: string;

  @Column({ nullable: true })
  preference3: string;

  @Column({ nullable: true })
  preference4: string;

  @Column({ nullable: true })
  preference5: string;

  @Column({ nullable: true })
  preference6: string;

  @Column()
  userId: number;
}
