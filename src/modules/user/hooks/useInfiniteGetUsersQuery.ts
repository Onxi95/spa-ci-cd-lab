
import { skipToken, useInfiniteQuery } from "@tanstack/react-query";

import { apiClient } from "@/modules/api";
import type { GetUsersParams } from "@/modules/api/getUsers";

type UseInfiniteGetUsersQueryParams = Omit<GetUsersParams["query"], "page"> & {
  userName: string;
};

export const useInfiniteGetUsersQuery = ({
  pageSize,
  userName,
}: UseInfiniteGetUsersQueryParams) => {
  return useInfiniteQuery({
    queryKey: ["users", "list", userName],
    initialPageParam: 1,
    // https://tanstack.com/query/v5/docs/framework/react/guides/disabling-queries/#typesafe-disabling-of-queries-using-skiptoken
    queryFn: userName.length
      ? ({ pageParam }) =>
          apiClient.getUsers({
            query: { userName, page: pageParam, pageSize },
          })
      : skipToken,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < pageSize) return;
      return lastPageParam + 1;
    },
  });
};
