import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeORMFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception instanceof QueryFailedError) {
      return response.status(400).json({
        message: exception.message,
        statusCode: 400,
        detail: exception.driverError.detail,
      });
    }
    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        message: exception.message,
        statusCode: 404,
        detail: '',
      });
    }
    return response
      .status(500)
      .json({ message: 'Internal server error', statusCode: 500 });
  }
}
