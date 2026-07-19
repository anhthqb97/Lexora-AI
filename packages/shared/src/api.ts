export type ApiSuccess<T> = {
  data: T;
};

export type ApiError = {
  error: {
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function isApiError(response: ApiResponse<unknown>): response is ApiError {
  return "error" in response;
}
