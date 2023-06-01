import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StylePreferencesEntity } from '../entities/style-preferences.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { CreateStylePreferencesDTO } from '../dto/style-preferences.dto';
import { throwHttpException } from 'src/utils/error.manager';

@Injectable()
export class StylePreferencesService {
  constructor(
    @InjectRepository(StylePreferencesEntity)
    private readonly stylePreferencesRepository: Repository<StylePreferencesEntity>,
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
  ) {}

  //function to insert style preferences into database for a user
  public async createPreferences(body: CreateStylePreferencesDTO) {
    try {
      const userFound = await this.userRepository.findOne({
        where: { id: body.userId },
      });
      if (!userFound) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const newPreferences = this.stylePreferencesRepository.create(body);

      const savedPreferences = await this.stylePreferencesRepository.save(newPreferences);

      userFound.userPreferences = savedPreferences;
      return await this.userRepository.save(userFound);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
