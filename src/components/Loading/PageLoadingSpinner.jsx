import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PageLoadingSpinner = ({ caption }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        gap: 1
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  );
};
export default PageLoadingSpinner;
