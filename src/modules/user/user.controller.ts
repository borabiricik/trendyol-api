import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/User.entity';
import { CreateUserDto } from './dtos/User.dto';
import { ResponseMessage } from 'src/modules/common/decorators/response.decorator';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ResponseMessage('User Created')
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
