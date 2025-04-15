import React, { Suspense, useEffect } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "./redux/app-reducer";

const DialogsContainer = React.lazy(() =>
  import("./Components/Dialogs/DialogsContainer")
);
const Profile = React.lazy(() => import("./Components/Profile/Profile.jsx"));
const UsersContainer = React.lazy(() =>
  import("./Components/Users/UsersContainer")
);

function App() {
  const initialized = useSelector((state) => state.app.initialized);
  // // console.log(initialized + ' '+ new Date().toISOString())
  const dispatch = useDispatch();

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
