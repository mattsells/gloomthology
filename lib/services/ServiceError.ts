import { HttpStatus } from '../http';

export class ServiceError extends Error {
  constructor(message: string, public status: HttpStatus, public data?: any) {
    super(message);
  }
}
