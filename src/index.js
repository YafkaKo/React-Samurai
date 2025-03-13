import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import state from './State'
import {CssBaseline} from '@mui/material'
import socialNetworkTheme from './SocialNetworkTheme'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider} from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline/>
      <ThemeProvider theme={socialNetworkTheme}>
        <App state={state}/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)