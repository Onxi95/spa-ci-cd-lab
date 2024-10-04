
import { Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";

import { type GetUserErrorCodes, GetUsersError } from "@/modules/api/getUsers";
import { UsersList } from "@/modules/user/components/UsersList/UsersList";
import { UserListSkeleton } from "@/modules/user/components/UsersList/UsersListSkeleton";
import { useInfiniteGetUsersQuery } from "@/modules/user/hooks/useInfiniteGetUsersQuery";
import { useUserNameContext } from "@/modules/user/providers/UserNameProvider";

const apiErrorMessages = {
  403: "You have exceeded the allowed request limit. Please wait a moment before trying again.",
  422: "Your request could not be processed because some of the submitted information is invalid. Please check your input and try again.",
  503: " The service is currently unavailable. Please try again later. If the issue persists, please contact support.",
  unknown:
    "Something went wrong. Please try again later. If the problem continues, please contact support for assistance.",
} as const satisfies Record<GetUserErrorCodes | "unknown", string>;

export const IndexPage = () => {
  const { userName } = useUserNameContext();

  const { data, isPending, error, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteGetUsersQuery({
      pageSize: 30,
      userName,
    });

  if (!userName.length) {
    return (
      <Alert severity="info">
        Type a username or keyword above to see a list of GitHub users that
        match your query.
      </Alert>
    );
  }
  if (isPending) return <UserListSkeleton />;
  if (error) {
    if (
      error instanceof GetUsersError &&
      error.statusCode in apiErrorMessages
    ) {
      return (
        <Alert severity="error">{apiErrorMessages[error.statusCode]}</Alert>
      );
    }
    return (
      <div>
        {JSON.stringify(error)}
        <Alert severity="error">{apiErrorMessages.unknown}</Alert>;
      </div>
    );
  }
  if (isSuccess) {
    const users = data.pages.flatMap((list) => list);
    if (!users.length) {
      return <Alert severity="info">No users found</Alert>;
    }

    return (
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        // https://github.com/danbovey/react-infinite-scroller/issues/133#issuecomment-361241470
        loader={<UserListSkeleton key={0} />}
      >
        <UsersList users={users} />
      </InfiniteScroll>
    );
  }
};
