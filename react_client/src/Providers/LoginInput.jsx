import React, { useState, useEffect, useContext } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import Select from '@mui/material/Select';
import { loginContext } from './LoginProviders';


function CurrentUser(props) {
  // const [data, setData] = useState([]);




  return (

    <div className="learning-dropdown">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          value={props.purpose}
          onChange={e => props.onChange(e.target.value)}
        >
        </Select>
      </FormControl>
    </div>

  )
}

export default CurrentUser
