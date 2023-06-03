import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { ConditionsInterface } from 'src/interfaces/conditions.interface';

@Entity({ name: 'conditions' })
export class ConditionsEntity extends BaseEntity implements ConditionsInterface {
  @Column()
  description: string;
}
