import './App.css';
import 'fontsource-roboto';
import React, { useState, useEffect } from 'react';
import userService from './services/users';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import getStorages from './services/storages';

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



const App = () => {


  const classes = useStyles();

  const [user, setUser] = useState({ name: 'none' });
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    if (user._id){
    getStorages(user._id)
      .then(storages => {
        setStorages(storages);
        console.log(storages);
      })}
  }, [user]);

  const getUser = (e) => {
    userService(e.target.value)
      .then(res => {
        setUser(res);
      });
  };


  return (
    <div className="App">
      <AppBar position='sticky'>
        <ToolBar>
          <Typography variant='h6'>Varastonhallinta</Typography>

          <FormControl className={classes.formControl}>
            <InputLabel id='user-select-label'>User</InputLabel>
            <Select
              labelId='user-select-label'
              id='user-select'
              onChange={getUser} >
              <MenuItem value={"John"}>John</MenuItem>
              <MenuItem value={"Jane"}>Jane</MenuItem>
            </Select>
          </FormControl>

        </ToolBar>

      </AppBar>

      <Typography>{user.name} selected</Typography>
    </div>
  );
}

export default App;
