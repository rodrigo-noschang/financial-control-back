interface IRequest {
  page: number;
  page_size: number;
  total: number;
}

interface IResponse {
  has_next_page: boolean;
  has_previous_page: boolean;
  page: number;
  page_size: number;
}

export function extractPaginationInfo({
  page,
  page_size,
  total,
}: IRequest): IResponse {
  const hasNextPage = page * page_size < total;
  const hasPreviousPage = page > 1;

  return {
    has_next_page: hasNextPage,
    has_previous_page: hasPreviousPage,
    page: Number(page),
    page_size: Number(page_size),
  };
}
