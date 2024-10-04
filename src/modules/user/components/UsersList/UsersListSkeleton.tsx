import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

const skeleton = Array.from({ length: 4 }, (_, index) => index);

export const UserListSkeleton = () => (
  <Grid
    container
    spacing={2}
    width="100%"
    sx={{ mt: 3 }}
    data-testid="skeleton"
  >
    {skeleton.map((key) => (
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
        key={key}
      >
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: 1 }}
          width="100%"
          height={266}
        />
      </Grid>
    ))}
  </Grid>
);
