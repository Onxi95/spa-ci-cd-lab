import Grid from "@mui/material/Grid2";

import type { UserDetails } from "../../types";
import { UserCard } from "../UserCard";

type UsersListProps = {
  users: UserDetails[];
};

// It's a pure function, as it doesn't have any side effects
export const UsersList = ({ users }: UsersListProps) => {
  return (
    <Grid container spacing={2}>
      {/* A virtual list would be nice to have  */}
      {users.map((user) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
          key={user.id}
        >
          <UserCard {...user} />
        </Grid>
      ))}
    </Grid>
  );
};
