export interface PaginatedResult<E> {
  data: E[];
  meta: {
    page: number;
    last_page: number;
    total: number;
  };
}
