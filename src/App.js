import React, { useEffect } from 'react'
import { Box, CircularProgress, Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Profile from './Components/Profile/Profile'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/UsersContainer'
import Login from './Components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from './redux/app-reducer'

function App() {
  const initialized = useSelector(state=>state.app.initialized)
  // console.log(initialized + ' '+ new Date().toISOString())
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);
  if(!initialized){
    return    <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress size={50} /> {/* Preloader */}
          </Box>
  }
  return (
    <Container disableGutters sx={{
      bgcolor: 'secondary.main',
      fontSize: 24,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <Box sx={{ p: 0, display: 'flex', flexGrow: '1' }}>
        <Sidebar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/dialogs/:chatId" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/login" element={<Login />} />
          {/*<Route path="/settings" element={<Settings/>}/>*/}
        </Routes>
      </Box>
    </Container>

  )
}

export default App
