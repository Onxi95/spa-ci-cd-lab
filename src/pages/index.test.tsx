import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";

import { GetUsersError } from "@/modules/api/getUsers";
import * as userQuery from "@/modules/user/hooks/useInfiniteGetUsersQuery";
import * as userContext from "@/modules/user/providers/UserNameProvider";

import { IndexPage } from "./index";



vi.mock("../modules/user/providers/UserNameProvider");
vi.mock("../modules/user/hooks/useInfiniteGetUsersQuery");

const mockedContext = userContext.useUserNameContext as Mock;
const mockedInfiniteGetUserQuery = userQuery.useInfiniteGetUsersQuery as Mock;

const getInfiniteUserQueryDataFactory = (
  props?: Partial<UseInfiniteQueryResult>
) => {
  return {
    isPending: false,
    isSuccess: false,
    error: null,
    data: undefined,
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    ...props,
  };
};

describe("IndexPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show info alert if no username is provided", () => {
    mockedContext.mockReturnValue({
      userName: "",
    });

    mockedInfiniteGetUserQuery.mockReturnValue(
      getInfiniteUserQueryDataFactory()
    );

    render(<IndexPage />);

    expect(
      screen.getByText(
        "Type a username or keyword above to see a list of GitHub users that match your query."
      )
    ).toBeInTheDocument();
  });

  it("should render skeleton while loading", () => {
    mockedContext.mockReturnValue({
      userName: "test",
    });
    mockedInfiniteGetUserQuery.mockReturnValue(
      getInfiniteUserQueryDataFactory({ isPending: true })
    );

    render(<IndexPage />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should show error message for known error codes", async () => {
    mockedContext.mockReturnValue({
      userName: "test",
    });
    mockedInfiniteGetUserQuery.mockReturnValue(
      getInfiniteUserQueryDataFactory({ error: new GetUsersError(403) })
    );

    render(<IndexPage />);

    expect(
      await screen.findByText(
        "You have exceeded the allowed request limit. Please wait a moment before trying again."
      )
    ).toBeInTheDocument();
  });

  it("should show unknown error message for unknown error", async () => {
    mockedContext.mockReturnValue({
      userName: "test",
    });
    mockedInfiniteGetUserQuery.mockReturnValue(
      getInfiniteUserQueryDataFactory({ error: new Error("Whoops") })
    );

    render(<IndexPage />);

    expect(
      await screen.findByText(
        "Something went wrong. Please try again later. If the problem continues, please contact support for assistance."
      )
    ).toBeInTheDocument();
  });

  it("should show no users found message when users list is empty", async () => {
    mockedContext.mockReturnValue({
      userName: "test",
    });
    mockedInfiniteGetUserQuery.mockReturnValue(
      getInfiniteUserQueryDataFactory({
        data: { pages: [[]] },
        isSuccess: true,
      })
    );

    render(<IndexPage />);

    expect(await screen.findByText("No users found")).toBeInTheDocument();
  });

  it("should render the UsersList when users are fetched successfully", async () => {
    mockedContext.mockReturnValue({
      userName: "test",
    });
    mockedInfiniteGetUserQuery.mockReturnValue(
      getInfiniteUserQueryDataFactory({
        data: {
          pages: [
            [{ id: 1, userName: "testuser", imageUrl: "https://example.com" }],
          ],
        },
        isSuccess: true,
      })
    );

    render(<IndexPage />);

    expect(await screen.findByText("testuser")).toBeInTheDocument();
  });
});
