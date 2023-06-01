import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import { throwHttpException } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
  ) {}

  //function to create a new user
  public async createUser(body: CreateUserDTO): Promise<UsersEntity> {
    try {
      const userExist = await this.userRepository.findOne({
        where: {
          email: body.email,
        },
      });

      if (userExist) {
        throw new HttpException('User already exist', HttpStatus.CONFLICT);
      }

      return await this.userRepository.save(body);
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to get all users
  public async getAllUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      //if no users are found
      if (users.length === 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to get a user by sub
  public async getUserBySub(id: number): Promise<UsersEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['userPreferences', 'products'],
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to update a user
  public async updateUser(id: number, body: UpdateUserDTO): Promise<UsersEntity> {
    try {
      //find user by sub and update it
      const user = await this.userRepository.update({ id }, body);

      //if no user is found
      if (user.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return;
    } catch (error) {
      throwHttpException(error);
    }
  }
}
