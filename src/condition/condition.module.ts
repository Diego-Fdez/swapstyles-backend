import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionService } from './services/condition.service';
import { ConditionController } from './controllers/condition.controller';
import { ConditionsEntity } from './entities/conditions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConditionsEntity])],
  providers: [ConditionService],
  controllers: [ConditionController],
  exports: [TypeOrmModule],
})
export class ConditionModule {}
