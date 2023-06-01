import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //method to register a user
  @Post()
  public async registerUser(@Body() body: CreateUserDTO) {
    return await this.usersService.createUser(body);
  }

  //method to get all users
  @Get()
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  //method to get a user by sub
  @Get(':id')
  public async getUserBySub(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserBySub(id);
  }

  //method to update a user by sub
  @Put(':id')
  public async updateUserBySub(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    await this.usersService.updateUser(id, body);
    return res.status(HttpStatus.OK).json({
      message: 'User updated successfully',
    });
  }
}
