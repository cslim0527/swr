import useSWRInfinite from "swr/infinite";

export const usePagination = <T>(url: string) => {
  const PAGE_SIZE = 8;
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.length) return null;
    return `${url}&_page=${pageIndex}&_limit=${PAGE_SIZE}`;
  };

  const { data: posts, size, setSize, error, mutate } = useSWRInfinite(getKey);
  const paginatedData: T[] = posts?.flat();
  const isReachedEnd = posts && posts[posts.length - 1]?.length < PAGE_SIZE;
  const loadingMore = posts && typeof posts[size - 1] === "undefined";

  return {
    paginatedData,
    isReachedEnd,
    loadingMore,
    setSize,
    mutate,
    error,
    size,
  };
};
