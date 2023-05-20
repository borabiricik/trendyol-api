import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(entity: string) {
    super(`${entity} Already Exists`, HttpStatus.CONFLICT);
  }
}
