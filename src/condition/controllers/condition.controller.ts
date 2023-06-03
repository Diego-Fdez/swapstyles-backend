import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConditionService } from '../services/condition.service';
import { CreateConditionsDTO } from '../dto/conditions.dto';

@Controller('conditions')
export class ConditionController {
  constructor(private readonly conditionsService: ConditionService) {}

  //method to create a new condition
  @Post()
  async createCondition(@Res() res: Response, @Body() body: CreateConditionsDTO) {
    const condition = await this.conditionsService.createCondition(body);
    return res.status(HttpStatus.OK).json({
      condition,
    });
  }

  //method to get all the conditions
  @Get()
  async getConditions(@Res() res: Response) {
    const conditions = await this.conditionsService.getAllConditions();
    return res.status(HttpStatus.OK).json({
      conditions,
    });
  }
}
