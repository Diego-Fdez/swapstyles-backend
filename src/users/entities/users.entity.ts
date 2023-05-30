import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { UserInterface } from 'src/interfaces/user.interface';

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

  @Column({ nullable: true })
  isVerified: boolean;

  @Column({ nullable: true })
  rating: number;

  @Column()
  profilePicture: string;
}
