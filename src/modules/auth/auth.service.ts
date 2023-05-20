import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/User.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AlreadyExistsException } from '../common/exceptions/alread-exists.exception';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(payload: LoginDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: payload.email },
    });
    if (!foundUser) throw new NotFoundException('User');
    else {
      const isPasswordCorrect = await bcrypt.compare(
        payload.password,
        foundUser.password,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Password is incorrect');
      } else {
        foundUser.token = jwt.sign({ email: foundUser.email }, 'jwt_secret');
        return await this.userRepository.save(foundUser);
      }
    }
  }

  async register(payload: RegisterDto) {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (foundUser) {
      throw new AlreadyExistsException('User');
    } else {
      const cryptedPassword = await bcrypt.hash(payload.password, 8);
      const user = this.userRepository.create({
        ...payload,
        password: cryptedPassword,
      });
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      delete createdUser.token;
      return createdUser;
    }
  }
}
