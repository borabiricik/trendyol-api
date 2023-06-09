import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/entities/User.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

const validateUser = async (
  request: any,
  userRepository: Repository<User>,
): Promise<boolean> => {
  try {
    const foundUser = await userRepository.findOne({
      where: { token: request.headers.authorization.split(' ')[1] },
    });
    const decodedToken = jwt.decode(
      request.headers.authorization.split(' ')[1],
      { json: true },
    );
    return !!foundUser && decodedToken.email === foundUser.email;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateUser(request, this.userRepository);
  }
}
