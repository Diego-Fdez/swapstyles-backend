import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
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
  @Get(':sub')
  public async getUserBySub(@Param('sub') sub: string) {
    return await this.usersService.getUserBySub(sub);
  }

  //method to update a user by sub
  @Put(':sub')
  public async updateUserBySub(
    @Res() res: Response,
    @Param('sub') sub: string,
    @Body() body: UpdateUserDTO,
  ) {
    await this.usersService.updateUser(sub, body);
    return res.status(HttpStatus.OK).json({
      message: 'User updated successfully',
    });
  }
}
