import React from 'react';
import { AppBar, FormControl, InputLabel, makeStyles, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 'auto',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  
}));


const Nav = ({ getUser }) => {

  const classes = useStyles();

  const navStyle = {
    color: 'white'
  }

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6'>Varastonhallinta</Typography>

        <ul>
          <Link style={navStyle} to='/'>
            <li>Varastot</li>
          </Link>
          <Link style={navStyle} to='/hallinta'>
            <li>Hallinta</li>
          </Link>
        </ul>

        <FormControl className={classes.formControl}>
          <InputLabel id='user-select-label'>User</InputLabel>
          <Select
            labelId='user-select-label'
            id='user-select'
            defaultValue=''
            onChange={getUser} >
            <MenuItem value={"John"}>John</MenuItem>
            <MenuItem value={"Jane"}>Jane</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}

export default Nav;