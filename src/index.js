import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import state, {addMessage, addPost} from './State'
import socialNetworkTheme from './SocialNetworkTheme'
import {CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline/>
      <ThemeProvider theme={socialNetworkTheme}>
        <App state={state} addMessage={addMessage} addPost={addPost}/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)