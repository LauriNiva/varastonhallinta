import { AppBar, Tab, Tabs, Toolbar } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Items from './Items';



const OptionsBar = () => {

  const { url } = useRouteMatch();


  return (
    <div className='optionstab'>

      <Toolbar>
        <Link to={`${url}/tuotteet`}>Tuotteet</Link>
        <Link to={`${url}/varastot`}>Varastot</Link>
        <Link to={`${url}/kategoriat`}>Kategoriat</Link>
      </Toolbar>

      {/* <Tabs >
      <Tab label='Tuotteet' />
        <Link to={`${url}/tuotteet`}><Tab label='Tuotteet' /></Link>
        <Link to={`${url}/varastot`}><Tab label='Varastot' /></Link>
        <Link to={`${url}/kategoriat`}><Tab label='Kategoriat' /></Link> 
      </Tabs> */}
    </div>
  )
};


const Options = ({ items, submitNewItem, deleteItem }) => {

  const { path } = useRouteMatch();


  return (
    <div>
      <OptionsBar />
      
          <Route path={`${path}/tuotteet`}>
            <Items items={items} submitNewItem={submitNewItem} deleteItem={deleteItem} />
          </Route>
          <Route path='hallinta/varastot'>
            <div>varastot</div>
          </Route>
          <Route path='hallinta/kategoriat'>

          </Route>
        


    </div>
  )
}

export default Options;