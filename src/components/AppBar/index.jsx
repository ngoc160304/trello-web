import Box from '@mui/material/Box';
import ModeSwitcher from '../ModeSwitcher';
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
const AppBar = () => {
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
          overflowY: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <AppsIcon />
          <Logo />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Templates />
            <Started />
            <Recent />
            <Button variant="outlined" startIcon={<AddIcon />}>
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
            id="filled-search"
            label="Search"
            type="search"
            size="small"
            sx={{ minWidth: '120px' }}
          />
          <ModeSwitcher />
          <Tooltip title="Notification">
            <Badge color="secondary" variant="dot">
              <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ color: 'primary.main' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  );
};
export default AppBar;
