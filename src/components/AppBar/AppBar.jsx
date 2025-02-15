import Box from '@mui/material/Box';
import ModeSwitcher from '../ModeSwitcher/ModeSwitcher';
import AppsIcon from '@mui/icons-material/Apps';
import Logo from './Logo';
import Workspaces from './Menus/Workspaces';
import Templates from './Menus/Templates';
import Started from './Menus/Started';
import Recent from './Menus/Recent';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Profile from './Menus/Profile';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
const AppBar = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: (theme) => theme.trello.appBarHeight,
          justifyContent: 'space-between',
          px: 2,
          gap: 2,
          overflowX: 'auto',
          overflowY: 'hidden',
          bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#2c3e50' : '#1565c0')
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <AppsIcon
            sx={{
              color: '#fff'
            }}
          />
          <Logo />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Templates />
            <Started />
            <Recent />
            <Button
              startIcon={<AddIcon />}
              sx={{
                color: 'white'
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <TextField
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            id="filled-search"
            label="Search"
            type="text"
            size="small"
            sx={{
              minWidth: '120px',
              maxWidth: '170px',
              '& label': { color: 'white' },
              '& input': {
                color: 'white'
              },
              '& label.Mui-focused': {
                color: 'white'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  // borderWidth: '1px !important'
                  borderColor: 'white'
                },
                '&:hover fieldset': {
                  // borderWidth: '1px !important'
                  borderColor: 'white'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: searchValue ? 'white' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSearchValue('');
                    }}
                  />
                </InputAdornment>
              )
            }}
          />
          <ModeSwitcher />
          <Tooltip title="Notification">
            <Badge color="warning" variant="dot">
              <NotificationsNoneIcon sx={{ color: '#fff' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ color: '#fff' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  );
};
export default AppBar;
