import * as Yup from "yup";

import type { UserDetails } from "../user/types";

// Generally, we should use type-safe, auto-generated contracts
// like https://github.com/github/rest-api-description in our API clients,
// but it's a simplified example of a communication

export type GetUsersParams = {
  query: { userName: string; page: number; pageSize: number };
};

export type GetUserErrorCodes = 403 | 422 | 503;

export class GetUsersError extends Error {
  name = "GetUsersError" as const;
  constructor(public readonly statusCode: GetUserErrorCodes) {
    super(`Failed with status code: ${statusCode}`);
  }
}

export const getUsers = async ({
  query: { userName, page, pageSize },
}: GetUsersParams): Promise<UserDetails[]> => {
  const request = await fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/search/users?q=${userName}&per_page=${pageSize}&page=${page}`
  );
  // HTTP response status codes for "Search users"
  // 200 OK
  // 304  Not modified
  // 422 Validation failed, or the endpoint has been spammed.
  // 403 - not specified in docs - rate limit
  // 503 Service unavailable
  if (!request.ok) {
    throw new GetUsersError(request.status as GetUserErrorCodes);
  }

  const response = await request.json();
  const validatedResponse = await schema.validate(response);
  return validatedResponse.items.map((item) => ({
    id: item.id,
    imageUrl: item.avatar_url,
    userName: item.login,
  }));
};

const userSchema = Yup.object().shape({
  login: Yup.string().required(),
  id: Yup.number().required(),
  avatar_url: Yup.string().required(),
});

const schema = Yup.object().shape({
  items: Yup.array().of(userSchema).required(),
});
