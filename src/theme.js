import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  trello: {
    appBarHeight: '54px',
    boardBarHeight: '60px'
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
    MuiCssBaseline: {
      styleOverrides: `
      *::-webkit-scrollbar {
        width: 0.4em;
        height: 0.6em;
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
