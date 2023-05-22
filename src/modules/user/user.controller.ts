import { Controller, Get } from '@nestjs/common';
import { User } from './entities/User.entity';
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
