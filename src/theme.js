import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '68px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - (${APP_BAR_HEIGHT} + ${BOARD_BAR_HEIGHT}))`

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     success: {
    //       main: red[500]
    //     }
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: {
    //       main: pink[600]
    //     }
    //   }
    // }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          textTransform: 'capitalize',
          color: 'success.main',
          '&:hover': {
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '& .MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // }
          '& fieldset': {
            borderWidth: '1px !important'
          },
          '&:hover fieldset': {
            borderWidth: '2px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
      *::-webkit-scrollbar {
        width: 8px;
        height: 6px;
      }
      *::-webkit-scrollbar-track {
        background: #FAFAFA;
        borde-radius: 8px;
      }
      *::-webkit-scrollbar-thumb {
        background-color: #C8C8C8;
        border-radius: 8px;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: '#aaa',
      }
    `
    }
  }
});

export default theme;
