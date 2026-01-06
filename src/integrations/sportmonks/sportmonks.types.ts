export interface SportMonksResponse<T> {
  data: T;
  pagination?: {
    has_more: boolean;
    per_page: number;
    count: number;
    next_page: string;
    current_page: number;
  };
  rate_limit?: {
    resets_in_seconds: number;
    remaining: number;
    requested_entity: string;
  };
}
