import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { StylePreferencesService } from '../services/style-preferences.service';
import { CreateStylePreferencesDTO } from '../dto/style-preferences.dto';

@Controller('style-preferences')
export class StylePreferencesController {
  constructor(private readonly stylePreferencesService: StylePreferencesService) {}

  //method to create a style preference
  @Post()
  async createStylePreference(@Res() res: Response, @Body() body: CreateStylePreferencesDTO) {
    const stylePreference = await this.stylePreferencesService.createPreferences(body);
    return res.status(HttpStatus.OK).json({
      stylePreference,
    });
  }
}
