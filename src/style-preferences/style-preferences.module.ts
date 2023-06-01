import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StylePreferencesService } from './services/style-preferences.service';
import { StylePreferencesController } from './controllers/style-preferences.controller';
import { StylePreferencesEntity } from './entities/style-preferences.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StylePreferencesEntity, UsersEntity])],
  providers: [StylePreferencesService],
  controllers: [StylePreferencesController],
  exports: [TypeOrmModule],
})
export class StylePreferencesModule {}
