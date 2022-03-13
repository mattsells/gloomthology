enum ResponseStatus {
  Error = 'error',
  Fail = 'fail',
  Success = 'success',
}

export type ErrorResponse = {
  status: ResponseStatus.Error;
  message: string;
};

export type FailResponse<T = any> = {
  status: ResponseStatus.Fail;
  data: T;
};

export type SuccessResponse<T = any> = {
  status: ResponseStatus.Success;
  data: T;
};

export function error(message: string): ErrorResponse {
  return {
    status: ResponseStatus.Error,
    message,
  };
}

export function failure<T = any>(data: T): FailResponse {
  return {
    status: ResponseStatus.Fail,
    data,
  };
}

export function success<T = any>(data: T): SuccessResponse {
  return {
    status: ResponseStatus.Success,
    data,
  };
}

export function isErrorResponse(response: any): response is ErrorResponse {
  return (
    !!response &&
    typeof response === 'object' &&
    response.status === ResponseStatus.Error &&
    typeof response.message === 'string'
  );
}

export function isFailResponse(response: any): response is FailResponse {
  return (
    !!response &&
    typeof response === 'object' &&
    response.status === ResponseStatus.Fail &&
    'data' in response
  );
}
