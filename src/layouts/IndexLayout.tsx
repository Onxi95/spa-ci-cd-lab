import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GitHub } from "@mui/icons-material";
import { type ReactNode } from "react";

import { DebouncedInput } from "../modules/molecules/DebouncedInput/DebouncedInput";
import { UserNameForm } from "../modules/user/components/UserNameForm";
import { useUserNameContext } from "../modules/user/providers/UserNameProvider";
import { Container, styled } from "@mui/material";

type IndexLayoutProps = {
  children: ReactNode;
};

export const IndexLayout = ({ children }: IndexLayoutProps) => {
  const { setUserName } = useUserNameContext();

  return (
    <div>
      <AppBarStyled>
        <Toolbar sx={{ p: 1 }}>
          <AppNameWrapperStyled>
            <GitHub />
            <Typography
              variant="h6"
              component="h1"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Github user search
            </Typography>
          </AppNameWrapperStyled>
          <UserNameForm>
            {({ register, handleSubmit, formState: { errors } }) => (
              <DebouncedInput
                {...register("userName")}
                waitFor={2000}
                onDebounce={handleSubmit(({ userName }) => {
                  setUserName(userName);
                })}
                label="Seach"
                sx={{ width: "100%" }}
                variant="outlined"
                color="info"
                placeholder="Search…"
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
              />
            )}
          </UserNameForm>
        </Toolbar>
      </AppBarStyled>
      <main>
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          {children}
        </Container>
      </main>
    </div>
  );
};

const AppNameWrapperStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexShrink: 0,
  gap: theme.spacing(1),
  marginRight: theme.spacing(1),
  alignItems: "center",
}));

const AppBarStyled = styled(AppBar)({
  display: "flex",
  justifyContent: "center",
  position: "sticky",
  height: 90,
});
