import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @Get('/logout')
  async logout(@Req() req) {
    return await this.authService.logout(
      req.headers.authorization.split(' ')[1],
    );
  }
}
