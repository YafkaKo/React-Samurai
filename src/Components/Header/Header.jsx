import React, { useEffect } from "react";
import { Button, Container, Link, Stack, Typography } from "@mui/material";
import CallEndSharpIcon from "@mui/icons-material/CallEndSharp";
import CustomNavLink from "../Sidebar/CustomNavLink/CustomNavLink";
import { connect, useDispatch } from "react-redux";
import { authThunkCreator, handleAuth, logoutThunkCreator } from "../../redux/auth-reducer";
// import { AuthAPI } from "../../API/API";

const Header = (props) => {
  const { isAuth, login, handleAuth } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunkCreator());
  }, [handleAuth, login, dispatch]);

  function handleLogout(){
    console.log('click')
    // AuthAPI.logoutAPI()
    dispatch(logoutThunkCreator())
  }

  return (
    <Container
      component="header"
      sx={{
        pt: 2,
        pb: 2,
        borderBottom: "2px solid",
        borderColor: "background.default",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link href="/profile">
        <CallEndSharpIcon
          sx={{
            fontSize: 60,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
          }}
        />
      </Link>

      {isAuth ? (
        <Stack direction='row'>
          <Button sx={{
            backgroundColor: 'transparent',
            fontWeight: "600", fontSize: "inherit",
            "&:hover": {textDecoration: "underline"}
            }} onClick={handleLogout}>Log Out</Button>
          <Typography sx={{ alignContent: "center" }} variant="h4">
            {login}
          </Typography>
        </Stack>
      ) : (
        <CustomNavLink sx={{color:'primary.main'}}  to={"/login"} text={"Login"} />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};
const mapDispatchToProps = { handleAuth };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
