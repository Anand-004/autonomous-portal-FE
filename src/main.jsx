import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({

  palette: {

    primary: {

      main: '#007bff' // Your desired primary color

    }

  }

});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}><App /></ThemeProvider>
  </StrictMode>,
)
