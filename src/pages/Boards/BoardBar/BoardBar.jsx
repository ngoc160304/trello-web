import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { capitalizeFirstLetter } from '../../../utils/formatters';
import BoardUserGroup from './BoardUserGroup';
import { Tooltip } from '@mui/material';
import InviteBoardUser from './InviteBoardUser';
const CustomChip = {
  color: '#fff',
  px: 1,
  '.MuiChip-icon': {
    color: '#fff'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  },
  borderRadius: '4px',
  bgcolor: 'transparent',
  border: 'none'
};
const BoardBar = ({ board }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: (theme) => theme.trello.boardBarHeight,
        px: 2,
        gap: 2,
        bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#1976d2'),
        overflowX: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={board?.title}
            variant="outlined"
            sx={CustomChip}
            clickable
          />
        </Tooltip>
        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          variant="outlined"
          sx={CustomChip}
          clickable
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          variant="outlined"
          sx={CustomChip}
          clickable
        />
        <Chip icon={<BoltIcon />} label="Automa" variant="outlined" sx={CustomChip} clickable />
        <Chip
          icon={<FilterListIcon />}
          label="FiltersFilters"
          variant="outlined"
          sx={CustomChip}
          clickable
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <InviteBoardUser boardId={board?._id} />
        <BoardUserGroup boardUsers={board?.FE_allUsers} />
      </Box>
    </Box>
  );
};
export default BoardBar;
