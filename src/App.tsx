import React, { FC, Suspense, useEffect } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header.tsx";
import Sidebar from "./Components/Sidebar/Sidebar.tsx";

import Login from "./Components/Login/Login.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, initialize } from "./redux/app-reducer.ts";
import { RootState } from "./redux/redux-store.ts";

const DialogsContainer = React.lazy(() =>
  import("./Components/Dialogs/DialogsContainer.tsx")
);
const Profile = React.lazy(() => import("./Components/Profile/Profile.tsx"));
const UsersContainer = React.lazy(() =>
  import("./Components/Users/UsersContainer.tsx")
);

const App : FC = ()  =>{
  const initialized = useSelector((state:RootState) => state.app.initialized);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  if (!initialized) {
    return <CircularProgress size={300} sx={{margin:'200px auto', display: 'flex'}}/>;
  }
  return (
    <Container
      disableGutters
      sx={{
        bgcolor: "secondary.main",
        fontSize: 24,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={{ p: 0, display: "flex", flexGrow: "1" }}>
        <Sidebar />
        <Suspense
          fallback={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              margin="0 auto"
            >
              <CircularProgress size={100} /> {/* Preloader */}
            </Box>
          }
        >
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/dialogs/:chatId" element={<DialogsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Box>
    </Container>
  );
}

export default App;
