import {
  ErrorResponse,
  FailResponse,
  isErrorResponse,
  isFailResponse,
} from '@/lib/http/response';

export type HttpError = {
  response: {
    data: ErrorResponse | FailResponse;
  };
};

export function isHttpError(err: any): err is HttpError {
  return (
    !!err &&
    typeof err === 'object' &&
    typeof err.response === 'object' &&
    (isErrorResponse(err.response.data) || isFailResponse(err.response.data))
  );
}
