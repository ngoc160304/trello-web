import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const CustomChip = {
  color: 'primary.main',
  px: 1,
  '& .MuiChip-icon': {
    color: 'primary.main'
  },
  borderColor: 'transparent',
  '&:hover': {
    borderRadius: '4px',
    borderColor: 'primary.main',
    backgroundColor: 'transparent !important'
  }
};
const BoardBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: (theme) => theme.trello.boardBarHeight,
        borderTop: '2px solid #3498db',
        px: 2,
        gap: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Chip
          icon={<DashboardIcon />}
          label="NgocNguyenDev MERN Stack Board"
          variant="outlined"
          sx={CustomChip}
          clickable
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/private Workspace"
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
        <Button variant="outlined" endIcon={<PersonAddAltIcon />}>
          Invite
        </Button>
        <AvatarGroup
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: '0.875rem'
            },
            '& .MuiAvatar-colorDefault': {
              backgroundColor: 'primary.light'
            }
          }}
          max={6}
        >
          <Avatar
            alt="Cindy Baker"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjiuAXvOnVPmYckFE_5Nkyd1ecgK5AmKxP7A&s"
          />
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu75yQ7oHYDk7vpHD841TKK9U-NKOogVwp7A&s"
          />
          <Avatar
            alt="Travis Howard"
            src="https://petlove.vn/wp-content/uploads/2024/02/meo-anh-long-ngan-lich-su-nguon-goc-dac-diem-tinh-cach-65d318412cdfa.jpg"
          />
          <Avatar
            alt="Agnes Walker"
            src="https://1.bp.blogspot.com/-ciJx92ftXls/YGLZXgbmRgI/AAAAAAAArCg/iA9A_uU0qewj8ZgCpv6mCRqNuvo2YlZZACNcBGAsYHQ/s0/1d83a6d88d8be5b041a9a98fd5048311.jpeg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99EuXrDGPN4HyD0Hd0pZ_SDjV8RJpiTWoBg&s"
          />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
    </Box>
  );
};
export default BoardBar;
