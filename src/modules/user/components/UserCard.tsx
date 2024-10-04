import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import type { UserDetails } from "../types";


type UserCardProps = UserDetails;

export const UserCard = ({ userName, imageUrl }: UserCardProps) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={`${userName}'s avatar`}
        loading="lazy"
        width="100%"
        height={250}
      />
      <CardContent>
        <Typography variant="h6" component="p" textAlign="center">
          {userName}
        </Typography>
      </CardContent>
    </Card>
  );
};
