import React from 'react'
import { Box, Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Profile from './Components/Profile/Profile'
import DialogsContainer from './Components/Dialogs/DialogsContainer'
import UsersContainer from './Components/Users/UsersContainer'
import Login from './Components/Login/Login'

function App() {

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
