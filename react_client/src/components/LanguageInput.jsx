import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import Select from '@mui/material/Select';


const styles = {
  "&.MuiFormControl-root": {
    // border: "2px grey solid",
    borderTop: '3px #c9c9c9 solid',
    borderRadius: "5px",
  },
  "&.MuiButton-multi-selection": {
    color: "#45acc9",
    borderRadius: "20px",
    width: "105px"
  },
  "&.MuiButton-multi-selection-mid": {
    color: "#45acc9",
    width: "105px"
  },
};


function LanguageInput(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/lang_list')
      .then((res) => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err.message);
      })
  }, [])

  const list = data.map((lang, index) => {
    return (<MenuItem key={index} value={lang}>{lang}</MenuItem>);
  })



  return (

    <div className="learning-dropdown">
      <FormControl sx={styles} fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          value={props.purpose}
          onChange={e => props.onChange(e.target.value)}
        >
          {list}

        </Select>
      </FormControl>
    </div>

  )
}

export default LanguageInput
