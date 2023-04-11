import { SetMetadata } from '@nestjs/common';

export const responseMessage = 'responseMessage';
export const ResponseMessage = (message: string) =>
  SetMetadata(responseMessage, message);
