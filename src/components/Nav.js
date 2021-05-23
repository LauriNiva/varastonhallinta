import '../App.css';

import React from 'react';
import { AppBar, FormControl, InputLabel, makeStyles, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../img/logo.svg';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 'auto',
    color: 'white'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navStyle: {
    color: 'white'
  }


}));


const Nav = ({ getUser }) => {

  const classes = useStyles();



  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Logo style = {{ width: "40px", height:"40px"}} />
        

        <ul className='nav-links'>
          <Link className={classes.navStyle} to='/'>
            <li>
              <Typography>Etusivu</Typography>
            </li>
          </Link>
          <Link className={classes.navStyle} to='/hallinta/tuotteet'>
            <li>
              <Typography>Hallinta</Typography>
            </li>
          </Link>
        </ul>

        <FormControl className={classes.formControl}>
          <InputLabel className={classes.navStyle} id='user-select-label'>User</InputLabel>
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