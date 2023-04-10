import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/User.entity';
import { CreateUserDto } from './dtos/User.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.create(user);
    delete createdUser.password;
    return createdUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
