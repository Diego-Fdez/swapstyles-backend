import { HttpException, HttpStatus } from '@nestjs/common';

//error handler
export function throwHttpException(error: any) {
  const message = error.message || 'Internal server error';
  const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;

  throw new HttpException(message, statusCode);
}
