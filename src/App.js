import React from 'react'
import { Box, Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Profile from './Components/Profile/Profile'
import Dialogs from './Components/Dialogs/Dialogs'

function App(props) {
  const { ProfilePage, DialogsPage } = props.state
  const { addMessage, addPost } = props
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
          <Route path="/profile" element={<Profile Profile={ProfilePage} addPost={addPost} />} />
          <Route path="/dialogs" element={<Dialogs Dialogs={DialogsPage} addMessage={addMessage} />} />
          <Route path="/dialogs/:chatId" element={<Dialogs Dialogs={DialogsPage} addMessage={addMessage} />} />
          {/*<Route path="/news" element={<News/>}/>*/}
          {/*<Route path="/settings" element={<Settings/>}/>*/}
        </Routes>
      </Box>
    </Container>

  )
}

export default App
