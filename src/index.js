import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import socialNetworkTheme from './SocialNetworkTheme'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import store from './redux/State'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={socialNetworkTheme}>
        <App state={store.getState()} dispatch={store.dispatch.bind(store)} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)