enum ResponseStatus {
  Error = 'error',
  Fail = 'fail',
  Success = 'success',
}

type ErrorResponse = {
  status: ResponseStatus.Error;
  message: string;
};

type FailResponse = {
  status: ResponseStatus.Fail;
  data: any;
};

type SuccessResponse = {
  status: ResponseStatus.Success;
  data: any;
};

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
