import { UnauthorizedError } from '../auth';
import { HttpStatus } from '../http';
import { ServiceError } from '../services/ServiceError';

export function toApiResponse(err: any) {
  if (err instanceof UnauthorizedError) {
    return {
      data: err.message,
      status: HttpStatus.Unauthorized,
    };
  }

  if (err instanceof ServiceError) {
    return {
      data: err.message || err.data,
      status: err.status,
    };
  }

  console.log('error', err);

  return {
    data: 'An unknown error has occurred',
    status: HttpStatus.ServerError,
  };
}
