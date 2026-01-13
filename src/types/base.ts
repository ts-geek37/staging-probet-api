export interface Response<T> {
  status: number;
  body: {
    success: boolean;
    data: T;
    error: string | null;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  count: number;
  total_pages: number;
}
