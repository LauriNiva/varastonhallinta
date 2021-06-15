import '../App.css';

import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../img/logo.svg';


const useStyles = makeStyles((theme) => ({
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


const Nav = ({ user, logoutUser }) => {

  const classes = useStyles();



  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Logo style={{ width: "40px", height: "40px" }} />


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

        {user
          ? <div className="nav-user">{user.username}
            <button onClick={logoutUser}>logout</button>
          </div>
          : ''}
      </Toolbar>
    </AppBar>
  )
}

export default Nav;