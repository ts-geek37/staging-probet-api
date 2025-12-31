export interface Response<T> {
  status: number;
  body: {
    success: boolean;
    data: T;
    error: string | null;
  };
}
