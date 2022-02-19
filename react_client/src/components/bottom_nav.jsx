import React, {useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 375, height:80 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          // console.log(newValue)
          setValue(newValue);
          // console.log(value)
        }}
      >
        <BottomNavigationAction label="Learing Bot" icon={<SmartToyIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Friend List" onClick={() => navigate('/')} icon={<PeopleIcon />} />
      </BottomNavigation>
    </Box>
  );
}
