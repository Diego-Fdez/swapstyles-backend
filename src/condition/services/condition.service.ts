import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConditionsEntity } from '../entities/conditions.entity';
import { CreateConditionsDTO } from '../dto/conditions.dto';
import { throwHttpException } from 'src/utils/error.manager';

@Injectable()
export class ConditionService {
  constructor(
    @InjectRepository(ConditionsEntity)
    private readonly conditionsRepository: Repository<ConditionsEntity>,
  ) {}

  //function to create a condition
  public async createCondition(body: CreateConditionsDTO) {
    try {
      const condition = await this.conditionsRepository.findOne({
        where: { description: body.description },
      });

      //if the condition already exists, throw an error
      if (condition)
        throw new HttpException(
          `Condition with description: ${body.description} already exists`,
          HttpStatus.BAD_REQUEST,
        );

      //if the condition does not exist, create it
      const newCondition = await this.conditionsRepository.save(body);
      return newCondition;
    } catch (error) {
      throwHttpException(error);
    }
  }

  //function to get all the conditions
  public async getAllConditions(): Promise<ConditionsEntity[]> {
    try {
      const conditions: ConditionsEntity[] = await this.conditionsRepository.find();

      //if there are no conditions, throw an error
      if (conditions.length === 0)
        throw new HttpException('No conditions found', HttpStatus.NOT_FOUND);

      return conditions;
    } catch (error) {
      throwHttpException(error);
    }
  }
}
