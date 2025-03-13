import {createTheme} from '@mui/material/styles'

const socialNetworkTheme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Оранжевый (акцентный цвет)
      contrastText: '#FFFFFF', // Белый текст на оранжевом фоне
    },
    secondary: {
      main: '#607D8B', // Серый (второстепенный цвет)
      contrastText: '#FFFFFF', // Белый текст на сером фоне
    },
    background: {
      default: '#FFFFFF', // Белый фон
      paper: '#F5F5F5', // Светло-серый фон для карточек
    },
    text: {
      primary: '#212121', // Черный текст
      secondary: '#757575', // Серый текст
    },
    action: {
      active: '#FF5722', // Оранжевый для активных элементов
      hover: '#FF5722', // Оранжевый при наведении
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#212121', // Черный
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#212121', // Черный
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#212121', // Черный
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#212121', // Черный
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 800,
      color: '#212121', // Черный
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 800,
      color: '#212121', // Черный
    },
    body1: {
      fontSize: '1rem',
      color: '#212121', // Черный
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575', // Серый
    },
    button: {
      textTransform: 'none', // Убираем автоматическое преобразование текста в верхний регистр
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Закругленные углы кнопок
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#FF5722', // Оранжевый
          '&:hover': {
            backgroundColor: '#E64A19', // Темнее оранжевый при наведении
          },
        },
        outlinedPrimary: {
          borderColor: '#FF5722', // Оранжевая рамка
          color: '#FF5722', // Оранжевый текст
          '&:hover': {
            backgroundColor: 'rgba(255, 87, 34, 0.08)', // Легкий оранжевый фон при наведении
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '50%', // Круглая форма
          backgroundColor: '#ffffff', // Белый фон
          '&:hover': {
            backgroundColor: '#F5F5F5', // Серый фон при наведении
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Белый фон для AppBar
          color: '#212121', // Черный текст
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Легкая тень
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Закругленные углы карточек
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Тень для карточек
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Закругленные углы для Input
          padding: '10px', // Отступы для Input
          fontSize: '1rem', // Размер шрифта
          lineHeight: '1.5', // Межстрочный интервал
          backgroundColor: '#FFFFFF',
          border: '2px solid transparent',
          transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          '&::after': {
            display: "none"
          },
          '&::before': {
            display: "none"
          },
          '&.Mui-focused': {
            border: '2px solid #FF5722',
            transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0.5ms",
          },
        },
      },
    },
  },
})

export default socialNetworkTheme