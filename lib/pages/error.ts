import { UnauthorizedError } from '../auth';
import { HttpStatus } from '../http';
import { ServiceError } from '../services/ServiceError';

export function toPageProps(err: any) {
  if (err instanceof UnauthorizedError) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
}
