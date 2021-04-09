import './App.css';
import 'fontsource-roboto';
import React, { useState, useEffect } from 'react';
import userService from './services/users';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToolBar from '@material-ui/core/ToolBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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


const StoragesBar = ({ storages, selectedStorage, setSelectedStorage }) => {

  if (storages.length <= selectedStorage) {
    setSelectedStorage(0)
    return <div> </div>;
  };

  const handleChange = (e, newTab) => {
    setSelectedStorage(newTab);
  };

  return (
    <div className='storagetabs'>
      <Tabs value={selectedStorage} onChange={handleChange}>
        {storages.map((storage, i) => <Tab value={i} key={storage._id} label={storage.name} />)}
      </Tabs>
    </div>
  )
};

const StorageItemsTable = ({ storage }) => {


  if (storage === undefined) return <div></div>;

  const createData = (code, name, category, stock) => {
    return { code, name, category, stock };
  };

  const rows = storage.items.map(item => createData('itemcode', item.name, item.category, item.stock));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tuotekoodi</TableCell>
            <TableCell>Tuote</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Määrä</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.code}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

const Storages = ({ storages }) => {

  const [selectedStorage, setSelectedStorage] = useState(0);
  return (
    <div>
      <StoragesBar storages={storages} selectedStorage={selectedStorage} setSelectedStorage={setSelectedStorage} />
      <StorageItemsTable storage={storages[selectedStorage]} />
    </div>
  )
}



const App = () => {


  const classes = useStyles();

  const [user, setUser] = useState({ name: 'none' });
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    if (user._id) {
      getStorages(user._id)
        .then(storages => {
          setStorages(storages);
        })
    }
  }, [user]);

  const getUser = (e) => {
    userService(e.target.value)
      .then(res => {
        setUser(res);
      });
  };


  return (
    <div className="App">
      <AppBar position='fixed'>
        <ToolBar>
          <Typography variant='h6'>Varastonhallinta</Typography>

          <Typography id='selected-user'>{user.name} selected</Typography>
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
        </ToolBar>
      </AppBar>
      <Paper className='body-container'>
        <Storages storages={storages} />
      </Paper>

    </div>
  );
}

export default App;
