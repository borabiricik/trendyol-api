import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(text: string) {
    super(`${text} Not Found`, HttpStatus.NOT_FOUND);
  }
}
