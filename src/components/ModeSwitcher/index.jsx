import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightness from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    const theme = e.target.value;
    setMode(theme);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        htmlFor="theme-dark-light-system"
        sx={{
          color: 'white',
          '&.Mui-focused': {
            color: 'white'
          }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="theme-dark-light-system"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      >
        <MenuItem value="light">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem fontSize="small" value="dark">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DarkModeOutlined /> Dark
          </Box>
        </MenuItem>
        <MenuItem fontSize="small" value="system">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SettingsBrightness /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default ModeSwitcher;
