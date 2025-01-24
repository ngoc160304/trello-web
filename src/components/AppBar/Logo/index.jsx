import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import TrelloIcon from '../../../assets/trello-icon.svg?react';
import Typography from '@mui/material/Typography';
const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" />
      <Typography
        variant="string"
        sx={{
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}
      >
        Trello
      </Typography>
    </Box>
  );
};
export default Logo;
